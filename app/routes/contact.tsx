import { ErrorResponse } from 'resend';
import { ActionFunctionArgs, json, MetaFunction } from '@remix-run/node';
import { renderToString } from 'react-dom/server';
import { useEffect, useState } from 'react';
import { useActionData, useLoaderData } from '@remix-run/react';
import { useToast } from '~/components/ui/use-toast';
import PageSection from '~/components/pagesection';
import ContactForm from '~/components/contactform';
import Email from '~/components/email';
import verifyRecaptcha from '~/lib/verifyrecaptcha';
import ErrorCodes from '~/lib/errorcodes';
import useRecaptcha from '~/hooks/userecaptcha';
import sendEmail from '~/lib/sendemail';

export const meta: MetaFunction = () => {
   return [
      { title: 'Get in touch' },
      { name: 'description', content: 'Let me know you want to connect.' },
   ];
};

export const loader = async () => {
   const siteKey = process.env.RECAPTCHA_SITE_KEY;

   return json({ siteKey });
};

export const action = async ({ request }: ActionFunctionArgs) => {
   const formData = await request.formData();
   const name = String(formData.get('name'));
   const email = String(formData.get('email'));
   const token = String(formData.get('token'));

   if (!name || !email) {
      return json(
         {
            error: {
               code: ErrorCodes.MISSING_FIELDS,
               message: 'Missing required fields',
            },
         },
         400
      );
   }

   const { score } = await verifyRecaptcha(token);
   if (!score || score < 0.5) {
      return json(
         {
            error: {
               code: ErrorCodes.RECAPTCHA_FAILED,
               message: 'Failed to verify reCAPTCHA',
            },
         },
         400
      );
   }

   const html = renderToString(<Email recipient={name} />);
   const { data, error } = await sendEmail(html, email, name);

   if (error) {
      return json({ error }, 500);
   }

   return json({ ...data, sender: name }, 200);
};

type ActionError = { error: ErrorResponse | { code: string; message: string } };
type ActionSuccess = { sender: string; id?: string };

function processData(
   data: ActionError | ActionSuccess | undefined
): { title: string; description: string } | undefined {
   if (!data) {
      return;
   }
   if ('error' in data) {
      if ('code' in data.error) {
         switch (data.error.code) {
            case ErrorCodes.MISSING_FIELDS:
               return {
                  title: 'Oops! Something is missing.',
                  description: 'Please fill out all required fields.',
               };
            case ErrorCodes.RECAPTCHA_FAILED:
               return {
                  title: 'Uh oh! Something went wrong with reCAPTCHA.',
                  description: 'Please try again later.',
               };
         }
      }
      return {
         title: 'Uh oh! Something went wrong.',
         description: 'Please try again later.',
      };
   }
   if ('sender' in data) {
      return {
         title: 'Success!',
         description: `Thanks for reaching out, ${data.sender}.`,
      };
   }
}

export default function ContactPage() {
   const data = useActionData<typeof action>();
   const loaderData = useLoaderData<typeof loader>();
   const [ready, getToken] = useRecaptcha();
   const [token, setToken] = useState<string>('');
   const { toast } = useToast();

   const siteKey = loaderData?.siteKey;
   useEffect(() => {
      if (!ready) {
         return;
      }
      let ignore = false;
      const getRecaptchaToken = async () => {
         if (ignore || !siteKey) {
            return;
         }
         const token = await getToken(siteKey);
         setToken(token);
      };
      getRecaptchaToken();
      return () => {
         ignore = true;
      };
   }, [getToken, siteKey, ready]);

   useEffect(() => {
      const processed = processData(data);
      if (!processed) {
         return;
      }
      const { dismiss } = toast({
         title: processed.title,
         description: processed.description,
         duration: 5000,
      });
      return () => {
         dismiss();
      };
   }, [data, toast]);

   return (
      <PageSection>
         <div className="mb-6 md:mb-8">
            <h2 className="font-display text-4xl mb-4 sm:6xl md:mb-6 md:text-8xl">
               Get in touch
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed mb-4">
               If you have any questions or would like to discuss a project,
               feel free to reach out to me using the form below.
            </p>
         </div>
         <ContactForm token={token} />
      </PageSection>
   );
}

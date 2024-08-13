import { Form } from '@remix-run/react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import schema from '~/lib/formschema';

function ContactForm({ token }: { token: string }) {
   const [form, fields] = useForm({
      shouldValidate: 'onBlur',
      shouldRevalidate: 'onInput',
      onValidate({ formData }) {
         return parseWithZod(formData, { schema });
      },
   });

   return (
      <Card className="w-full max-w-3xl">
         <CardHeader>
            <CardTitle className="tracking-normal">
               Thanks for stopping by
            </CardTitle>
            <CardDescription className="text-base">
               Fill out the form and I&apos;ll get back to you as soon as
               possible.
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Form
               method="post"
               id={form.id}
               className="space-y-6"
               onSubmit={form.onSubmit}
               aria-invalid={form.errors ? true : undefined}
            >
               <div className="grid gap-2">
                  <Label htmlFor={fields.name.name} className="text-base">
                     Name
                  </Label>
                  <Input
                     id={fields.name.id}
                     name={fields.name.name}
                     placeholder="Enter your name"
                     required={fields.name.required}
                     aria-invalid={fields.email.errors ? true : undefined}
                     aria-describedby={
                        fields.email.errors ? fields.email.errorId : undefined
                     }
                  />
                  <div id={fields.name.errorId} className="text-destructive">
                     {fields.name.errors}
                  </div>
               </div>
               <div className="grid gap-2">
                  <Label htmlFor={fields.email.name} className="text-base">
                     Email
                  </Label>
                  <Input
                     id={fields.email.id}
                     name={fields.email.name}
                     type="email"
                     placeholder="Enter your email"
                     required={fields.email.required}
                     aria-invalid={fields.email.errors ? true : undefined}
                     aria-describedby={
                        fields.email.errors ? fields.email.errorId : undefined
                     }
                  />
                  <div id={fields.email.errorId} className="text-destructive">
                     {fields.email.errors}
                  </div>
               </div>
               <Button
                  variant="secondary"
                  type="submit"
                  className="text-base w-full"
               >
                  Submit
               </Button>
               <Input type="hidden" name="token" value={token} />
            </Form>
         </CardContent>
      </Card>
   );
}

export default ContactForm;

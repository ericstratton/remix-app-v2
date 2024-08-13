import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * This function sends an email to the user and a notification to the site owner.
 * It should be called server-side.
 * @param html A string of HTML to send as the body of the email.
 * @param email User's email address.
 * @param name User's name.
 * @returns The response from the Resend API.
 */
export default async function sendEmail(html: string, email: string, name: string) {
   const contactEmail = process.env.CONTACT_EMAIL!;
   const { data, error } = await resend.batch.send([
      {
         from: `Eric Stratton <${contactEmail}>`,
         to: [email],
         subject: 'Thank you for reaching out!',
         html,
      },
      {
         from: `Resend <${contactEmail}>`,
         to: [contactEmail],
         subject: 'New contact form submission',
         text: `Name: ${name}\nEmail: ${email}`,
      },
   ]);

   return { data, error };
}

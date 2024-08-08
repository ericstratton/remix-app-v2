/**
 * This should always be called server-side.
 * @param token The reCAPTCHA token to verify.
 * @returns The reCAPTCHA verification response.
 */
const verifyRecaptcha = async (token: string) => {
   const secret = process.env.RECAPTCHA_SECRET_KEY;
   const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: `secret=${secret}&response=${token}`,
      }
   );

   if (!response.ok) {
      throw new Error('Failed to verify reCAPTCHA');
   }

   const data = await response.json();
   return data;
};

export default verifyRecaptcha;

import { useCallback, useEffect, useState } from 'react';

// https://developers.google.com/recaptcha/docs/enterprise/verify
// https://developers.google.com/recaptcha/docs/enterprise/clientapi#execute
declare global {
   interface Window {
      grecaptcha: {
         ready: (callback: () => void) => void;
         execute: (
            siteKey: string,
            options: { action: string }
         ) => Promise<string>;
      };
   }
}

type UseRecaptchaReturnType = {
   ready: boolean;
   getToken: (key?: string, action?: string) => Promise<string>;
};

/**
 * A hook to interact with the reCAPTCHA v3 API.
 * @returns An object with the reCAPTCHA ready state and a function to get a token.
 */
const useRecaptcha = (): UseRecaptchaReturnType => {
   const [ready, setReady] = useState(false);

   useEffect(() => {
      if (window.grecaptcha && window.grecaptcha.ready) {
         window.grecaptcha.ready(() => {
            setReady(true);
         });
      } else {
         const checkRecaptchaReady = setInterval(() => {
            if (window.grecaptcha && window.grecaptcha.ready) {
               window.grecaptcha.ready(() => {
                  setReady(true);
                  clearInterval(checkRecaptchaReady);
               });
            }
         }, 100);
      }
   }, []);

   const getToken = useCallback(async (key?: string, action = 'submit') => {
      if (!key) {
         throw new Error('Recaptcha site key is required');
      }

      try {
         const token = await window.grecaptcha.execute(key, { action });
         return token;
      } catch (error) {
         console.error('Error executing reCAPTCHA', error);
         throw error;
      }
   }, []);

   return { ready, getToken };
};

export default useRecaptcha;

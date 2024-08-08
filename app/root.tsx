import {
   Links,
   Meta,
   Scripts,
   ScrollRestoration,
   useLoaderData,
   useLocation,
   useOutlet,
} from '@remix-run/react';
import { json } from '@remix-run/node';
import './tailwind.css';
import Navigation from './components/navigation';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from './components/ui/toaster';

export function Layout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <head>
            <meta charSet="utf-8" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <Meta />
            <Links />
         </head>
         <body>
            {children}
            <ScrollRestoration />
            <Scripts />
         </body>
      </html>
   );
}

export const loader = () => {
   const siteKey = process.env.RECAPTCHA_SITE_KEY;

   return json({ siteKey });
};

export default function App() {
   const location = useLocation();
   const outlet = useOutlet();
   const { siteKey } = useLoaderData<typeof loader>();

   useEffect(() => {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      document.head.appendChild(script);
      return () => {
         document.head.removeChild(script);
      };
   }, [siteKey]);

   return (
      <div className="flex flex-col min-h-screen overflow-hidden">
         <header className="w-full h-16 border-t border-b">
            <Navigation />
         </header>
         <main className="w-full h-full">
            <AnimatePresence mode="wait" initial={false}>
               <motion.div
                  key={location.pathname}
                  initial={{ y: '2%', opacity: 0 }}
                  animate={{ y: '0', opacity: 1 }}
                  exit={{ y: '-2%', opacity: 0 }}
               >
                  {outlet}
               </motion.div>
            </AnimatePresence>
         </main>
         <Toaster />
      </div>
   );
}

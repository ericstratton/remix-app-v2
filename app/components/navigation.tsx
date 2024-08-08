import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

function GlobeRotate() {
   return (
      <motion.div
         animate={{ rotateY: 360 }}
         transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
         className="hidden md:flex items-center px-4"
      >
         <Globe size={36} />
      </motion.div>
   );
}

function NavigationItem({
   to,
   children,
}: {
   to: string;
   children: React.ReactNode;
}) {
   return (
      <Link
         to={to}
         className="flex-1 flex justify-center py-3 px-2 border-r text-2xl md:first:border-l"
      >
         {children}
      </Link>
   );
}

const navLinks = [
   { to: '/', text: 'Home' },
   { to: '/about', text: 'About' },
   { to: '/projects', text: 'Projects' },
   { to: '/contact', text: 'Contact' },
];

function Navigation() {
   return (
      <div className="flex justify-between w-full h-full mx-[2px]">
         <GlobeRotate />
         <nav className="flex h-full w-full md:w-1/2">
            {navLinks.map((link) => (
               <NavigationItem key={link.to} to={link.to}>
                  <span>{link.text}</span>
               </NavigationItem>
            ))}
         </nav>
      </div>
   );
}

export default Navigation;

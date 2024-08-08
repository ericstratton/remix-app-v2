import type { MetaFunction } from '@remix-run/node';
import PageSection from '~/components/pagesection';

export const meta: MetaFunction = () => {
   return [
      { title: "Hi, I'm Eric Stratton" },
      { name: 'description', content: 'Welcome to my site.' },
   ];
};

export default function Index() {
   return (
      <PageSection>
         <h1 className="font-display mb-6 text-5xl sm:text-7xl md:text-9xl">
            Eric Stratton
         </h1>
         <h2 className="font-medium text-muted-foreground mb-4 text-5xl md:text-7xl">
            Full-Stack Software Developer
         </h2>
         <p className="text-muted-foreground text-xl md:text-2xl">
            I&apos;m a software developer with a drive for building easy to use
            and performant applications, and a curiousity for stones unturned.
         </p>
      </PageSection>
   );
}

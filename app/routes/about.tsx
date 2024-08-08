import { MetaFunction } from '@remix-run/node';
import PageSection from '~/components/pagesection';
import me from '~/assets/images/me.jpg';

export const meta: MetaFunction = () => {
   return [
      { title: 'About me' },
      { name: 'description', content: 'Just some stuff about me.' },
   ];
};

export default function AboutPage() {
   return (
      <PageSection>
         <div className="mb-6 md:mb-8">
            <h2 className="font-display text-4xl mb-4 sm:6xl md:mb-6 md:text-8xl">
               About me
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-4">
               I&apos;m a full-stack developer with a passion for creating
               innovative and user-friendly web applications. I have experience
               working with a variety of technologies, including React, Node.js,
               Next.js, Remix.run, Tailwind CSS, Java, relational and
               non-relational databases, and more. Though admittedly, I love
               writing JavaScript the most! In my free time, I enjoy exploring
               new technologies, reading about the latest industry trends,
               getting outside, touching grass, climbing rocks, and diving into
               generative and procedural art. I&apos;m always eager to learn and
               grow, both as a developer and as a human.
            </p>
         </div>
         <div className="flex justify-center mb-8">
            <div className="w-full max-w-xl">
               <img
                  src={me}
                  alt="Me sitting in a chair on a balcony in Mexico"
                  className="w-full h-auto"
               />
            </div>
         </div>
      </PageSection>
   );
}

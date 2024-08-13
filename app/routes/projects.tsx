import { MetaFunction } from '@remix-run/node';
import ProjectCard from '~/components/projectcard';
import PageSection from '~/components/pagesection';
import projects from '~/data/projects';

export const meta: MetaFunction = () => {
   return [
      { title: 'My projects' },
      {
         name: 'description',
         content: 'Check out some of cool things I have worked on.',
      },
   ];
};

export default function ProjectsPage() {
   return (
      <PageSection>
         <div className="mb-6 md:mb-8">
            <h2 className="font-display text-4xl mb-4 sm:6xl md:mb-6 md:text-8xl">
               My projects
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed mb-4">
               Here are some of the projects I have worked on. Each project
               showcases my skills in various technologies and problem-solving
               approaches.
            </p>
         </div>
         <div className="flex flex-col gap-4">
            {projects.map((project) => (
               <ProjectCard key={project.title} {...project} />
            ))}
         </div>
      </PageSection>
   );
}

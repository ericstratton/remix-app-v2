import { Link } from '@remix-run/react';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Code2, Globe } from 'lucide-react';
import { Badge } from './ui/badge';
import { ProjectData } from '~/data/projects';
import { cn } from '~/lib/utils';

function ProjectCard({
   title,
   date,
   description,
   technologies,
   image,
   imageBg,
   linkCode,
   linkSite,
}: ProjectData) {
   return (
      <Card className="flex flex-col bg-background rounded-lg shadow-lg overflow-hidden max-w-3xl w-full md:flex-row md:h-96">
         <div className={cn('h-full md:w-1/2', imageBg || 'bg-card')}>
            <img
               src={image}
               alt="Project Screenshot"
               className="w-full h-auto object-cover aspect-auto"
            />
         </div>
         <div className="flex flex-col h-full md:w-1/2 bg-card">
            <CardHeader>
               <CardTitle className="text-2xl tracking-normal">
                  {title}
               </CardTitle>
               <CardDescription className="text-base text-muted-foreground">
                  {date}
               </CardDescription>
            </CardHeader>
            <CardContent>
               <p className="text-muted-foreground">{description}</p>
               <div className="flex flex-wrap gap-2 mt-4">
                  {technologies.map((tech) => (
                     <Badge
                        className="rounded-none text-base tracking-wide"
                        key={tech}
                     >
                        {tech}
                     </Badge>
                  ))}
               </div>
            </CardContent>
            <CardFooter className="mt-auto justify-end gap-2">
               {linkCode && (
                  <Link to={linkCode} target="_blank" rel="noreferrer">
                     <Button
                        variant="secondary"
                        className="flex gap-2 text-base"
                     >
                        <Code2 size={16} />
                        Code
                     </Button>
                  </Link>
               )}
               {linkSite && (
                  <Link to={linkSite} target="_blank" rel="noreferrer">
                     <Button
                        variant="secondary"
                        className="flex gap-2 text-base"
                     >
                        <Globe size={16} />
                        Website
                     </Button>
                  </Link>
               )}
            </CardFooter>
         </div>
      </Card>
   );
}

export default ProjectCard;

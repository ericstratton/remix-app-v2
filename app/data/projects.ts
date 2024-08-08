import bakery from '~/assets/images/bakery-project.jpg';

export type ProjectData = {
   title: string;
   date: string;
   description: string;
   technologies: string[];
   image: string;
   imageBg: string;
   linkCode: string;
   linkSite: string;
};

const projects: ProjectData[] = [
   {
      title: "Ric's Bread & Butter",
      date: 'August, 2024',
      description:
         'A simple e-commerce website for a make-believe local bakery.',
      technologies: [
         'Next.js',
         'Appwrite',
         'TypeScript',
         'Tailwind CSS',
         'Zustand',
      ],
      image: bakery,
      imageBg: 'bg-[hsl(0,0%,100%)]',
      linkCode: 'https://github.com/ericstratton/next-ecommerce',
      linkSite: 'https://next-ecommerce-one-lyart.vercel.app/',
   },
];

export default projects;

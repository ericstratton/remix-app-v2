function PageSection({ children }: { children: React.ReactNode }) {
   return (
      <section className="flex justify-center h-full py-12 overflow-y-auto overscroll-contain md:py-24">
         <div className="w-full px-2 md:max-w-4xl">{children}</div>
      </section>
   );
}

export default PageSection;

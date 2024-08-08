import { Form } from '@remix-run/react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from './ui/card';
import { Label } from './ui/label';

function ContactForm({ token }: { token: string }) {
   return (
      <Card className="w-full max-w-3xl">
         <CardHeader>
            <CardTitle className="tracking-normal">
               Thanks for stopping by
            </CardTitle>
            <CardDescription className="text-base">
               Fill out the form and I&apos;ll get back to you as soon as
               possible.
            </CardDescription>
         </CardHeader>
         <CardContent>
            <Form method="post" className="space-y-8">
               <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input name="name" placeholder="Enter your name" required />
               </div>
               <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                     name="email"
                     type="email"
                     placeholder="Enter your email"
                     required
                  />
               </div>
               <Button
                  variant="secondary"
                  type="submit"
                  className="text-base w-full"
               >
                  Submit
               </Button>
               <Input type="hidden" name="token" value={token} />
            </Form>
         </CardContent>
      </Card>
   );
}

export default ContactForm;

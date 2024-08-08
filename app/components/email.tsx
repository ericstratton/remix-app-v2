import {
   Html,
   Head,
   Preview,
   Body,
   Container,
   Section,
   Heading,
   Text,
   Link,
   Tailwind,
} from '@react-email/components';
import type { TailwindConfig } from '@react-email/tailwind';

const tailwindConfig = {
   // See: https://react.email/docs/components/tailwind#tailwind-configuration-with-px-instead-of-rem
   theme: {
      fontSize: {
         xs: ['12px', { lineHeight: '16px' }],
         sm: ['14px', { lineHeight: '20px' }],
         base: ['16px', { lineHeight: '24px' }],
         lg: ['18px', { lineHeight: '28px' }],
         xl: ['20px', { lineHeight: '28px' }],
         '2xl': ['24px', { lineHeight: '32px' }],
         '3xl': ['30px', { lineHeight: '36px' }],
         '4xl': ['36px', { lineHeight: '36px' }],
         '5xl': ['48px', { lineHeight: '1' }],
         '6xl': ['60px', { lineHeight: '1' }],
         '7xl': ['72px', { lineHeight: '1' }],
         '8xl': ['96px', { lineHeight: '1' }],
         '9xl': ['144px', { lineHeight: '1' }],
      },
      spacing: {
         px: '1px',
         0: '0',
         0.5: '2px',
         1: '4px',
         1.5: '6px',
         2: '8px',
         2.5: '10px',
         3: '12px',
         3.5: '14px',
         4: '16px',
         5: '20px',
         6: '24px',
         7: '28px',
         8: '32px',
         9: '36px',
         10: '40px',
         11: '44px',
         12: '48px',
         14: '56px',
         16: '64px',
         20: '80px',
         24: '96px',
         28: '112px',
         32: '128px',
         36: '144px',
         40: '160px',
         44: '176px',
         48: '192px',
         52: '208px',
         56: '224px',
         60: '240px',
         64: '256px',
         72: '288px',
         80: '320px',
         96: '384px',
      },
   },
} satisfies TailwindConfig;

const Email = ({ recipient }: { recipient: string }) => (
   <Html lang="en">
      <Head />
      <Preview>Hi!👋 Thank You for Contacting Me</Preview>
      <Tailwind config={tailwindConfig}>
         <Body className="bg-gray-100 p-8">
            <Container className="max-w-xl mx-auto bg-white p-8 rounded-lg">
               <Section className="mb-6">
                  <Heading className="text-2xl font-semibold text-gray-800">
                     Thank You for Contacting Me
                  </Heading>
               </Section>
               <Section className="mb-6 text-gray-700">
                  <Text>Hi {recipient},</Text>
                  <Text className="mt-4">
                     Thank you for reaching out. I have received your message
                     and will get back to you as soon as possible.
                  </Text>
                  <Text className="mt-4">
                     In the meantime, if you&apos;d like to know more about my
                     work, feel free to visit my site by clicking the button
                     below.
                  </Text>
                  <Link
                     href="https://ericstratton.info"
                     className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                     Visit My Portfolio
                  </Link>
               </Section>
               <Section className="mt-6 text-gray-500 text-sm">
                  <Text>
                     © {new Date().getFullYear()} Eric Stratton. All rights
                     reserved.
                  </Text>
               </Section>
            </Container>
         </Body>
      </Tailwind>
   </Html>
);

export default Email;

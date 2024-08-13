import { z } from 'zod';

const schema = z.object({
   email: z
      .string({ required_error: 'Email is required' })
      .email('Email is invalid'),
   name: z
      .string({ required_error: 'Name is required' })
      .max(50, 'Name is too long'),
});

export default schema;

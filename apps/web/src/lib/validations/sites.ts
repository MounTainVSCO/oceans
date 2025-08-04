import { z } from 'zod';

// Site form validation
export const siteSchema = z.object({
  name: z.string().min(1, 'Site name is required'),
  slug: z
    .string()
    .min(1, 'Site slug is required')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug can only contain lowercase letters, numbers, and hyphens'
    ),
  domain: z
    .string()
    .optional()
    .refine(
      val =>
        !val ||
        /^https?:\/\//.test(val) ||
        /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
      'Please enter a valid URL'
    ),
  isPublic: z.boolean(),
});

// Export types
export type SiteFormData = z.infer<typeof siteSchema>;

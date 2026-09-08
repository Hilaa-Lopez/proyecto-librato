// src/modules/stories/story.schema.ts
import { z } from 'zod';

export const CreateStorySchema = z.object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres').max(150),
    synopsis: z.string().min(10, 'La sinopsis debe tener al menos 10 caracteres'),
    genre: z.string().min(2),
    coverUrl: z.string().url('URL de portada inválida').optional(),
    isInteractive: z.boolean().default(false)
});

export type CreateStoryInput = z.infer<typeof CreateStorySchema>;
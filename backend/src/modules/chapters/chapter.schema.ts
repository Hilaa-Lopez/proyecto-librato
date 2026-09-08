// src/modules/chapters/chapter.schema.ts
import { z } from 'zod';

export const CreateChapterSchema = z.object({
  chapterNumber: z.number().int().positive(),
  title: z.string().min(2).max(120),
  contentScript: z.string().optional(),
  audioUrl: z.string().url('URL de audio inválida'),
  ambientAudioUrl: z.string().url('URL de ambiente inválida').optional(),
  durationSec: z.number().int().positive('La duración debe ser mayor a 0 segundos'),
  isFreePreview: z.boolean().default(false),
  narrationType: z.enum(['HUMAN_VOICE', 'AI_GENERATED', 'INVITED_VOICE']).default('HUMAN_VOICE'),
  voiceModelId: z.string().optional()
});

export type CreateChapterInput = z.infer<typeof CreateChapterSchema>;
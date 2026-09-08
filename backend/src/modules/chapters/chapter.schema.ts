export const CreateChapterSchema = z.object({
  chapterNumber: z.number().int().positive(),
  title: z.string().min(2).max(120),
  contentScript: z.string().optional(),
  
  // audioUrl ahora es opcional. Útil si el capítulo se crea solo con texto 
  // para luego ser procesado por el pipeline TTS de IA.
  audioUrl: z.string().url('URL de audio inválida').optional(),
  
  ambientAudioUrl: z.string().url('URL de ambiente inválida').optional(),
  durationSec: z.number().int().min(0).default(0),
  isFreePreview: z.boolean().default(false),
  narrationType: z.enum(['HUMAN_VOICE', 'AI_GENERATED', 'INVITED_VOICE']).default('HUMAN_VOICE'),
  voiceModelId: z.string().optional()
});
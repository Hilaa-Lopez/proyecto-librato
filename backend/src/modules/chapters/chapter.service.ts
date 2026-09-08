import { PrismaClient } from '@prisma/client';
import { CreateChapterInput } from './chapter.schema';

const prisma = new PrismaClient();

export class ChapterService {
  static async addChapterToStory(storyId: string, authorId: string, data: CreateChapterInput) {
    // Validar propiedad de la historia
    const story = await prisma.story.findFirst({
      where: { id: storyId, authorId }
    });

    if (!story) {
      throw new Error('No autorizado o la historia no existe');
    }

    // Regla de negocio: Capítulos 1 y 2 quedan libres para enganchar oyentes
    const isFree = data.chapterNumber <= 2 ? true : data.isFreePreview;

    return prisma.chapter.create({
      data: {
        ...data,
        isFreePreview: isFree,
        storyId
      }
    });
  }
}
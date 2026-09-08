import { PrismaClient } from '@prisma/client';
import { CreateChapterInput } from './chapter.schema';

const prisma = new PrismaClient();

export class ChapterService {
  static async addChapterToStory(storyId: string, authorId: string, data: CreateChapterInput) {
    // Obtenemos la historia incluyendo su límite freemium configurado
    const story = await prisma.story.findFirst({
      where: { id: storyId, authorId },
      select: { id: true, freeChapterLimit: true }
    });

    if (!story) {
      throw new Error('No autorizado o la historia no existe');
    }

    // Regla freemium dinámica: compara contra el límite de la historia actual
    const isFree = data.chapterNumber <= story.freeChapterLimit ? true : data.isFreePreview;

    return prisma.chapter.create({
      data: {
        ...data,
        isFreePreview: isFree,
        storyId
      }
    });
  }
}
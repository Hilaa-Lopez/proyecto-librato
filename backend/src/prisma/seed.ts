import { PrismaClient, Role, SubscriptionStatus, NarrationType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe('TRUNCATE TABLE users, stories, chapters CASCADE;');

  const creator = await prisma.user.create({
    data: {
      email: 'creador@librato.app',
      username: 'narrador_demo',
      passwordHash: '$2b$10$demoHashForDevelopmentOnly12345',
      role: Role.CREATOR,
      subscriptionStatus: SubscriptionStatus.PREMIUM
    }
  });

  const story = await prisma.story.create({
    data: {
      title: 'El Susurro del Abismo',
      synopsis: 'Una expedición a las profundidades de la Patagonia revela secretos ancestrales.',
      genre: 'Terror / Misterio',
      status: 'PUBLISHED',
      authorId: creator.id
    }
  });

  await prisma.chapter.createMany({
    data: [
      {
        storyId: story.id,
        chapterNumber: 1,
        title: 'El Descenso',
        audioUrl: 'https://cdn.librato.app/audio/demo-ch1.mp3',
        durationSec: 420,
        isFreePreview: true,
        narrationType: NarrationType.HUMAN_VOICE
      },
      {
        storyId: story.id,
        chapterNumber: 2,
        title: 'Ecos en la Niebla',
        audioUrl: 'https://cdn.librato.app/audio/demo-ch2.mp3',
        durationSec: 510,
        isFreePreview: true,
        narrationType: NarrationType.HUMAN_VOICE
      },
      {
        storyId: story.id,
        chapterNumber: 3,
        title: 'La Grieta',
        audioUrl: 'https://cdn.librato.app/audio/demo-ch3.mp3',
        durationSec: 600,
        isFreePreview: false,
        narrationType: NarrationType.HUMAN_VOICE
      }
    ]
  });

  console.log('Seeding completado con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
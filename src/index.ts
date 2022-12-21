import express from 'express';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const genId = () => nanoid(16);

const db = new PrismaClient({
  log: ['error', 'query', 'info', 'warn'],
});

const seedDatabase = async () => {
  console.log('Seeding database...');

  const postsCount = await db.post.count();

  if (postsCount === 0) {
    await db.post.createMany({
      data: [
        {
          id: genId(),
          slug: 'ulti-node',
          title: 'ulti-node',
          content: 'ulti-node',
          publishedAt: new Date(),
        },
        {
          id: genId(),
          slug: 'ulti-react',
          title: 'ulti-react',
        },
      ],
    });
    console.log('Database seeded.');
  }
};
seedDatabase();

const app = express();

app.use(morgan('dev'));

app.get('/', async (req, res) => {
  const posts = await db.post.findMany();

  res.json(posts);
});

const port = Number(process.env.PORT) || 8080;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is listening on port ${port}`);
});

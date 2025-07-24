import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tvShows = [
  {
    title: "Game of Thrones",
    description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    firstAired: new Date("2011-04-17"),
    totalSeasons: 8,
    totalEpisodes: 73,
    genre: ["Drama", "Fantasy", "Adventure"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=BJF-wVW1F2o",
    status: "Ended",
    network: "HBO",
  },
  {
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    firstAired: new Date("2016-07-15"),
    totalSeasons: 4,
    totalEpisodes: 42,
    genre: ["Drama", "Fantasy", "Horror", "Mystery", "Sci-Fi", "Thriller"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BN2ZmYjg1YmItNWQ4OC00YWM0LWE0ZDktYThjOTZiZjhhN2Q2XkEyXkFqcGdeQXVyNjgxNTQ3Mjk@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    status: "Ended",
    network: "Netflix",
  },
  {
    title: "The Crown",
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    firstAired: new Date("2016-11-04"),
    totalSeasons: 6,
    totalEpisodes: 60,
    genre: ["Biography", "Drama", "History"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZmY0MzBlNjctYjFkZC00ODY4LWJkMjYtMzIzODczYTIwNmFjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=JWtnJjn6ng0",
    status: "Ended",
    network: "Netflix",
  },
  {
    title: "Breaking Bad",
    description: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's future.",
    firstAired: new Date("2008-01-20"),
    totalSeasons: 5,
    totalEpisodes: 62,
    genre: ["Crime", "Drama", "Thriller"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=HhesaQXLuRY",
    status: "Ended",
    network: "AMC",
  },
  {
    title: "The Office",
    description: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
    firstAired: new Date("2005-03-24"),
    totalSeasons: 9,
    totalEpisodes: 201,
    genre: ["Comedy"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=LHOtME2DL4g",
    status: "Ended",
    network: "NBC",
  }
];

async function seedTVShows() {
  console.log('🌱 Seeding database with TV show data...');

  // Check if TV shows already exist
  const existingTVShows = await prisma.tVShow.findMany();
  if (existingTVShows.length > 0) {
    console.log('📺 TV Shows already exist in database. Skipping seed...');
    return;
  }

  // Create TV shows
  for (const tvShow of tvShows) {
    await prisma.tVShow.create({
      data: tvShow,
    });
  }

  console.log(`✅ Successfully seeded ${tvShows.length} TV shows to the database!`);
}

seedTVShows()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const movies = [
  {
    title: 'The Shawshank Redemption',
    description:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    releaseDate: new Date('1994-09-23'),
    duration: 142,
    genre: ['Drama', 'Crime'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=6hB3S9bIaco',
    videoUrl: 'https://example.com/shawshank-redemption',
  },
  {
    title: 'The Godfather',
    description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    releaseDate: new Date('1972-03-24'),
    duration: 175,
    genre: ['Crime', 'Drama'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=sY1S34973zA',
    videoUrl: 'https://example.com/godfather',
  },
  {
    title: 'The Dark Knight',
    description:
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
    releaseDate: new Date('2008-07-18'),
    duration: 152,
    genre: ['Action', 'Crime', 'Drama'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
    videoUrl: 'https://example.com/dark-knight',
  },
  {
    title: 'Pulp Fiction',
    description:
      'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    releaseDate: new Date('1994-10-14'),
    duration: 154,
    genre: ['Crime', 'Drama'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=s7EdQ4FqbhY',
    videoUrl: 'https://example.com/pulp-fiction',
  },
  {
    title: "Schindler's List",
    description:
      'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    releaseDate: new Date('1993-12-15'),
    duration: 195,
    genre: ['Biography', 'Drama', 'History'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=gG22XNhtnoY',
    videoUrl: 'https://example.com/schindlers-list',
  },
  {
    title: 'The Lord of the Rings: The Return of the King',
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    releaseDate: new Date('2003-12-17'),
    duration: 201,
    genre: ['Adventure', 'Drama', 'Fantasy'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWI5MTktXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=r5X-hFf6Bwo',
    videoUrl: 'https://example.com/lotr-return-king',
  },
  {
    title: 'Fight Club',
    description:
      'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    releaseDate: new Date('1999-10-15'),
    duration: 139,
    genre: ['Drama'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=qtRKdVHc-cE',
    videoUrl: 'https://example.com/fight-club',
  },
  {
    title: 'Forrest Gump',
    description:
      'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.',
    releaseDate: new Date('1994-07-06'),
    duration: 142,
    genre: ['Drama', 'Romance'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=bLvqoHBptjg',
    videoUrl: 'https://example.com/forrest-gump',
  },
  {
    title: 'Inception',
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    releaseDate: new Date('2010-07-16'),
    duration: 148,
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
    videoUrl: 'https://example.com/inception',
  },
  {
    title: 'The Matrix',
    description:
      'A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.',
    releaseDate: new Date('1999-03-31'),
    duration: 136,
    genre: ['Action', 'Sci-Fi'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
    videoUrl: 'https://example.com/matrix',
  },
  {
    title: 'Goodfellas',
    description:
      'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.',
    releaseDate: new Date('1990-09-21'),
    duration: 146,
    genre: ['Biography', 'Crime', 'Drama'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=qo5jJpHtI40',
    videoUrl: 'https://example.com/goodfellas',
  },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    description:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station.",
    releaseDate: new Date('1977-05-25'),
    duration: 121,
    genre: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=vZ734NWnAHA',
    videoUrl: 'https://example.com/star-wars-new-hope',
  },
  {
    title: 'Interstellar',
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseDate: new Date('2014-11-07'),
    duration: 169,
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
    videoUrl: 'https://example.com/interstellar',
  },
  {
    title: 'Parasite',
    description:
      'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    releaseDate: new Date('2019-05-30'),
    duration: 132,
    genre: ['Comedy', 'Drama', 'Thriller'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=5xH0HfJHsaY',
    videoUrl: 'https://example.com/parasite',
  },
  {
    title: 'The Lion King',
    description:
      'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    releaseDate: new Date('1994-06-24'),
    duration: 88,
    genre: ['Animation', 'Adventure', 'Drama', 'Family'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNjYtMmM3ZTgzOGVlOTU0XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=lFzVJEksoDY',
    videoUrl: 'https://example.com/lion-king',
  },
  {
    title: 'Gladiator',
    description:
      'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
    releaseDate: new Date('2000-05-05'),
    duration: 155,
    genre: ['Action', 'Adventure', 'Drama'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=owK1qxDselE',
    videoUrl: 'https://example.com/gladiator',
  },
  {
    title: 'Titanic',
    description:
      'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
    releaseDate: new Date('1997-12-19'),
    duration: 194,
    genre: ['Drama', 'Romance'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=2e-eXJ6HgkQ',
    videoUrl: 'https://example.com/titanic',
  },
  {
    title: 'The Departed',
    description:
      'An undercover cop and a police informant play a cat and mouse game with each other as they attempt to expose one another in the Boston underworld.',
    releaseDate: new Date('2006-10-06'),
    duration: 151,
    genre: ['Crime', 'Drama', 'Thriller'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=auYbpnEeEiI',
    videoUrl: 'https://example.com/departed',
  },
  {
    title: 'Whiplash',
    description:
      "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    releaseDate: new Date('2014-10-10'),
    duration: 106,
    genre: ['Drama', 'Music'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=7d_jQycdQGo',
    videoUrl: 'https://example.com/whiplash',
  },
  {
    title: 'Avatar',
    description:
      'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    releaseDate: new Date('2009-12-18'),
    duration: 162,
    genre: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi'],
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
    trailerUrl: 'https://www.youtube.com/watch?v=5PSNL1qE6VY',
    videoUrl: 'https://example.com/avatar',
  },
];

async function main() {
  console.log('🌱 Seeding database with movie data...');

  // Check if movies already exist
  const existingMovies = await prisma.movie.findMany();
  if (existingMovies.length > 0) {
    console.log('📊 Movies already exist in database. Skipping seed...');
    return;
  }

  // Create movies
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
  }

  console.log(
    `✅ Successfully seeded ${movies.length} movies to the database!`,
  );
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

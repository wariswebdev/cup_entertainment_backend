-- CreateTable
CREATE TABLE "TVShow" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "firstAired" TIMESTAMP(3) NOT NULL,
    "totalSeasons" INTEGER NOT NULL,
    "totalEpisodes" INTEGER NOT NULL,
    "genre" TEXT[],
    "posterUrl" TEXT NOT NULL,
    "trailerUrl" TEXT,
    "status" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TVShow_pkey" PRIMARY KEY ("id")
);

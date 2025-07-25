# Cup Entertainment Backend

A RESTful API backend for a movie and TV show entertainment platform built with Express.js, TypeScript, and Prisma.

## Features

- **Authentication**: User registration and login with JWT tokens
- **Movies Management**: CRUD operations for movies
- **TV Shows Management**: CRUD operations for TV shows
- **Search**: Search functionality for movies and TV shows by title
- **Filter**: Filter content by genre
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Request validation using express-validator
- **Error Handling**: Centralized error handling middleware

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator
- **Security**: bcryptjs for password hashing
- **Development**: Nodemon for hot reloading

## Project Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cup_entertainment_backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory with the following variables:

   ```bash
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/cup_entertainment"

   # JWT Secret
   JWT_SECRET="your-super-secret-jwt-key-here"

   # Server
   PORT=3000

   # Node Environment
   NODE_ENV=development
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev

   # Seed the database (optional)
   npm run db:seed
   npm run db:seed:tvshows
   ```

## Available Scripts

- `npm run start:dev` - Start the development server with hot reload
- `npm run build` - Build the TypeScript code
- `npm run start` - Start the production server
- `npm run start:prod` - Start the production server (alias)
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run db:seed` - Seed movies data
- `npm run db:seed:tvshows` - Seed TV shows data

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login user

### Movies

- `GET /movies` - Get all movies
- `GET /movies/:id` - Get a specific movie
- `POST /movies` - Create a new movie
- `PATCH /movies/:id` - Update a movie
- `DELETE /movies/:id` - Delete a movie
- `GET /movies/genre/:genre` - Get movies by genre
- `GET /movies/search/:query` - Search movies

### TV Shows

- `GET /tv-shows` - Get all TV shows
- `GET /tv-shows/:id` - Get a specific TV show
- `POST /tv-shows` - Create a new TV show
- `PATCH /tv-shows/:id` - Update a TV show
- `DELETE /tv-shows/:id` - Delete a TV show
- `GET /tv-shows/genre/:genre` - Get TV shows by genre
- `GET /tv-shows/search/:query` - Search TV shows

## Project Structure

```
src/
├── middleware/
│   ├── error.middleware.ts      # Error handling middleware
│   └── validation.middleware.ts # Request validation middleware
├── prisma/
│   └── prisma.service.ts       # Prisma client service
├── routes/
│   ├── auth.routes.ts          # Authentication routes
│   ├── movie.routes.ts         # Movie routes
│   └── tvshow.routes.ts        # TV show routes
├── services/
│   ├── auth.service.ts         # Authentication business logic
│   ├── movie.service.ts        # Movie business logic
│   └── tvshow.service.ts       # TV show business logic
└── app.ts                      # Express application setup
```

## Database Schema

The application uses the following main entities:

- **User**: User authentication and profile information
- **Movie**: Movie details including title, description, genre, etc.
- **TVShow**: TV show details including seasons, episodes, network, etc.

## Development

1. **Start the development server**

   ```bash
   npm run start:dev
   ```

2. **The server will start on** `http://localhost:3000`

3. **Database changes**
   - Modify the schema in `prisma/schema.prisma`
   - Generate migration: `npx prisma migrate dev --name your_migration_name`
   - Update Prisma client: `npx prisma generate`

## Production Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Run database migrations**

   ```bash
   npx prisma migrate deploy
   ```

4. **Start the production server**
   ```bash
   npm run start:prod
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and unlicensed.

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { TVShowModule } from './tvshow/tvshow.module';

@Module({
  imports: [AuthModule, MovieModule, TVShowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

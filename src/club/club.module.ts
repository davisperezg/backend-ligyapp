import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClubController } from './controller/club.controller';
import { Club, ClubSchema } from './schemas/club.schemas';
import { ClubService } from './services/club.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Club.name, schema: ClubSchema }]),
  ],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}

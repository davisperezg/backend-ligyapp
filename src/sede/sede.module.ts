import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SedeController } from './controller/sede.controller';
import { Sede, SedeSchema } from './schemas/sede.schema';
import { SedeService } from './services/sede.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sede.name, schema: SedeSchema }]),
  ],
  controllers: [SedeController],
  providers: [SedeService],
})
export class SedeModule {}

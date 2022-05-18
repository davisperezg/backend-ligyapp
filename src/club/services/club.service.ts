import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Club, ClubDocument } from '../schemas/club.schemas';

@Injectable()
export class ClubService {
  constructor(@InjectModel(Club.name) private clubModel: Model<ClubDocument>) {}

  async create(bodySede: Club, user: any): Promise<Club> {
    const { findUser } = user;

    const sendData: Club = {
      ...bodySede,
      status: true,
      creator: findUser._id,
      updatedBy: findUser._id,
    };

    const createClub = new this.clubModel(sendData);

    return await createClub.save();
  }

  async findAll(): Promise<Club[]> {
    return await this.clubModel.find({
      status: true,
    });
  }

  async findOneClub(id: string): Promise<Club> {
    return await this.clubModel.findById(id);
  }

  async update(id: string, updateSede: Club, user: any): Promise<Club> {
    const { status } = updateSede;
    const { findUser } = user;

    if (status === false || status === true) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          type: 'UNAUTHORIZED',
          message: 'Unauthorized Exception',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const sendData: Club = {
      ...updateSede,
      updatedBy: findUser._id,
    };

    return await this.clubModel.findByIdAndUpdate(id, sendData);
  }

  async delete(id: string): Promise<boolean> {
    let result = false;
    try {
      await this.clubModel.findByIdAndUpdate(id, { status: false });
      result = true;
    } catch (e) {
      throw new Error(`Error en SedeService.delete ${e}`);
    }
    return result;
  }

  async restore(id: string): Promise<boolean> {
    let result = false;

    try {
      await this.clubModel.findByIdAndUpdate(id, { status: true });
      result = true;
    } catch (e) {
      throw new Error(`Error en SedeService.restore ${e}`);
    }

    return result;
  }
}

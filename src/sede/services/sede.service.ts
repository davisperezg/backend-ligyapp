import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sede, SedeDocument } from '../schemas/sede.schema';

@Injectable()
export class SedeService {
  constructor(@InjectModel(Sede.name) private sedeModel: Model<SedeDocument>) {}

  async create(bodySede: Sede): Promise<Sede> {
    const sendData: Sede = {
      ...bodySede,
      status: true,
    };

    const createSede = new this.sedeModel(sendData);

    return await createSede.save();
  }

  async findAll(): Promise<Sede[]> {
    return await this.sedeModel.find({
      status: true,
    });
  }

  async findOneSede(id: string): Promise<Sede> {
    return await this.sedeModel.findById(id);
  }

  async update(id: string, updateSede: Sede): Promise<Sede> {
    const { status } = updateSede;
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

    return await this.sedeModel.findByIdAndUpdate(id, updateSede);
  }

  async delete(id: string): Promise<boolean> {
    let result = false;
    try {
      await this.sedeModel.findByIdAndUpdate(id, { status: false });
      result = true;
    } catch (e) {
      throw new Error(`Error en SedeService.delete ${e}`);
    }
    return result;
  }

  async restore(id: string): Promise<boolean> {
    let result = false;

    try {
      await this.sedeModel.findByIdAndUpdate(id, { status: true });
      result = true;
    } catch (e) {
      throw new Error(`Error en SedeService.restore ${e}`);
    }

    return result;
  }
}

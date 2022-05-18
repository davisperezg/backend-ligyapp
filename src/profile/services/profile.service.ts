import { Profile, ProfileDocument } from './../schemas/profile.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async create(bodyProfile: Profile, user: any): Promise<Profile> {
    const { findUser } = user;

    const senData: Profile = {
      ...bodyProfile,
      status: true,
      creator: findUser._id,
      updatedBy: findUser._id,
    };

    const createProfile = new this.profileModel(senData);

    return await createProfile.save();
  }

  async findAll(user: any): Promise<Profile[]> {
    const { findUser } = user;
    return await this.profileModel.find({
      status: true,
      creator: findUser._id,
    });
  }

  async findOneCategory(id: string): Promise<Profile> {
    return await this.profileModel.findById(id);
  }

  async update(
    id: string,
    updateProfile: Profile,
    user: any,
  ): Promise<Profile> {
    const { findUser } = user;
    const { status } = updateProfile;
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

    const sendData: Profile = {
      ...updateProfile,
      updatedBy: findUser._id,
    };

    return await this.profileModel.findByIdAndUpdate(id, sendData);
  }

  async delete(id: string): Promise<boolean> {
    let result = false;
    try {
      await this.profileModel.findByIdAndUpdate(id, { status: false });
      result = true;
    } catch (e) {
      throw new Error(`Error en ProfileService.delete ${e}`);
    }
    return result;
  }

  async restore(id: string): Promise<boolean> {
    let result = false;

    try {
      await this.profileModel.findByIdAndUpdate(id, { status: true });
      result = true;
    } catch (e) {
      throw new Error(`Error en ProfileService.restore ${e}`);
    }

    return result;
  }
}

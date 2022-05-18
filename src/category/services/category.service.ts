import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(bodyCategory: Category): Promise<Category> {
    const senData: Category = {
      ...bodyCategory,
      status: true,
    };

    const createCategory = new this.categoryModel(senData);

    return await createCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find({
      status: true,
    });
  }

  async findOneCategory(id: string): Promise<Category> {
    return await this.categoryModel.findById(id);
  }

  async update(id: string, updateCategory: Category): Promise<Category> {
    const { status } = updateCategory;
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

    return await this.categoryModel.findByIdAndUpdate(id, updateCategory);
  }

  async delete(id: string): Promise<boolean> {
    let result = false;
    try {
      await this.categoryModel.findByIdAndUpdate(id, { status: false });
      result = true;
    } catch (e) {
      throw new Error(`Error en CategoryService.delete ${e}`);
    }
    return result;
  }

  async restore(id: string): Promise<boolean> {
    let result = false;

    try {
      await this.categoryModel.findByIdAndUpdate(id, { status: true });
      result = true;
    } catch (e) {
      throw new Error(`Error en CategoryService.restore ${e}`);
    }

    return result;
  }
}

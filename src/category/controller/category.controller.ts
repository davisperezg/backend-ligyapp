import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Category } from '../schemas/category.schema';
import { CategoryService } from '../services/category.service';

@Controller('api/v1/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  //@UseGuards(PermissionGuard(Permission.ReadModuleItem))
  getCategorys() {
    return this.categoryService.findAll();
  }

  @Get('/find/:id')
  //@UseGuards(PermissionGuard(Permission.GetOneModule))
  getCategory(@Param('id') id: string) {
    return this.categoryService.findOneCategory(id);
  }

  @Post()
  //@UseGuards(PermissionGuard(Permission.CreateModule))
  async createCategory(
    @Res() res,
    @Body() createCategory: Category,
  ): Promise<Category> {
    const category = await this.categoryService.create(createCategory);
    return res.status(HttpStatus.OK).json({
      message: 'Category Successfully Created',
      category,
    });
  }

  @Delete(':id')
  //@UseGuards(PermissionGuard(Permission.DeleteModule))
  async deleteCategory(@Res() res, @Param('id') id: string): Promise<boolean> {
    const categoryDeleted = await this.categoryService.delete(id);
    return res.status(HttpStatus.OK).json({
      message: 'Category Deleted Successfully',
      categoryDeleted,
    });
  }

  @Put(':id')
  //@UseGuards(PermissionGuard(Permission.EditModule))
  async updateCategory(
    @Res() res,
    @Param('id') id: string,
    @Body() createCategory: Category,
    //@CtxUser() user: any,
  ): Promise<Category> {
    const categoryUpdated = await this.categoryService.update(
      id,
      createCategory,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Category Updated Successfully',
      categoryUpdated,
    });
  }
}

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
import { CtxUser } from 'src/lib/decorators/ctx-user.decorators';
import { Profile } from '../schemas/profile.schema';
import { ProfileService } from '../services/profile.service';

@Controller('api/v1/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  //@UseGuards(PermissionGuard(Permission.ReadModuleItem))
  getCategorys(@CtxUser() user: any) {
    return this.profileService.findAll(user);
  }

  @Get('/find/:id')
  //@UseGuards(PermissionGuard(Permission.GetOneModule))
  getCategory(@Param('id') id: string) {
    return this.profileService.findOneCategory(id);
  }

  @Post()
  //@UseGuards(PermissionGuard(Permission.CreateModule))
  async createCategory(
    @Res() res,
    @Body() createCategory: Profile,
    @CtxUser() user: any,
  ): Promise<Profile> {
    const profile = await this.profileService.create(createCategory, user);
    return res.status(HttpStatus.OK).json({
      message: 'Profile Successfully Created',
      profile,
    });
  }

  @Delete(':id')
  //@UseGuards(PermissionGuard(Permission.DeleteModule))
  async deleteCategory(@Res() res, @Param('id') id: string): Promise<boolean> {
    const profileDeleted = await this.profileService.delete(id);
    return res.status(HttpStatus.OK).json({
      message: 'Profile Deleted Successfully',
      profileDeleted,
    });
  }

  @Put(':id')
  //@UseGuards(PermissionGuard(Permission.EditModule))
  async updateCategory(
    @Res() res,
    @Param('id') id: string,
    @Body() createCategory: Profile,
    @CtxUser() user: any,
  ): Promise<Profile> {
    const profileUpdated = await this.profileService.update(
      id,
      createCategory,
      user,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Profile Updated Successfully',
      profileUpdated,
    });
  }
}

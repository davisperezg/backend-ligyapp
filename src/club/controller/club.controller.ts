import { Club } from 'src/club/schemas/club.schemas';
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
import { ClubService } from '../services/club.service';
import { CtxUser } from 'src/lib/decorators/ctx-user.decorators';

@Controller('api/v1/club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  //@UseGuards(PermissionGuard(Permission.ReadModuleItem))
  getClubs() {
    return this.clubService.findAll();
  }

  @Get('/find/:id')
  //@UseGuards(PermissionGuard(Permission.GetOneModule))
  getClub(@Param('id') id: string) {
    return this.clubService.findOneClub(id);
  }

  @Post()
  //@UseGuards(PermissionGuard(Permission.CreateModule))
  async createClub(
    @Res() res,
    @Body() createClub: Club,
    @CtxUser() user: any,
  ): Promise<Club> {
    const club = await this.clubService.create(createClub, user);
    return res.status(HttpStatus.OK).json({
      message: 'Club Successfully Created',
      club,
    });
  }

  @Delete(':id')
  //@UseGuards(PermissionGuard(Permission.DeleteModule))
  async deleteClub(@Res() res, @Param('id') id: string): Promise<boolean> {
    const profileDeleted = await this.clubService.delete(id);
    return res.status(HttpStatus.OK).json({
      message: 'Profile Deleted Successfully',
      profileDeleted,
    });
  }

  @Put(':id')
  //@UseGuards(PermissionGuard(Permission.EditModule))
  async updateClub(
    @Res() res,
    @Param('id') id: string,
    @Body() createClub: Club,
    @CtxUser() user: any,
  ): Promise<Club> {
    const clubUpdated = await this.clubService.update(id, createClub, user);
    return res.status(HttpStatus.OK).json({
      message: 'Club Updated Successfully',
      clubUpdated,
    });
  }
}

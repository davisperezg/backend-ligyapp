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
import { Sede } from '../schemas/sede.schema';
import { SedeService } from '../services/sede.service';

@Controller('api/v1/sede')
export class SedeController {
  constructor(private readonly sedeService: SedeService) {}

  @Get()
  //@UseGuards(PermissionGuard(Permission.ReadModuleItem))
  getSedes() {
    return this.sedeService.findAll();
  }

  @Get('/find/:id')
  //@UseGuards(PermissionGuard(Permission.GetOneModule))
  getSede(@Param('id') id: string) {
    return this.sedeService.findOneSede(id);
  }

  @Post()
  //@UseGuards(PermissionGuard(Permission.CreateModule))
  async createSede(@Res() res, @Body() createSede: Sede): Promise<Sede> {
    const Sede = await this.sedeService.create(createSede);
    return res.status(HttpStatus.OK).json({
      message: 'Sede Successfully Created',
      Sede,
    });
  }

  @Delete(':id')
  //@UseGuards(PermissionGuard(Permission.DeleteModule))
  async deleteSede(@Res() res, @Param('id') id: string): Promise<boolean> {
    const SedeDeleted = await this.sedeService.delete(id);
    return res.status(HttpStatus.OK).json({
      message: 'Sede Deleted Successfully',
      SedeDeleted,
    });
  }

  @Put(':id')
  //@UseGuards(PermissionGuard(Permission.EditModule))
  async updateSede(
    @Res() res,
    @Param('id') id: string,
    @Body() createSede: Sede,
    //@CtxUser() user: any,
  ): Promise<Sede> {
    const SedeUpdated = await this.sedeService.update(id, createSede);
    return res.status(HttpStatus.OK).json({
      message: 'Sede Updated Successfully',
      SedeUpdated,
    });
  }
}

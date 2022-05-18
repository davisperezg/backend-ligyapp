import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { ModuleModule } from './module/module.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ResourceModule } from './resource/resource.module';
import { AuthModule } from './auth/auth.module';
import { ResourcesRolesModule } from './resources-roles/resources-roles.module';
import { ResourcesUsersModule } from './resources-users/resources-users.module';
import { ServicesUsersModule } from './services-users/services-users.module';
import { CategoryModule } from './category/category.module';
import { SedeModule } from './sede/sede.module';
import { ProfileModule } from './profile/profile.module';
import { ClubModule } from './club/club.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/adm-rpum', {
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    UserModule,
    RoleModule,
    ResourceModule,
    MenuModule,
    ModuleModule,
    AuthModule,
    ResourcesRolesModule,
    ResourcesUsersModule,
    ServicesUsersModule,
    CategoryModule,
    SedeModule,
    ProfileModule,
    ClubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

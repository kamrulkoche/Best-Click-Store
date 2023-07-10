import { Module } from '@nestjs/common';
import { AdminService } from './adminservice.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { ManagerEntity } from 'src/manager/manager.entity';
import { ManagerService } from 'src/manager/manager.service';



@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity,ManagerEntity])],
  providers: [AdminService,ManagerService],
  controllers: [AdminController],
})
export class adminModule {}

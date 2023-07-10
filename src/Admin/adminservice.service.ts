import { Injectable } from '@nestjs/common';
//import { AddProductDTO, AdminmessageDTO, DeleteproductDTO, AdminDTO, AdminLoginDTO, AdminUpdateDTO, UpdateProductDTO, viewrecordDTO, } from './adminform.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';
//import * as bcrypt from 'bcrypt';


import { ManagerEntity } from 'src/manager/manager.entity';
import { AdminDTO, AdminLoginDTO, AdminUpdateDTO } from './adminform.dto';




@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>,
    @InjectRepository(ManagerEntity) private managerRepo: Repository<ManagerEntity>,
  ) { }


  // ------------------- Admin Registration Related Routes [Start] ---------------------//
  async adminRegistration(data: AdminDTO): Promise<AdminEntity> {
    return this.adminRepo.save(data);
  }
  // ------------------- admin Registration Related Routes [End] ---------------------//



  // ------------------- admin Id Search Routes [Start] ---------------------//
  async getAdminById(id: number): Promise<AdminEntity> {
    return this.adminRepo.findOneBy({ id });
  }
  // ------------------- admin Id Search Routes [End] ---------------------//



  // ------------------- admin Id Search By Name Routes [Start] ---------------------//
  async getAdminbyIDAndName(id, data): Promise<AdminEntity> {
    return this.adminRepo.findOneBy({ id: id, lname: data });
  }
  // ------------------- admin Id Search By Name Routes [End] ---------------------//



  // ------------------- admin all Registration Listshow Routes [Start] ---------------------//
  async findAll(): Promise<AdminEntity[]> {
    return this.adminRepo.find();
  }
  // ------------------- admin all Registration Listshow Routes [End] ---------------------//



  // ------------------- admin Id Delete Routes [Start] ---------------------//
  async delete(id: number): Promise<boolean> {
    const deleteResult = await this.adminRepo.delete(id);
    return deleteResult.affected > 0;
  }
  // ------------------- Employee Id Delete Routes [End] ---------------------//



  // // ------------------- Employee Update Routes [Start] ---------------------//
  // async updateEmployee(data: EmployeeUpdateDTO): Promise<EmployeeEntity> {
  //   await this.employeeRepo.update(data.id, data);

  //   return this.employeeRepo.findOneBy({ id: data.id });
  // }


  // // ------------------- Employee Update Routes [End] ---------------------//


  // ------------------- Admin UpdateById Routes [Start] ---------------------//
  async updateAdminById(
    id: number,
    data: AdminUpdateDTO,
  ): Promise<AdminEntity> {
    await this.adminRepo.update(id, data);
    return this.adminRepo.findOneBy({ id });
  }
  // ------------------- admin UpdateById Routes [End] ---------------------//


  // ------------------- admin Signin Routes [Start] ---------------------//
  // async signup(data: AdminDTO): Promise<AdminEntity> {
  //   const salt = await bcrypt.genSalt();
  //   data.password = await bcrypt.hash(data.password, salt);
  //   return this.adminRepo.save(data);
  // }



  // async signIn(data: AdminLoginDTO) {
  //   const userdata = await this.adminRepo.findOneBy({ email: data.email });
  //   let match = false;
  //   //const match:boolean = await bcrypt.compare(data.password, userdata.password);
  //   if (data.password == userdata.password)
  //     match = true;
  //   return match;
  //   // // ------------------- admin Signin Routes [End] ---------------------
  // }


  getManagersByAdminID(id): any {
    return this.adminRepo.find({
      where: { id: id },
      relations: {
        managers: true,
      },
    });
  }



  async deleteManagersByAdminID(id): Promise<any> {
    // select * form manager where id = id
    const user = await this.managerRepo.findOne({
      where: { id: id }
    });

    if (user) {

      this.managerRepo.delete(id);
      return "Delete Manager ID"
    }

    else
      return { Failed: "Manager not found!" }
  }









}
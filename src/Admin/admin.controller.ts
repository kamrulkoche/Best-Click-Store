import { Body, Controller, Get, Param, Post, Delete, Put, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, NotFoundException, Patch, ParseIntPipe, Res, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
// import { AdminEntity } from './admin.entity';
import { ManagerForm, UpdateManagerForm } from 'src/manager/manager.dto';
import { ManagerService } from 'src/manager/manager.service';
import { AdminService } from './adminservice.service';
import { AdminDTO, AdminUpdateDTO } from './adminform.dto';
import { AdminEntity } from './admin.entity';


@Controller('Admin')
export class AdminController {
    constructor(private readonly adminService: AdminService,private managerService: ManagerService) { }

    // ------------------- Admin Registration Related Routes [Start] ---------------------//
    @Post('/registration')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(
        FileInterceptor('filename', {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'filename'), false);
                }
            },
            limits: { fileSize: 5000000 },
            storage: diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname);
                },
            }),
        }),
    )
    signup(
        @UploadedFile() myfileobj: Express.Multer.File,
        @Body() data: AdminDTO,
    ): any {
        console.log(data);
        console.log(myfileobj.filename);
        data.filename = myfileobj.filename;
        return this.adminService.adminRegistration(data);
    }
    // ------------------- Admin Registration Related Routes [End] ---------------------//


    
 // ------------------- Admin Signin Related Routes [Start] ---------------------//
    // @Post('/signin')
    // signIn(@Body() data: AdminDTO) {
    //     return this.adminService.signIn(data);
    // }

 // ------------------- admin Signin Related Routes [End] ---------------------//



    // ------------------- Admin all Registration Listshow Routes [Start] ---------------------//
    @Get('/registrationview')
    async findAll(): Promise<AdminEntity[]> {
        return this.adminService.findAll();
    }
    // ------------------- admin all Registration Listshow Routes [End] ---------------------//


    // ------------------- Image name search  Routes [End] ---------------------//
    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
        res.sendFile(name, { root: './uploads' })
    }
    // ------------------- Image name search  Routes [End] ---------------------//



    // ------------------- Admin Id Search Routes [Start] ---------------------//
    @Get('/search/:id')
    getAdminById(@Param('id', ParseIntPipe) id: number): object {
        return this.adminService.getAdminById(id);
    }
    // ------------------- Admin Id Search Routes [End] ---------------------//

    // ------------------- Admin Id Search By Name Routes [Start] ---------------------//
    @Get('/search')
    getAdminbyIDAndName(@Query() qry: any): object {
        return this.adminService.getAdminbyIDAndName(qry.id, qry.lname);
    }
    // ------------------- admin Id Search By Name Routes [End] ---------------------//

    // ------------------- admin Id Delete Routes [Start] ---------------------//
    @Delete('/users/:id')
    async delete(@Param('id') id: number): Promise<void> {
        const deleted = await this.adminService.delete(id);
        if (!deleted) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        } else {
            throw new NotFoundException(`User with ID ${id} deleted successful`);
        }
    }
    // ------------------- admin Id Delete Routes [End] ---------------------//


    // ------------------- admin UpdateById Routes [Start] ---------------------//
    @Put('/updateadmin/:id')
    @UsePipes(new ValidationPipe())
    updateAdminbyID(
        @Param() id: number,
        @Body() data: AdminUpdateDTO,
    ): object {
        return this.adminService.updateAdminById(id, data);
    }
    // ------------------- Admin UpdateById Routes [End] ---------------------//




    @Post('/addmanager')
    @UsePipes(new ValidationPipe())
      insertManager(@Body() managerdto: ManagerForm): any {
        return this.managerService.insertManager(managerdto);
      }




      @Get('/findmanagersbyadmin/:id')
      getManagerByAdminID(@Param('id', ParseIntPipe) id: number): any {
        return this.adminService.getManagersByAdminID(id);
      }

      
 // -------------------  FindAdminByManager Routes [Start] ---------------------//
 @Get('/findadminbymanager/:id')
 getAdminByManagerID(@Param('id', ParseIntPipe) id: number): any {
   return this.managerService.getAdminByManagerID(id);
 }

// ------------------- FindaAminByManager Routes [End] ---------------------//




      @Delete('/deletemanagersbyadmin/:id')
      deleteManagerByAdminID(@Param('id', ParseIntPipe) id: number): any {
        return this.adminService.deleteManagersByAdminID(id);
      }





  // -------------------updatemanagerprofilebyadmin Routes [Start] ---------------------//
  @Put('/updatemanagerprofilebyadmin/:id')
  @UsePipes(new ValidationPipe())
  updateManagerbyID(
      @Param('id', ParseIntPipe) id: number,
      @Body() data: UpdateManagerForm,
  ): object {
      return this.managerService.updateManagerbyID(id, data);
  }
  // -------------------updatemanagerprofilebyadmin Routes [End] ---------------------//




      
}

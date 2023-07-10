import { ManagerEntity } from 'src/manager/manager.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity('admin')

// ------------------- adminEntity Routes [Start] ---------------------//
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fname: string;

    @Column()
    lname: string;

    @Column()
    gender:string;

    @Column()
    email:string;

    @Column()
    phone:number;
    
    @Column()
    password:string;

    @Column()
    filename: string;


    
    @OneToMany(() => ManagerEntity, (manager) => manager.Admin)
    managers: ManagerEntity[]


    
   

    // @Column()
    // birthday: string;

    // @Column()
    // email:string;

    // @Column()
    // phone: string;

    // @Column()
    // address:string;

    // @Column()
    // username: string;

    // @Column()
    // password:string;

    // @Column()
    // confirmpassword: string;
}
// ------------------- AdminEntity Routes [End] ---------------------//

export class AdminUpdateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fname: string;

   
}




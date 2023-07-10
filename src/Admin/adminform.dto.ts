import {IsDate,IsEmail,IsNotEmpty,IsPhoneNumber,IsString,Length,Matches,} from 'class-validator';

// ------------------- AdminDTO Routes [Start] ---------------------//
export class AdminDTO {
  @IsNotEmpty({ message: 'First Name Empty' })
  @IsString({ message: 'First name is no string' })
  @Matches(/^[a-zA-Z]+$/, { message: 'First name error enter a proper name' })
  fname: string;

  @IsNotEmpty({ message: 'Last Name Empty' })
  @IsString({ message: 'Last Name is no string' })
  @Matches(/^[a-zA-Z]+$/, { message: 'Last name error enter a proper name' })
  lname: string;

  @IsNotEmpty({message:"Gender is Empty"})
  @IsString({message:"Gender is no string"})
  @Matches( /^[a-zA-Z]+$/, {message:"Gender  error enter a proper name"})
  gender:string;

  @IsEmail({}, { message: "invalid email" })
    email: string;
    phone: number;
    password: string;
    filename:string;

 
}
// ------------------- AdminDTO Routes [End] ---------------------//

export class AdminUpdateDTO {
  id: number;
  @IsNotEmpty({ message: 'First Name Empty' })
  @IsString({ message: 'First name is no string' })
  @Matches(/^[a-zA-Z]+$/, { message: 'First name error enter a proper name' })
  fname: string;

  @IsNotEmpty({message:"Last Name Empty"})
  @IsString({message:"Last Name is no string"})
  @Matches( /^[a-zA-Z]+$/, {message:"Last name error enter a proper name"})
  lname:string;

  @IsNotEmpty({message:"Gender is Empty"})
  @IsString({message:"Gender is no string"})
  @Matches( /^[a-zA-Z]+$/, {message:"Gender  error enter a proper name"})
  gender:string;
}

export class AdminLoginDTO {
  }
  



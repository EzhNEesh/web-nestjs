import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateAuthDto {
  @IsEmail()
  @ApiProperty()
  email: string

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  password: string
}

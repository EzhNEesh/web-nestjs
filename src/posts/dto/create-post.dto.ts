import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @ApiProperty()
  imageURL: string;

  @IsNotEmpty()
  @ApiProperty()
  wolfType: string;
}
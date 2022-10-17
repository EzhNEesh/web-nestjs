import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @ApiProperty()
  imageURL: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  authorId: number;

  @IsNotEmpty()
  @ApiProperty()
  wolfType: string;
}
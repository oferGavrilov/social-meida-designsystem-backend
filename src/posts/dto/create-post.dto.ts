/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, IsOptional, IsUrl } from "class-validator";

export class CreatePostDto {
      @IsNotEmpty()
      @IsString()
      content:string;

      @IsUrl()
      @IsOptional()
      imageUrl?:string;

}
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PetAge, PetGender, PetSize, PetStatus, PetType } from '@prisma/client';
import { IsString } from 'class-validator';
import {
  PetAttributes,
  PetBreeds,
  PetColors,
  PetPhotos,
} from '../dto/create-pet.dto';

export class Pet {
  @ApiProperty({ required: true })
  @IsString()
  organization_id: string;

  @ApiPropertyOptional()
  url?: string;

  @ApiProperty({ required: true, enum: PetType })
  type: PetType;

  @ApiProperty({ required: true })
  @IsString()
  species: string;

  @ApiPropertyOptional()
  breeds?: PetBreeds;

  @ApiPropertyOptional()
  colors?: PetColors;

  @ApiProperty()
  age: PetAge;

  @ApiProperty({ enum: PetGender })
  gender: PetGender;

  @ApiProperty({ enum: PetSize })
  size: PetSize;

  @ApiPropertyOptional()
  attributes?: PetAttributes;

  @ApiPropertyOptional()
  tags?: string[];

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiPropertyOptional()
  photos?: PetPhotos;

  @ApiProperty({ enum: PetStatus })
  status: PetStatus;
}

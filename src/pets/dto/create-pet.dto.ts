import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PetAge, PetGender, PetSize, PetStatus, PetType } from '@prisma/client';
import { IsString, IsUrl, IsUUID } from 'class-validator';

export class PetBreeds {
  @ApiPropertyOptional()
  primary?: string;

  @ApiPropertyOptional()
  secondary?: string;

  @ApiPropertyOptional({ default: false })
  mixed?: boolean;

  @ApiPropertyOptional({ default: false })
  unknown?: boolean;
}

export class PetColors {
  @ApiPropertyOptional()
  primary?: string;

  @ApiPropertyOptional()
  secondary?: string;

  @ApiPropertyOptional()
  tertiary?: string;
}

export class PetAttributes {
  @ApiPropertyOptional({ default: false })
  spayed_neutered?: boolean;

  @ApiPropertyOptional({ default: false })
  house_trained?: boolean;

  @ApiPropertyOptional({ default: false })
  declawed?: boolean;

  @ApiPropertyOptional({ default: false })
  special_needs?: boolean;

  @ApiPropertyOptional({ default: false })
  shots_current?: boolean;
}

export class PetPhotos {
  @ApiPropertyOptional()
  small?: string;

  @ApiPropertyOptional()
  medium?: string;

  @ApiPropertyOptional()
  large?: string;

  @ApiPropertyOptional()
  full?: string;
}

export class CreatePetDto {
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

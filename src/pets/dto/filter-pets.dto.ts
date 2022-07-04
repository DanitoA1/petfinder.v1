import { ApiPropertyOptional } from '@nestjs/swagger';
import { PetAge, PetGender, PetStatus, PetType } from '@prisma/client';
import { PetBreeds } from './create-pet.dto';

enum SortDirection {
  desc,
  asc,
}

enum SortField {
  type,
  name,
  age,
  status,
  gender,
  size,
}

export class petFilterDto {
  @ApiPropertyOptional({
    enum: PetType,
    description: 'Return results matching animal type',
  })
  type?: PetType;

  @ApiPropertyOptional({
    description:
      'Return results matching animal breed (Accepts multiple values)',
    format: 'Primary breed Search',
  })
  breed?: string[];

  @ApiPropertyOptional({
    description:
      'Return results matching animal size (Accepts multiple values)',
  })
  size?: string[];

  @ApiPropertyOptional({
    enum: PetGender,
    isArray: true,
    description:
      'Return results matching animal gender (Accepts multiple values)',
  })
  gender?: string[];

  @ApiPropertyOptional({
    enum: PetAge,
    isArray: true,
    description: 'Return results matching animal age (Accepts multiple values)',
  })
  age?: string[];

  @ApiPropertyOptional({ description: 'Return results matching animal color' })
  color?: string;

  @ApiPropertyOptional({
    enum: PetStatus,
    isArray: true,
    default: 'adoptable',
    description:
      'Return results matching adoption status (Accepts multiple values)',
  })
  status?: string[];

  @ApiPropertyOptional({
    description:
      'Return results matching animal name (includes partial matches; e.g. "Fred" will return "Alfredo" and "Frederick")',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Return results associated with specific organization(s)',
    format: 'organization_id',
  })
  organization?: string;

  @ApiPropertyOptional({ description: 'Return results that are house trained' })
  house_trained?: boolean;

  @ApiPropertyOptional({ description: 'Return results that are declawed' })
  declawed?: boolean;

  @ApiPropertyOptional({
    description: 'Return results that have special needs',
  })
  special_needs?: boolean;

  @ApiPropertyOptional({
    format:
      'Must be a valid ISO8601 date-time string (e.g. 2019-10-07T19:13:01+00:00)',
    description: 'Return results published before this date/time.',
  })
  before?: string;

  @ApiPropertyOptional({
    format:
      'Must be a valid ISO8601 date-time string (e.g. 2019-10-07T19:13:01+00:00)',
    description: 'Return results published after this date/time.',
  })
  after?: string;

  @ApiPropertyOptional({
    enum: SortField,
    description: 'Field to Sort pets by',
  })
  sort_field?: SortField;

  @ApiPropertyOptional({
    enum: SortDirection,
    description: 'Direction to Sort pets in',
  })
  sort_direction?: SortDirection;

  @ApiPropertyOptional({
    default: 1,
    minimum: 1,
    description: 'Specifies which page of results to return',
    format: 'minimum value: 1',
  })
  page?: number;

  @ApiPropertyOptional({
    default: 20,
    maximum: 100,
    minimum: 1,
    description: 'Maximum number of results to return per page response',
    format: 'minimum value: 1, maximum value: 100',
  })
  limit?: number;
}

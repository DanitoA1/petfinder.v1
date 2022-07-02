import { ApiProperty } from '@nestjs/swagger';
import { Pet } from './pet.entity';

export class Pets {
  @ApiProperty({ type: () => [Pet] })
  pets: Pet[];
}

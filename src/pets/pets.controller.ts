import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DecorateAll } from 'decorate-all';
import { Pet } from './entities/pet.entity';
import { Pets } from './entities/pets.entity';
import { petFilterDto } from './dto/filter-pets.dto';

@ApiTags('Pets')
@DecorateAll(ApiBadRequestResponse({ description: 'Bad Request' }))
@DecorateAll(ApiNotAcceptableResponse({ description: 'Not Accepted' }))
@DecorateAll(ApiNotFoundResponse({ description: 'Not Found' }))
@DecorateAll(ApiUnauthorizedResponse({ description: 'Unauthorized' }))
@DecorateAll(
  ApiServiceUnavailableResponse({ description: 'Service Unavailable' }),
)
@DecorateAll(
  ApiInternalServerErrorResponse({ description: 'Internal Server Error' }),
)
@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @ApiOkResponse({ type: Pet })
  create(@Body(ValidationPipe) createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Get()
  @ApiOkResponse({ type: Pets })
  async getPets(@Query(ValidationPipe) queries: petFilterDto): Promise<Pets> {
    return await this.petsService.getPets(queries);
  }

  @Get(':id')
  @ApiOkResponse({ type: Pet })
  async findOne(@Param('id') id: string): Promise<Pet> {
    return await this.petsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(+id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }
}

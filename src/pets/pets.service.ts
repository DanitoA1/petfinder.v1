import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { Pets } from './entities/pets.entity';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreatePetDto) {
    const result = await this.prisma.pets.create({
      data: {
        ...body,
        breeds: { ...body.breeds },
        colors: { ...body.colors },
        attributes: { ...body.attributes },
        photos: { ...body.photos },
      },
    });
    return result;
  }

  async getPets(queries): Promise<Pets> {
    const result = await this.prisma.pets.findMany();
    const pets = [];
    result.forEach((pet) => {
      pets.push({
        ...pet,
        breeds: pet.breeds as Prisma.JsonObject,
        colors: pet.colors as Prisma.JsonObject,
        attributes: pet.attributes as Prisma.JsonObject,
        photos: pet.photos as Prisma.JsonObject,
        tags: pet.tags,
      });
    });
    return { pets };
  }

  async findOne(id: number): Promise<Pet> {
    const result = await this.prisma.pets.findUnique({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(`No pet with id: ${id} found`);
    }
    const breeds = result;
    return {
      ...result,
      breeds: result.breeds as Prisma.JsonObject,
      colors: result.colors as Prisma.JsonObject,
      attributes: result.attributes as Prisma.JsonObject,
      photos: result.photos as Prisma.JsonObject,
      tags: result.tags,
    };
  }

  update(id: number, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  async remove(id: number) {
    const result = await this.prisma.pets.delete({ where: { id } });
    return result;
  }
}

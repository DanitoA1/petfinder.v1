import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { parse } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { petFilterDto } from './dto/filter-pets.dto';
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
    const breedFilter = [];
    const attributesFilter = [];
    const publishedAtFilter = [];

    queries.breed.forEach((breed) => {
      breedFilter.push({
        breeds: {
          path: ['primary'],
          equals: breed,
        },
      });
    });

    // Attributes filter
    if (typeof queries.house_trained != 'undefined') {
      attributesFilter.push({
        attributes: {
          path: ['house_trained'],
          equals: queries.house_trained,
        },
      });
    }
    if (typeof queries.declawed != 'undefined') {
      attributesFilter.push({
        attributes: {
          path: ['declawed'],
          equals: queries.declawed,
        },
      });
    }
    if (typeof queries.special_needs != 'undefined') {
      attributesFilter.push({
        attributes: {
          path: ['special_needs'],
          equals: queries.special_needs,
        },
      });
    }

    // PublishedAt Filters
    if (queries.before) {
      publishedAtFilter.push({
        published_at: {
          lt: queries.before ? new Date(queries.before) : undefined,
        },
      });
    }
    if (queries.after) {
      publishedAtFilter.push({
        published_at: {
          lt: queries.after ? new Date(queries.after) : undefined,
        },
      });
    }

    // Merge breedFilter array and attributesFilter
    const multipleJsonFieldFilter = breedFilter
      .concat(attributesFilter)
      .concat(publishedAtFilter);

    const result = await this.prisma.pets.findMany({
      take: queries.page ? parseInt(queries.per_page) : 20,
      skip:
        queries.page && queries.limit
          ? (parseInt(queries.page) - 1) * parseInt(queries.limit)
          : 0,
      where: {
        type: queries.type ? queries.type : undefined,
        OR: multipleJsonFieldFilter,
        size: {
          in: queries.size ? queries.size : undefined,
        },
        gender: {
          in: queries.gender ? queries.gender : undefined,
        },
        age: {
          in: queries.age ? queries.age : undefined,
        },
        colors: {
          path: ['primary'],
          equals: queries.color ? queries.color : undefined,
        },
        status: {
          in: queries.status ? queries.status : undefined,
        },
        name: {
          contains: queries.name ? queries.name : undefined,
        },
        organization_id: queries.organization
          ? queries.organization
          : undefined,
        attributes: {},
        published_at: {
          lt: queries.before ? new Date(queries.before) : undefined,
        },
      },
    });
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

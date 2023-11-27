import { PartialType } from '@nestjs/mapped-types';
import { createHeroDto } from './create-hero.dto';

export class UpdateHeroDto extends PartialType(createHeroDto) {}

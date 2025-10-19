import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
}

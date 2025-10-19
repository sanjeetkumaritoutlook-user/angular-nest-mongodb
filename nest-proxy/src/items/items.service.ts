import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  create(createItemDto: CreateItemDto) {
    const createdItem = new this.itemModel(createItemDto);
    return createdItem.save();
  }

  findAll() {
    return this.itemModel.find().exec();
  }

  findOne(id: string) {
    return this.itemModel.findById(id).exec();
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true });
  }

  remove(id: string) {
    return this.itemModel.findByIdAndDelete(id);
  }
}

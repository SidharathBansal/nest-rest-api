import { Injectable } from '@nestjs/common';
import { Item } from './Interfaces/items.interface';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [
    {
      id: '3232746782',
      name: 'Item One',
      qty: 100,
      description: 'This is Item One',
    },
    {
      id: '3232746785',
      name: 'Item Two',
      qty: 50,
      description: 'This is Item Two',
    },
    {
      id: '3232746783',
      name: 'Item Three',
      qty: 75,
      description: 'This is Item Three',
    },
  ];

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: string): Item {
      return this.items.find(item => item.id === id)
  }
}

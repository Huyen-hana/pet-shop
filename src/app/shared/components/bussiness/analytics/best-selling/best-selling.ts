import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestSellingItem } from '../../../../models/common.model';

@Component({
  selector: 'app-best-selling',
  imports: [CommonModule],
  templateUrl: './best-selling.html',
  styleUrl: './best-selling.scss'
})
export class BestSelling {
  bestSelling: BestSellingItem[] = [
    {
      name: 'Thức Ăn Hạt Cho Mèo Trưởng Thành Nuôi Trong Nhà Royal Canin Indoor 27',
      data: 50,
      category: 'Thức ăn cho mèo',
      color: 'text-(--p-primary-600)',
      backGround: 'bg-(--p-primary-400)'
    },
    {
      name: 'Thức Ăn Hạt Cho Mèo Con Royal Canin Kitten 36',
      data: 80,
      category: 'Thức ăn cho mèo',
      color: 'text-(--p-sky-600)',
      backGround: 'bg-(--p-sky-400)'
    },
    {
      name: 'Thức Ăn Hạt Cho Chó Trưởng Thành Giống Nhỏ Royal Canin Mini Adult',
      data: 66,
      category: 'Thức ăn cho chó',
      color: 'text-(--p-red-600)',
      backGround: 'bg-(--p-red-400)'
    },
    {
      name: 'Thức Ăn Hạt Cho Chó Poodle Trưởng Thành Royal Canin Poodle Adult',
      data: 44,
      category: 'Thức ăn cho chó',
      color: 'text-(--p-green-600)',
      backGround: 'bg-(--p-green-400)'
    },
  ]
};


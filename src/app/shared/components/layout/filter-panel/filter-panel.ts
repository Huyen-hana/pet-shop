import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { Category } from '../../../models/common.model';

@Component({
  selector: 'app-filter-panel',
  imports: [CommonModule, FormsModule, AccordionModule, CheckboxModule],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.scss'
})
export class FilterPanel {
  @Input() menuFilter: Category[] = [];
  selectedCateNames: string[] = [];


  myAmberAccord = {
    header: {
      padding: '15px 0',
      activeColor: '#f59e0b'
    },
    content: {
      padding: '0 15px 15px'
    }
  };
}

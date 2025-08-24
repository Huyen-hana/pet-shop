import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Category } from '../../../models/common.model';

@Component({
  selector: 'app-filter-panel',
  imports: [CommonModule, FormsModule, AccordionModule, CheckboxModule, RadioButtonModule],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.scss'
})
export class FilterPanel {
  @Input() menuFilter: Category[] = [];
  @Input() menuName: string = '';
  @Output() sortChanged = new EventEmitter<{ source: string; value: string[] }>();
  @Input() panelId: string = '';
  selectedCateName: string = '';
  selectedCateNames: string[] = [];

  onSortChange(value: string) {
    this.selectedCateName = value;
    this.sortChanged.emit(
      {
        source: this.panelId,
        value: [value]
      }
    );
    console.log(value)
  };  

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

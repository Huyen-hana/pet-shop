import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime',
  standalone: true
})
export class DateTimePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) return 'Invalid date';

    const formatter = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return formatter.format(date);

  }

}

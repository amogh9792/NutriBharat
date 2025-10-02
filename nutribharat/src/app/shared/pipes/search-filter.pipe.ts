import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })   // ✅ rename to "searchFilter"
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], search: string): any[] {
    if (!items || !search) return items;
    return items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  }
}

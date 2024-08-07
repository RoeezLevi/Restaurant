import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css'],
  standalone: true,
})
export class ProductSearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Input() searchData!: string; // Add this line

  filterResults(filterValue: string): void {
    this.search.emit(filterValue.trim().toLowerCase());
  }
}

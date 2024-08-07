import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from '../product/product-table/product-table.component'; 
import { MatGridListModule } from '@angular/material/grid-list';
//import { ProductSearchComponent } from '../product/product-search/product-search.component';
import { ProductService } from '../product/services/product.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    ProductTableComponent,
    MatGridListModule,
  //  ProductSearchComponent,
  ],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  searchData: string = 'Initial search data';
  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}
  handleSearch(searchTerm: string): void {
    console.log('Search term:', searchTerm);
  }
  openNewProductDialog(): void {
    this.productService.createProduct();
  }
}

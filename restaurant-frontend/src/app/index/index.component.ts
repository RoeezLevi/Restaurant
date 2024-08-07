import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from '../product/product-table/product-table.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductSearchComponent } from '../product/product-search/product-search.component';
import { ProductService } from '../product/services/product.service';
import { Product } from '../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductNewComponent } from '../product/product-new/product-new.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CommonModule,
    ProductTableComponent,
    MatGridListModule,
    ProductSearchComponent,
    MatIconModule,
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

  createProduct(): void {
    const dialogRef = this.dialog.open(ProductNewComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        this.productService.createProduct(result).subscribe(() => {});
      } else {
        console.error('Product creation was cancelled or failed.');
      }
    });
  }
}

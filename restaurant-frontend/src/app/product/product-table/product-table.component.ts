import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../services/product.service';
import { Product } from '../../models/product.model';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditProductDialogComponent } from '../product-edit/product-edit.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule, 
  ],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'quantity',
    'serialNumber',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>();
  searchText: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.dataSource.data = data.filter((product) => !product.isDeleted);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  restoreProduct(id: number): void {
    this.productService.restoreProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '400px',
      data: { ...product },
    });

    dialogRef.afterClosed().subscribe((result: Product) => {
      if (result) {
        this.productService.updateProduct(result.id, result).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }
}

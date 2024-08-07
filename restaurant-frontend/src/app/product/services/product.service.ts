import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductNewComponent } from '../product-new/product-new.component';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(): Observable<Product> {
    const dialogRef = this.dialog.open(ProductNewComponent, {
      width: '400px',
    });

    return from(dialogRef.afterClosed()).pipe(
      switchMap((result) => {
        if (result) {
          console.log('New product data:', result);
          return this.http.post<Product>(this.apiUrl, result);
        } else {
          throw new Error('Dialog closed without data');
        }
      })
    );
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  restoreProduct(id: number): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/restore/${id}`, {});
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?query=${query}`);
  }
}

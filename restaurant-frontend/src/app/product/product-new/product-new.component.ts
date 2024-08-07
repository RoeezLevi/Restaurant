import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-new',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css'],
})
export class ProductNewComponent {
  newProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductNewComponent>
  ) {
    this.newProductForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      serialNumber: ['', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.newProductForm.valid) {
      this.dialogRef.close(this.newProductForm.value);
    }
  }
}

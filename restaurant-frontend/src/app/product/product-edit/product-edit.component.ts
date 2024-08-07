import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../models/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule],
})
export class EditProductDialogComponent implements OnInit {
  editProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.editProductForm = this.fb.group({
      name: [data.name, Validators.required],
      quantity: [data.quantity, [Validators.required, Validators.min(1)]],
      serialNumber: [data.serialNumber, Validators.required],
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editProductForm.valid) {
      this.dialogRef.close(this.editProductForm.value);
    }
  }
}

export class Product {
  id?: number;

  name: string;

  quantity: number;

  serialNumber: string;

  createdAt?: Date;

  updatedAt?: Date;

  isDeleted?: boolean;

  constructor(
    name: string,
    quantity: number,
    serialNumber: string,
    id?: number,
    createdAt?: Date,
    updatedAt?: Date,
    isDeleted?: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.serialNumber = serialNumber;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
    this.isDeleted = isDeleted || false;
  }
}

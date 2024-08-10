import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

@Injectable()
export class ProductService {
  readonly filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, '../../', 'products.json');
  }

  async readProductsFile(): Promise<any[]> {
    try {
      const data = await readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await writeFile(this.filePath, JSON.stringify([]));
        return [];
      } else {
        throw new InternalServerErrorException('Could not read products file');
      }
    }
  }

  async saveProducts(products: any[]): Promise<void> {
    try {
      await writeFile(
        this.filePath,
        JSON.stringify(products, null, 2),
        'utf-8',
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'Could not write to products file',
      );
    }
  }

  async getProducts(): Promise<any[]> {
    return await this.readProductsFile();
  }

  async getProductById(id: number): Promise<any> {
    const products = await this.getProducts();
    const product = products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async getProductByNameOrSerial(input: string): Promise<any> {
    const products = await this.getProducts();
    const product = products.find(
      (product) => product.name === input || product.serialNumber === input,
    );
    if (!product) {
      throw new NotFoundException(
        `Product with name ${input} or serial number ${input} not found`,
      );
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<any> {
    const products = await this.getProducts();
    const newProduct = {
      id: products.length + 1,
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    };
    products.push(newProduct);
    await this.saveProducts(products);
    return newProduct;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<any> {
    const products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const product = products[productIndex];
    products[productIndex] = {
      ...product,
      ...updateProductDto,
      updatedAt: new Date(),
    };
    await this.saveProducts(products);
    return products[productIndex];
  }

  async deleteProduct(id: number): Promise<void> {
    const products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    products[productIndex].isDeleted = true;
    await this.saveProducts(products);
  }

  async restoreProduct(id: number): Promise<any> {
    const products = await this.getProducts();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    products[productIndex].isDeleted = false;
    await this.saveProducts(products);
    return products[productIndex];
  }
}

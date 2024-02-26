import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/Product/product';
import { ProductService } from 'src/services/Product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = {} as Product;
  editProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(product => {
      this.products.push(product);
      this.newProduct = {} as Product;
    });
  }

  editProductClick(product: Product): void {
    this.editProduct = product;
  }

  saveProduct(): void {
    this.productService.editProduct(this.editProduct!).subscribe(product => {
      this.editProduct = null;
      const index = this.products.findIndex(p => p.id === product.id);
      this.products[index] = product;
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      const index = this.products.findIndex(p => p.id === id);
      this.products.splice(index, 1);
    });
  }
}

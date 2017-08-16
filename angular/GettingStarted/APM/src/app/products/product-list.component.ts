import { Component, OnInit } from '@angular/core';
import {IProduct} from './product';
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './app/products/product-list.component.html',
    styleUrls: ['./app/products/product-list.component.css']
})
export class ProductListComponent implements OnInit {

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imgaeMargin: number = 2;
    showImage: boolean = false;
    
    constructor (private _productService: ProductService) {
        this.listFilter = '';//cart';
    }

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products 
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLowerCase().indexOf(filterBy) !== -1);
    }

    filteredProducts: IProduct[];
    products: IProduct[];
        
    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    
    ngOnInit(): void {
        this.products = this._productService.getProducts();
        this.filteredProducts = this.products;
    }

    onRatingClicked(message: string) : void {
        console.log("onRatingClicked ... " + message);
        this.pageTitle = 'Product List' + message;
    }    
}
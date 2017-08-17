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
    errorMessage: string;
    
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
        this._productService.getProducts()
            .subscribe(products => {
                    this.products = products;
                    this.filteredProducts = this.products;                   
                },
                    error => this.errorMessage = <any>error);
    }

    onRatingClicked(message: string) : void {
        console.log("onRatingClicked ... " + message);
        this.pageTitle = 'Product List' + message;
    }    
}
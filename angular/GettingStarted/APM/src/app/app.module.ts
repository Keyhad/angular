import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { ProductListComponent} from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from "./shared/star.component";
import { ProductDetailComponent } from './products/product-detail.component';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    HttpClientModule],
  declarations: [ 
    AppComponent, 
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent],
  providers: [],
  bootstrap: [ 
    AppComponent]  
})
export class AppModule { }

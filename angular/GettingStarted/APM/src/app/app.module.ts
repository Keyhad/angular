import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { ProductListComponent} from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from "./shared/star.component";

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    HttpModule],
  declarations: [ 
    AppComponent, 
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent],
  providers: [],
  bootstrap: [ 
    AppComponent]  
})
export class AppModule { }

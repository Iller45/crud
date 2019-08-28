import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductItemComponent} from './components/product-item/product-item.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {reducers, metaReducers} from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {ProductEffects} from './store/effects/product.effects';
import {ProductService} from './services/product.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ParamInterceptor} from './api.interceptor';
import {AddProductFormComponent} from './components/add-product-form/add-product-form.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

export const MATERIAL_MODULES = [
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductItemComponent,
    AddProductFormComponent
  ],
  imports     : [
    BrowserModule,
    HttpClientModule,
    ...MATERIAL_MODULES,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([ProductEffects]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers   : [ProductService, {
    provide : HTTP_INTERCEPTORS,
    useClass: ParamInterceptor,
    multi   : true
  }],
  bootstrap   : [AppComponent]
})
export class AppModule {
}

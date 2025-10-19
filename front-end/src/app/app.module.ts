import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductsModule } from './products/products.module'; // ✅ ngrx store feature module

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    UserDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),     // ✅ Root store setup
    ProductsModule, //ngrx feature module
    EffectsModule.forRoot([]),     // ✅ Root effects setup
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })     // ✅ DevTools (optional)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

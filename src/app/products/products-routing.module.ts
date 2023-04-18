import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { CartComponent } from './cart/cart.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const routes: Routes = [
  { 
    path: '', component: AllProductsComponent 
  },
  {
    path:'view/:id',component:ViewProductsComponent
  },
  {
    path:'cart',component:CartComponent
  },
  {
    path:'wishlist',component:WishlistComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProductComponent} from './product/product.component';
import {ProductDetailComponent} from './product/product-detail/product-detail.component';
import {ProductCompareComponent} from './product/product-compare/product-compare.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './guards/AuthGuard';
import { RealHomeComponent } from './real-home/real-home.component';

const routes: Routes = [

  // { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '', component: RealHomeComponent, canActivate: [AuthGuard] },

  { path: 'subCate/:subCateId/products', component: ProductComponent, canActivate: [AuthGuard]  },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'compare/:subCateId', component:  ProductCompareComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: RealHomeComponent, canActivate: [AuthGuard] },
  { path: 'productDetail', component: ProductDetailComponent, canActivate: [AuthGuard] }, // Wei
  { path: '**', redirectTo: '', canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

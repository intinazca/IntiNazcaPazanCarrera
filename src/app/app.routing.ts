import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { createProductComponent } from './pages/create-product/create-product.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: ViewProductComponent
    },
    {
        path: 'create-product',
        component: createProductComponent
    },
    {
        path: 'create-product/:param',
        component: createProductComponent
      },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

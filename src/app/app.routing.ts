import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component'; // Importa el componente de la ruta
import { ViewProductComponent } from './pages/view-product/view-product.component';
import { createProductComponent } from './pages/create-product/create-product.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }, // Redirección a 'home' al inicio
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

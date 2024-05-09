import { Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { CreateComponent } from './modules/products/components/create/create.component';
import { ListComponent } from './modules/products/components/list/list.component';
import { ProductsComponent } from './modules/products/products.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'edit/:id',
        component: CreateComponent,
      },
    ],
  },
];

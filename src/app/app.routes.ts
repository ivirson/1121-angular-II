import { Routes } from '@angular/router';
import { NotFoundComponent } from './commons/components/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/products/products.routes').then(
        (m) => m.productsRoutes
      ),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

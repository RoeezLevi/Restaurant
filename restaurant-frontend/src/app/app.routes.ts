import { Routes } from '@angular/router';
import { IndexComponent } from '../app/index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: IndexComponent },
  { path: '**', component: PageNotFoundComponent },
];

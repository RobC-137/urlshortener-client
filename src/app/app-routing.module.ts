import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateShortFormComponent } from './components/create-short-form/create-short-form.component';
import { LinksTableComponent } from './components/links-table/links-table.component';
import { DetailsComponent } from './components/details/details.component';

import { AuthContainerComponent } from './components/auth-container/auth-container.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthLoggedInGuard } from './guards/auth-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: CreateShortFormComponent,
  },
  {
    path: 'statistics',
    component: LinksTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'details',
    component: DetailsComponent,
  },
  {
    path: 'auth',
    component: AuthContainerComponent,
    canActivate: [AuthLoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './eval-signin-up/login/login.component';
import {SignupComponent} from './eval-signin-up/signup/signup.component';
// import {ListPresentationModule} from './list-presentation/list-presentation.module';
// import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/presentations', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'presentations', loadChildren: './list-presentation/list-presentation.module#ListPresentationModule'},
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRouteModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { UsersComponent } from './page/users/users.component';
import { UserEditComponent } from './page/user-edit/user-edit.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';

const routes: Routes = [

  //ez azért van kimommentelve, mert nem működik az authentikáció,
  //így a guardok moiatt nem tudom a többi funkciót működtetni...

  // {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  // {path: 'login', component: LoginComponent},
  // {path: 'users', component: UsersComponent, canActivate: [AuthGuardService]},
  // {path: 'user/edit/:id', component: UserEditComponent, canActivate: [AuthGuardService]},
  // {path: 'forbidden', component: ForbiddenComponent},
  // {path: '**', redirectTo: ''},

  //ez itt a role-quard, vagyis szerep szerint véd
  // {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  // {path: 'login', component: LoginComponent},
  // {path: 'users',
  // component: UsersComponent,
  // canActivate: [AuthGuardService, RoleGuardService],
  // data: {
  //     expectedRole: 2, //ez az elvárt szerep, ami be van állítva az adatbázisba
  //   }
  // },
  // {path: 'user/edit/:id',
  // component: UserEditComponent,
  // canActivate: [AuthGuardService, RoleGuardService],
  // data: {
  //     expectedRole: 3,
  //   }
  // },
  // {path: 'forbidden', component: ForbiddenComponent},
  // {path: '**', redirectTo: ''},

  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersComponent},
  {path: 'user/edit/:id', component: UserEditComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { NavigationAdminComponent } from './admin/navigation-admin/navigation-admin.component';
import { NavigationUserComponent } from './user/navigation-user/navigation-user.component';
import { AdminGuard } from './login/guard/admin.guard';
import { UserGuard } from './login/guard/user.guard';

const routes: Routes = [

  { path: "", redirectTo:'login',pathMatch:'full'},
  { path: "login", component:LoginComponent},
  { path: "admin", component:NavigationAdminComponent,canActivate: [AdminGuard]},
  { path: "usuario", component:NavigationUserComponent,canActivate: [UserGuard]},
  { path: "**", redirectTo: "login" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { NavigationAdminComponent } from './admin/navigation-admin/navigation-admin.component';
import { NavigationUserComponent } from './user/navigation-user/navigation-user.component';

const routes: Routes = [

  { path: "", redirectTo:'login',pathMatch:'full'},
  { path: "login", component:LoginComponent},
  { path: "admin", component:NavigationAdminComponent},
  { path: "user", component:NavigationUserComponent},
  { path: "**", redirectTo: "login" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

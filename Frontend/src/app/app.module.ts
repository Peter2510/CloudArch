import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { NavigationAdminComponent } from './admin/navigation-admin/navigation-admin.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { NavigationUserComponent } from './user/navigation-user/navigation-user.component';
import { DashboardUserComponent } from './user/dashboard-user/dashboard-user.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { RecyclerComponent } from './admin/recycler/recycler.component';
import { EmpleadosComponent } from './admin/empleados/empleados.component';
import { CrearEmpleadoComponent } from './admin/empleados/crear-empleado/crear-empleado.component';
import { CompartidoComponent } from './compartido/compartido.component';
import { PerfilComponent } from './user/perfil/perfil.component';
import { CodeEditorComponent } from './file-manager/code-editor/code-editor.component';
import { CodeEditorModule } from '@ngstack/code-editor';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardAdminComponent,
    NavigationAdminComponent,
    NavigationUserComponent,
    DashboardUserComponent,
    FileManagerComponent,
    RecyclerComponent,
    EmpleadosComponent,
    CrearEmpleadoComponent,
    CompartidoComponent,
    PerfilComponent,
    CodeEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    FormsModule,
    CodeEditorModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

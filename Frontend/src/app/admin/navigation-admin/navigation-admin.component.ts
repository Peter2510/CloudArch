import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from 'src/app/login/login-service/login-service.service';

@Component({
  selector: 'app-navigation-admin',
  templateUrl: './navigation-admin.component.html',
  styleUrls: ['./navigation-admin.component.css']
})
export class NavigationAdminComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(public loginService:LoginService) {}

    opcion:Number=1;

    public mostrarOpcion(opcionMostar:Number){
      this.opcion = opcionMostar;
    }

    public cerrarSesion(){
      this.loginService.logOut();
      window.location.reload();
    }

    public recargar(){
      window.location.reload();
    }

}

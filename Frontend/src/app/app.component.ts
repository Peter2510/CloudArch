import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';

  @HostListener('document:contextmenu', ['$event'])
  onContextMenu(event: Event): void {
    event.preventDefault();
  }

}

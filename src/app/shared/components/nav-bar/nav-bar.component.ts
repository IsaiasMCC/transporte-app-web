import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @Output('handleOnToggleClose')
  public handleOnToggleClose: EventEmitter<void> = new EventEmitter();
  public isOpened = false;
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isOpened = true;
  options = [
    { label: 'Inicio', icon: 'home' },
    { label: 'Perfil', icon: 'person' },
    { label: 'Configuración', icon: 'settings' },
    { label: 'Ayuda', icon: 'help' },
    { label: 'Cerrar sesión', icon: 'logout' }
  ];
}

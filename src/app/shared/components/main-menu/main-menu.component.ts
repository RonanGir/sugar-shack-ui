import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbar,
    NgOptimizedImage,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {

  constructor() {
  }


}

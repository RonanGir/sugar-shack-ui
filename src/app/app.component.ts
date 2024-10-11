import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MainMenuComponent} from './shared/components/main-menu/main-menu.component';

@Component({
  selector: 'sugar-shack-root',
  standalone: true,
  imports: [RouterOutlet, MatIcon, MatToolbar, MainMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sugar-shack-ui';


}

import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MainMenuComponent} from './shared/components/main-menu/main-menu.component';
import {CustomerService} from './shared/services/customer.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'sugar-shack-root',
  standalone: true,
  imports: [RouterOutlet, MatIcon, MatToolbar, MainMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    this.customerService.setConnectedCustomer()
      .pipe(untilDestroyed(this))
      .subscribe(id => this.customerService.setCurrentCustomer(id));
  }
}

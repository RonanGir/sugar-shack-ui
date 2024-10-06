import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HelloService} from './shared/services/hello.service';

@Component({
  selector: 'sugar-shack-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sugar-shack-ui';

  constructor(
    private helloService: HelloService
  ) {
  }


  onHello() {
    console.log("component");
    this.helloService.sayHi().subscribe();
  }
}

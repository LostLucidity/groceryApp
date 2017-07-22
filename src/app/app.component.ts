import { Component } from '@angular/core';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  rootPage:any = HomePage;

  constructor() {}
}


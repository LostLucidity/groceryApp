import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = "My Page";

  constructor(public navCtrl: NavController) {

  }

  changeTitle(string) {
      this.title = string;
  }

}

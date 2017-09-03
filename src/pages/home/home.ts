import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Array<string> = [];
  selectedIndex: number;
  selectedItem: string = "";
  title = "GroceryApp";

  constructor(public navCtrl: NavController) {

  }

  addItem(newItem) {
    if (newItem) {
      this.items.push(newItem);
    }
  }

  editItem(selectedIndex, selectedItem) {  
    if(selectedItem === this.selectedItem) {
      this.selectedItem = "";
      this.selectedIndex = null;
    } else {
      this.selectedIndex = selectedIndex;
      this.selectedItem = selectedItem;

    }
  }

  updateItem(editedItem) {
    if (editedItem) {
      this.items[this.selectedIndex] = editedItem;
      this.selectedItem = "";
    }
  }

}

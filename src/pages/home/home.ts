import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  items: Array<string> = [];
  selectedIndex: number;
  selectedItem: string = "";
  title = "GroceryApp";

  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    this.getList();
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

  deleteItem() {
    this.items.splice(this.selectedIndex, 1);
    this.selectedIndex = null;
    this.selectedItem = "";
  }

  saveList() {
    localStorage.setItem("groceryList", JSON.stringify(this.items));
  }

  getList() {
    let retrievedList = JSON.parse(localStorage.getItem("groceryList")); 
    if (retrievedList) {
      this.items = retrievedList;
    }
  }

}

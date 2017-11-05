import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ItemView } from '../../models/item-view';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  items: Array<ItemView> = [];
  selectedIndex: number;
  selectedItem: ItemView = {
    name: '',
    checked: false
  };
  title = "GroceryApp";
  toggledItems: Array<ItemView> = [];

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    let retrievedList = JSON.parse(localStorage.getItem("groceryList"));
    if (retrievedList) {
      this.items = retrievedList;
    }
  }

  addItem(newItemName: string) {
    let newItem: ItemView = {
      name: newItemName,
      checked: false
    };
    if (newItemName) {
      this.items.push(newItem);
      this.saveList();
    }
  }

  editItem(selectedIndex: number, selectedItemName: string) {

    if (selectedItemName === this.selectedItem.name) {
      this.selectedItem.name = '';
      this.selectedIndex = null;
    } else {
      this.selectedIndex = selectedIndex;
      this.selectedItem.name = selectedItemName;
    }

  }

  updateItem(editedItemName: string) {
    if (editedItemName) {
      this.items[this.selectedIndex].name = editedItemName;
      this.selectedItem.name = '';
    }
  }

  deleteItem() {
    this.items.splice(this.selectedIndex, 1);
    this.selectedIndex = null;
    this.selectedItem.name = '';
    this.saveList()
  }

  saveList() {
    localStorage.setItem("groceryList", JSON.stringify(this.items));
  }

  toggleItem(item: ItemView, index: number) {
    console.log(event, index);
    item.checked = !item.checked;

    if (item.checked === true) {
      this.items.splice(index, 1);
      this.toggledItems.push(item);
    } else {
      this.toggledItems.splice(index, 1);
      this.items.push(item);
    }
  }

}

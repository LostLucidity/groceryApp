import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { DebugElement } from '@angular/core';

import { IonicModule, NavController } from 'ionic-angular';

import { AppComponent } from '../../app/app.component';
import { HomePage } from './home';

import { MOCKGROCERYLIST } from "./mock-data";

let component: HomePage;
let fixture: ComponentFixture<HomePage>;
let debugElement: DebugElement;
let nativeElement: HTMLElement;

describe('Page: Home Page', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [AppComponent, HomePage],

            providers: [
                NavController
            ],

            imports: [
                IonicModule.forRoot(AppComponent)
            ]

        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(HomePage);
        component    = fixture.componentInstance;
        debugElement = fixture.debugElement;
        nativeElement = fixture.debugElement.nativeElement;
        localStorage.setItem("groceryList", JSON.stringify(MOCKGROCERYLIST));

    });

    afterEach(() => {
        fixture.destroy();
        component = null;
        debugElement = null;
        nativeElement = null;
        localStorage.clear();
    });

    it('is created', () => {

        expect(fixture).toBeTruthy();
        expect(component).toBeTruthy();

    });

    it('initialises with a title of GroceryApp', () => {
        expect(component['title']).toEqual('GroceryApp');
    });

    it('should initialize an array', async(() => {
        expect(component.items).toBeTruthy();
    }))

  // Add an item to array
  it('should render a input field and prompt to add an item', async(() => {

    const ionInputElement = nativeElement.querySelector('ion-input');
    const placeholderAttribute = ionInputElement.getAttribute('placeholder');

    expect(placeholderAttribute).toEqual("TYPE HERE TO ADD YOUR ITEM");

  }))

  it("should display an 'Add Item' button when an item is entered", () => {
    fixture.detectChanges();
    let addButtonDebugElement = debugElement.query(By.css(".addItem"));
    expect(addButtonDebugElement).toBeFalsy();
  })

  it('should display a list of items if items exist', () => {
    fixture.detectChanges();
    let ionItemDebugElement = debugElement.query(By.css(".editItem"));
    expect(ionItemDebugElement).toBeTruthy();
  })

  it('should allow the editing of an item on the list', () => {
    addItems();
    expect(component.items.length).toEqual(2);
    // Set "apple" to input field to edit.
    component.editItem(0, "apple");
    expect(component.selectedItem).toEqual("apple");
    // Change to "bread"
    component.selectedItem = "bread";
    component.updateItem(component.selectedItem);
    expect(component.items[component.selectedIndex]).toEqual("bread");
  })

  it("should highlight the ion-item when selected", () => {
    addItems();
    expect(component.items.length).toEqual(2);
    fixture.detectChanges();
    let displayItemsDebugElement = debugElement.queryAll(By.css(".editItem"));
    displayItemsDebugElement[0].triggerEventHandler("click", null);
    fixture.detectChanges();
    expect(displayItemsDebugElement[0].nativeElement.className).toContain("active");
    expect(displayItemsDebugElement[1].nativeElement.className).not.toContain("active");

    displayItemsDebugElement[1].triggerEventHandler("click", null);
    fixture.detectChanges();
    expect(displayItemsDebugElement[0].nativeElement.className).not.toContain("active");
    expect(displayItemsDebugElement[1].nativeElement.className).toContain("active");
  })

  it("should remove highlight when selected highlight is reselected", () => {
    addItems();
    fixture.detectChanges();

    let displayItemsDebugElement = debugElement.queryAll(By.css(".editItem"));
    expect(displayItemsDebugElement.length).toEqual(2);

    displayItemsDebugElement[0].triggerEventHandler("click", null);
    fixture.detectChanges();
    expect(displayItemsDebugElement[0].nativeElement.className).toContain("active")

    displayItemsDebugElement[0].triggerEventHandler("click", null);
    fixture.detectChanges();
    expect(displayItemsDebugElement[0].nativeElement.className).not.toContain("active")
  })

  it("should only add or update items when there is content in the input field", () => {
    // check if adding empty
    component.addItem("");
    expect(component.items.length).toEqual(0);
    // update should not let blank entry
    component.addItem("apples");
    component.selectedIndex = 0;
    component.updateItem("");
    expect(component.items[component.selectedIndex]).toBeTruthy();
  })

  it("should delete the selected item when clicking on delete button.", () => {
    addItems();
    fixture.detectChanges();
    let displayItemsDebugElement = debugElement.queryAll(By.css(".editItem"));
    expect(displayItemsDebugElement.length).toEqual(2);
    // select an item
    let index = 0;
    displayItemsDebugElement[index].triggerEventHandler("click", null);
    fixture.detectChanges();
    // delete an item
    let deleteItemDebugElement = debugElement.query(By.css(".deleteItem"));
    deleteItemDebugElement.triggerEventHandler("click", null);
    fixture.detectChanges();
    expect(component.items.length).toEqual(1);
    expect(component.selectedItem).toBeFalsy();
  })

  // it("should check local storage for existing grocery list", async(() => {
  //   fixture.whenStable().then(() => {
  //     expect(component.items.length).toEqual(2);
  //   })
  // }))

  // save list button only should be available with a list

  it('should save the list on each change of the list', () => {
    localStorage.clear();
    component.getList();
    const emptyList = component.items;
    expect(emptyList.length).toEqual(0);
    // save when adding
    component.addItem('apples');
    component.getList();
    const addedItem = component.items;
    expect(addedItem.length).toEqual(1);
    // save when deleting
    component.selectedIndex = 0;
    component.deleteItem()
    component.getList();
    const deletedItem = component.items;
    expect(deletedItem.length).toEqual(0);
  })

  function addItems() {

    if (component.items.length === 0) {

      let items = MOCKGROCERYLIST;
      for (let item of items) {
          component.addItem(item);
      }

    }

  }

});





// fixture = TestBed.createComponent(HomePage);
// fixture provides access to the component instance itself and to the DebugElement, which is a handle on the component's DOM element.

// component = fixture.componentInstance;
// compiled = fixture.debugElement.nativeElement;
// DebugElement, which is a handle on the component's DOM element.

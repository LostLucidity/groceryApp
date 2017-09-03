import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { IonicModule, NavController } from 'ionic-angular';
import { AppComponent } from '../../app/app.component';
import { HomePage } from './home';
 
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
 
    });
 
    afterEach(() => {
        fixture.destroy();
        component = null;
        debugElement = null;
        nativeElement = null;
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

    expect(placeholderAttribute).toEqual("Type in an item.");
    
  }))

  it('should display a list of items if items exist', () => {
    // const ionInputElement = nativeElement.querySelector('ion-input');
    // ionInputElement.textContent = 'apple';
    // debugger;
    // expect(component.selectedItem).toBeFalsy();
    // By.css allows for the debug (not nativeElement) element that can trigger the event handler. 
    // querySelector doesn't return a triggerable element on debugElement.
    // const buttonDebugElement = debugElement.query(By.css(".addItemButton"));
    // buttonDebugElement.triggerEventHandler("click", null);
    // fixture.detectChanges();
    // expect(component.items.length).toEqual(1);

    //   debugger;
    // const ionItemDebugElement = debugElement.query(By.css('ion-item'));
    // const ionItemNativeElement = ionItemDebugElement.nativeElement; 
    
    // expect(ionItemNativeElement).toBeTruthy;
  })

  it('should allow the editing of an item on the list', () => {
    // Add "apple"
    component.addItem("apple");
    expect(component.items.length).toEqual(1);
    // Set "apple" to input field to edit.
    component.editItem(0, "apple");
    expect(component.selectedItem).toEqual("apple");
    // Change to "bread"
    component.selectedItem = "bread";
    component.updateItem(component.selectedItem);
    expect(component.items[component.selectedIndex]).toEqual("bread");
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

});





// fixture = TestBed.createComponent(HomePage);
// fixture provides access to the component instance itself and to the DebugElement, which is a handle on the component's DOM element.

// component = fixture.componentInstance;
// compiled = fixture.debugElement.nativeElement;
// DebugElement, which is a handle on the component's DOM element.
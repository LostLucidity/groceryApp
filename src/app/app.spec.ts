import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';

import { IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home';

 
let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let de: DebugElement;
let el: HTMLElement;
 
describe('Component: Root Component', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [AppComponent],
 
            providers: [],
 
            imports: [
                IonicModule.forRoot(AppComponent)
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
 
        fixture = TestBed.createComponent(AppComponent);
        comp    = fixture.componentInstance;
 
    });
 
    afterEach(() => {
        fixture.destroy();
        comp = null;
    });
 
    it('is created', () => {
 
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
 
    });
 
    it('initialises with a root page of HomePage', () => {
        expect(comp['rootPage']).toBe(HomePage);
    });
 
});
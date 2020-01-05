import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DrinkPage } from './drink.page';

describe('DrinkPage', () => {
  let component: DrinkPage;
  let fixture: ComponentFixture<DrinkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DrinkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

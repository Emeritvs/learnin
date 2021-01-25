import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MuralComponent } from './mural.component';

describe('MuralComponent', () => {
  let component: MuralComponent;
  let fixture: ComponentFixture<MuralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuralComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MuralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

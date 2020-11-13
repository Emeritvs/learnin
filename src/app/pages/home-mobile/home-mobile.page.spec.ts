import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeMobilePage } from './home-mobile.page';

describe('HomeMobilePage', () => {
  let component: HomeMobilePage;
  let fixture: ComponentFixture<HomeMobilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeMobilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeMobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

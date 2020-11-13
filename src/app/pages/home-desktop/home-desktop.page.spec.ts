import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeDesktopPage } from './home-desktop.page';

describe('HomeDesktopPage', () => {
  let component: HomeDesktopPage;
  let fixture: ComponentFixture<HomeDesktopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDesktopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeDesktopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

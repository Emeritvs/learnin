import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewPublicacaoPage } from './view-publicacao.page';

describe('ViewPublicacaoPage', () => {
  let component: ViewPublicacaoPage;
  let fixture: ComponentFixture<ViewPublicacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPublicacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPublicacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

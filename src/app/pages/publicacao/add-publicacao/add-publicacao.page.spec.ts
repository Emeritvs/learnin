import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPublicacaoPage } from './add-publicacao.page';

describe('AddPublicacaoPage', () => {
  let component: AddPublicacaoPage;
  let fixture: ComponentFixture<AddPublicacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPublicacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPublicacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

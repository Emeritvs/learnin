import { TestBed } from '@angular/core/testing';

import { ComponentsRenderService } from './components-render.service';

describe('ComponentsRenderService', () => {
  let service: ComponentsRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentsRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

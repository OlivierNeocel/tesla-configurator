import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAndColorComponent } from './model-and-color.component';

describe('ModelAndColorComponent', () => {
  let component: ModelAndColorComponent;
  let fixture: ComponentFixture<ModelAndColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelAndColorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelAndColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

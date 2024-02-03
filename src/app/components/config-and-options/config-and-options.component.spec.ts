import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAndOptionsComponent } from './config-and-options.component';

describe('ConfigAndOptionsComponent', () => {
  let component: ConfigAndOptionsComponent;
  let fixture: ComponentFixture<ConfigAndOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigAndOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigAndOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

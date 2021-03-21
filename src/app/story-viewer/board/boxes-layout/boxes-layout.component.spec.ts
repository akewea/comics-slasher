import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxesLayoutComponent } from './boxes-layout.component';

describe('BoxLayoutComponent', () => {
  let component: BoxesLayoutComponent;
  let fixture: ComponentFixture<BoxesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxesLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

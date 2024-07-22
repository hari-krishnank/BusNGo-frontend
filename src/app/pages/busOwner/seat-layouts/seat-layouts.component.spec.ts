import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatLayoutsComponent } from './seat-layouts.component';

describe('SeatLayoutsComponent', () => {
  let component: SeatLayoutsComponent;
  let fixture: ComponentFixture<SeatLayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatLayoutsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeatLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

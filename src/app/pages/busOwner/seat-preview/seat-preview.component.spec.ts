import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatPreviewComponent } from './seat-preview.component';

describe('SeatPreviewComponent', () => {
  let component: SeatPreviewComponent;
  let fixture: ComponentFixture<SeatPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeatPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

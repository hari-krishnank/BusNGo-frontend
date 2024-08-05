import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatPreviewModalComponent } from './seat-preview-modal.component';

describe('SeatPreviewModalComponent', () => {
  let component: SeatPreviewModalComponent;
  let fixture: ComponentFixture<SeatPreviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatPreviewModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeatPreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

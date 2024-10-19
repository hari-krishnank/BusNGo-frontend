import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationBookingPolicyComponent } from './cancellation-booking-policy.component';

describe('CancellationBookingPolicyComponent', () => {
  let component: CancellationBookingPolicyComponent;
  let fixture: ComponentFixture<CancellationBookingPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancellationBookingPolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancellationBookingPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

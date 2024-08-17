import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSeatBookingComponent } from './user-seat-booking.component';

describe('UserSeatBookingComponent', () => {
  let component: UserSeatBookingComponent;
  let fixture: ComponentFixture<UserSeatBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSeatBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSeatBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

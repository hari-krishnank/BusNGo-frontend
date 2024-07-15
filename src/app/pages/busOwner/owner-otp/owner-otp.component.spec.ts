import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerOtpComponent } from './owner-otp.component';

describe('OwnerOtpComponent', () => {
  let component: OwnerOtpComponent;
  let fixture: ComponentFixture<OwnerOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

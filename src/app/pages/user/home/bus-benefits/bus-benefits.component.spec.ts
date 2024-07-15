import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusBenefitsComponent } from './bus-benefits.component';

describe('BusBenefitsComponent', () => {
  let component: BusBenefitsComponent;
  let fixture: ComponentFixture<BusBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusBenefitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

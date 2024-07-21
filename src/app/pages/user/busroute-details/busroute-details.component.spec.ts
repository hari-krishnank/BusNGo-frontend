import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusrouteDetailsComponent } from './busroute-details.component';

describe('BusrouteDetailsComponent', () => {
  let component: BusrouteDetailsComponent;
  let fixture: ComponentFixture<BusrouteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusrouteDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusrouteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

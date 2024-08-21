import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTicketsComponent } from './bus-tickets.component';

describe('BusTicketsComponent', () => {
  let component: BusTicketsComponent;
  let fixture: ComponentFixture<BusTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

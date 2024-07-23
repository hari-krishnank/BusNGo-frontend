import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPriceComponent } from './ticket-price.component';

describe('TicketPriceComponent', () => {
  let component: TicketPriceComponent;
  let fixture: ComponentFixture<TicketPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

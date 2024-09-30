import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoTravellersCardComponent } from './co-travellers-card.component';

describe('CoTravellersCardComponent', () => {
  let component: CoTravellersCardComponent;
  let fixture: ComponentFixture<CoTravellersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoTravellersCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoTravellersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

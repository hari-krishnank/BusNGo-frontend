import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoTravellersComponent } from './co-travellers.component';

describe('CoTravellersComponent', () => {
  let component: CoTravellersComponent;
  let fixture: ComponentFixture<CoTravellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoTravellersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoTravellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

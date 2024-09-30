import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoTravellersModalComponent } from './co-travellers-modal.component';

describe('CoTravellersModalComponent', () => {
  let component: CoTravellersModalComponent;
  let fixture: ComponentFixture<CoTravellersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoTravellersModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoTravellersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

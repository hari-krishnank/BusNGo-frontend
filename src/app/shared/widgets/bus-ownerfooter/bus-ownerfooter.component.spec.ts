import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusOwnerfooterComponent } from './bus-ownerfooter.component';

describe('BusOwnerfooterComponent', () => {
  let component: BusOwnerfooterComponent;
  let fixture: ComponentFixture<BusOwnerfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusOwnerfooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusOwnerfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleettypeComponent } from './fleettype.component';

describe('FleettypeComponent', () => {
  let component: FleettypeComponent;
  let fixture: ComponentFixture<FleettypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleettypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FleettypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

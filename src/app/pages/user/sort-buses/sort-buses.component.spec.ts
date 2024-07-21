import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortBusesComponent } from './sort-buses.component';

describe('SortBusesComponent', () => {
  let component: SortBusesComponent;
  let fixture: ComponentFixture<SortBusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortBusesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortBusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

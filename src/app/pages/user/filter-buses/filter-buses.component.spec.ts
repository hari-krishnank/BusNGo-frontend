import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBusesComponent } from './filter-buses.component';

describe('FilterBusesComponent', () => {
  let component: FilterBusesComponent;
  let fixture: ComponentFixture<FilterBusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterBusesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterBusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

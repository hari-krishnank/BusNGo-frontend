import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedBusComponent } from './assigned-bus.component';

describe('AssignedBusComponent', () => {
  let component: AssignedBusComponent;
  let fixture: ComponentFixture<AssignedBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedBusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignedBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

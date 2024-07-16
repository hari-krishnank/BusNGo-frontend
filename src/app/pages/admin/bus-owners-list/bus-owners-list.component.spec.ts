import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusOwnersListComponent } from './bus-owners-list.component';

describe('BusOwnersListComponent', () => {
  let component: BusOwnersListComponent;
  let fixture: ComponentFixture<BusOwnersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusOwnersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusOwnersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

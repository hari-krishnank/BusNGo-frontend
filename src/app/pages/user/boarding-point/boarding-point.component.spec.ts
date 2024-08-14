import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingPointComponent } from './boarding-point.component';

describe('BoardingPointComponent', () => {
  let component: BoardingPointComponent;
  let fixture: ComponentFixture<BoardingPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardingPointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

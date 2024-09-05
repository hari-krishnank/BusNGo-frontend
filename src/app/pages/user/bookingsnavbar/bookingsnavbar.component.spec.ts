import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsnavbarComponent } from './bookingsnavbar.component';

describe('BookingsnavbarComponent', () => {
  let component: BookingsnavbarComponent;
  let fixture: ComponentFixture<BookingsnavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingsnavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingsnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

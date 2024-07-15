import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerFaqComponent } from './owner-faq.component';

describe('OwnerFaqComponent', () => {
  let component: OwnerFaqComponent;
  let fixture: ComponentFixture<OwnerFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerFaqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnernavComponent } from './ownernav.component';

describe('OwnernavComponent', () => {
  let component: OwnernavComponent;
  let fixture: ComponentFixture<OwnernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnernavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSearchComponent } from './update-search.component';

describe('UpdateSearchComponent', () => {
  let component: UpdateSearchComponent;
  let fixture: ComponentFixture<UpdateSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

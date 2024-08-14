import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusImagesComponent } from './bus-images.component';

describe('BusImagesComponent', () => {
  let component: BusImagesComponent;
  let fixture: ComponentFixture<BusImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

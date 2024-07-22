import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersecondnavComponent } from './ownersecondnav.component';

describe('OwnersecondnavComponent', () => {
  let component: OwnersecondnavComponent;
  let fixture: ComponentFixture<OwnersecondnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnersecondnavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnersecondnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

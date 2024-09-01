import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpUsersComponent } from './help-users.component';

describe('HelpUsersComponent', () => {
  let component: HelpUsersComponent;
  let fixture: ComponentFixture<HelpUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

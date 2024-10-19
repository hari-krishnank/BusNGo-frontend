import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationPolicySidebarComponent } from './cancellation-policy-sidebar.component';

describe('CancellationPolicySidebarComponent', () => {
  let component: CancellationPolicySidebarComponent;
  let fixture: ComponentFixture<CancellationPolicySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancellationPolicySidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancellationPolicySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

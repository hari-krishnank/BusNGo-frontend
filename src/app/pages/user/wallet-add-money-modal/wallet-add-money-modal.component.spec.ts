import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAddMoneyModalComponent } from './wallet-add-money-modal.component';

describe('WalletAddMoneyModalComponent', () => {
  let component: WalletAddMoneyModalComponent;
  let fixture: ComponentFixture<WalletAddMoneyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletAddMoneyModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletAddMoneyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

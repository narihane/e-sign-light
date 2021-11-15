import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitInvoiceComponent } from './submit-invoice.component';

describe('SubmitInvoiceComponent', () => {
  let component: SubmitInvoiceComponent;
  let fixture: ComponentFixture<SubmitInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

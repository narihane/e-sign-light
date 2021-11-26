import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedDocumentsComponent } from './received-documents.component';

describe('ReceivedInvoicesComponent', () => {
  let component: ReceivedDocumentsComponent;
  let fixture: ComponentFixture<ReceivedDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

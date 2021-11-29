import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedDocumentsComponent } from './submitted-documents.component';

describe('SubmittedDocumentsComponent', () => {
  let component: SubmittedDocumentsComponent;
  let fixture: ComponentFixture<SubmittedDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

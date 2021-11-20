import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeMappingComponent } from './code-mapping.component';

describe('CodeMappingComponent', () => {
  let component: CodeMappingComponent;
  let fixture: ComponentFixture<CodeMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

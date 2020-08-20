import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShortFormComponent } from './create-short-form.component';

describe('CreateShortFormComponent', () => {
  let component: CreateShortFormComponent;
  let fixture: ComponentFixture<CreateShortFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShortFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShortFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

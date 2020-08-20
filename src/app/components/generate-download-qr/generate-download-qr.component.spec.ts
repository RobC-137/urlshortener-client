import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDownloadQrComponent } from './generate-download-qr.component';

describe('GenerateDownloadQrComponent', () => {
  let component: GenerateDownloadQrComponent;
  let fixture: ComponentFixture<GenerateDownloadQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateDownloadQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDownloadQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

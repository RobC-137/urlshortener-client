import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { QRCodeComponent } from 'angularx-qrcode';

import { ApiService } from '../../services/api.service';

interface Response {
  saved?: {};
  shortenedUrl?: string;
  message?: string;
}
@Component({
  selector: 'app-create-short-form',
  templateUrl: './create-short-form.component.html',
  styleUrls: ['./create-short-form.component.scss'],
})
export class CreateShortFormComponent implements OnInit {
  urlForm: FormGroup;
  response: Response;
  err;
  shortenedUrl: string;
  invalidForm: boolean = false;
  showInvalidMessage: string;
  private maxLenToShow = 26;
  @ViewChild('cnv') myCanvas: QRCodeComponent;
  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.urlForm = this.fb.group({
      originalUrl: ['', [Validators.required, this.validateUrl]],
      slug: ['', [Validators.maxLength(16)]],
    });

    //this.response.shortenedUrl = 'thisisplaceholder';
  }

  onSubmit(form: FormGroup) {
    // const url = new URL(form.value.originalUrl);
    this.response = null;
    this.err = null;
    this.invalidForm = false;
    if (form.valid) {
      this.api
        .postNewUrl({
          url: form.value.originalUrl,
          slug: form.value.slug,
        })
        .subscribe(
          (res: Response) => {
            console.log(res);
            if (res.saved) {
              this.response = res;
              if (this.response.shortenedUrl.length > this.maxLenToShow)
                this.shortenedUrl =
                  this.response.shortenedUrl.slice(0, this.maxLenToShow) +
                  '...';
              else this.shortenedUrl = this.response.shortenedUrl;
            } else {
              this.err = res.message;
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err.error);
            console.log(err.name);
            console.log(err.message);
            console.log(err.status);
          }
        );
      //console.log(this.response);
    } else {
      if (this.urlForm.controls.originalUrl.hasError('invalidUrl')) {
        this.showInvalidMessage =
          'Invalid URL, remember to add http:// or https://';
      }
      this.invalidForm = true;
    }
  }

  //custom validator: verifies that URL is valid
  validateUrl(control: AbstractControl): { [key: string]: boolean } | null {
    try {
      //URL throws error if control.value not valid
      const url = new URL(control.value);
      return null;
    } catch (error) {
      return { invalidUrl: true };
    }
  }

  saveCanvasAs(canvas, fileName) {
    // get image data and transform mime type to application/octet-stream
    var canvasDataUrl = canvas
        .toDataURL()
        .replace(/^data:image\/[^;]*/, 'data:application/octet-stream'),
      link = document.createElement('a'); // create an anchor tag

    // set parameters for downloading
    link.setAttribute('href', canvasDataUrl);
    link.setAttribute('target', '_blank');
    link.setAttribute('download', fileName);

    // compat mode for dispatching click on your anchor
    if (document.createEvent) {
      var evtObj = document.createEvent('MouseEvents');
      evtObj.initEvent('click', true, true);
      link.dispatchEvent(evtObj);
    } else if (link.click) {
      link.click();
    }
  }

  downloadQr() {
    const canvas = this.myCanvas.qrcElement.nativeElement.childNodes[0];
    this.saveCanvasAs(canvas, this.response.shortenedUrl + '.png');
  }
}

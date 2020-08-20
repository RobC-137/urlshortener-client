import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-generate-download-qr',
  templateUrl: './generate-download-qr.component.html',
  styleUrls: ['./generate-download-qr.component.scss'],
})
export class GenerateDownloadQrComponent implements OnInit {
  @Input() qrData;
  @ViewChild('cnv') myCanvas: QRCodeComponent;
  constructor() {}

  ngOnInit(): void {}

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
    this.saveCanvasAs(canvas, this.qrData + '.png');
  }
}

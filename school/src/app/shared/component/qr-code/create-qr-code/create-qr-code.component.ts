import { Component, OnInit, Input } from '@angular/core';
import { quotes } from '@env/environment';

@Component({
  selector: 'create-qr-code',
  templateUrl: './create-qr-code.component.html',
  styleUrls: ['./create-qr-code.component.css']
})
export class CreateQrCodeComponent implements OnInit {

  @Input() colorDark = "Red"
  @Input() colorLight = "Blue"
  @Input() qrData = ""
  @Input() width = 200
  @Input() errorCorrectionLevel = "M"

  constructor() {}

  ngOnInit() {
  }

}

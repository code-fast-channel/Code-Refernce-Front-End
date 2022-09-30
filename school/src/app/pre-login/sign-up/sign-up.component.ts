import { Component, OnInit } from '@angular/core';
import { StorageService } from '@app/shared/services/storage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private _sessionService: StorageService
  ) { 
  }

  ngOnInit() {
  }

}
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pre-login-footer',
  templateUrl: './pre-login-footer.component.html',
  styleUrls: ['./pre-login-footer.component.css']
})
export class PreLoginFooterComponent implements OnInit {

  public showMap = false
  public showQuotes = false

  public websiteUrl

  constructor() {
    this.websiteUrl = window.location.href
  }

  ngOnInit(): void {
  }

}

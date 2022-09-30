import { Component, OnInit } from '@angular/core';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-principal-speak',
  templateUrl: './principal-speak.component.html',
  styleUrls: ['./principal-speak.component.css']
})
export class PrincipalSpeakComponent implements OnInit {

  public masterData = MasterData
  constructor() { }

  ngOnInit(): void {
  }

}

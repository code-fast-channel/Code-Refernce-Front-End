import { Component, OnInit } from '@angular/core';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-director-speak',
  templateUrl: './director-speak.component.html',
  styleUrls: ['./director-speak.component.css']
})
export class DirectorSpeakComponent implements OnInit {

  public masterData = MasterData
  
  constructor() { }

  ngOnInit(): void {
  }

}

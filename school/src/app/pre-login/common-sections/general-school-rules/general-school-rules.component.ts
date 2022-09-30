import { Component, OnInit } from '@angular/core';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-general-school-rules',
  templateUrl: './general-school-rules.component.html',
  styleUrls: ['./general-school-rules.component.css']
})
export class GeneralSchoolRulesComponent implements OnInit {

  public masterData = MasterData
  constructor() { }

  ngOnInit(): void {
  }

}

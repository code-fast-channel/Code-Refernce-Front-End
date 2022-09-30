import { Component, OnInit } from '@angular/core';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-admission-process',
  templateUrl: './admission-process.component.html',
  styleUrls: ['./admission-process.component.css']
})
export class AdmissionProcessComponent implements OnInit {

  public masterData = MasterData
  constructor() { }

  ngOnInit(): void {
  }

}

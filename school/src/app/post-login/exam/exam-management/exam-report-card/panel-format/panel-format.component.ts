import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-panel-format',
  templateUrl: './panel-format.component.html',
  styleUrls: ['./panel-format.component.css']
})
export class PanelFormatComponent implements OnInit {

  @Input() set selectedSectionId(value) {
    this.sectionId = value;
    this.processFilter()
  }

  @Input() set resultData(value) {
    this.orgData = value
    this.processFilter()
  }

  public masterData = MasterData
  public sectionId
  private orgData
  public filteredData

  constructor() { }

  ngOnInit(): void {
  }

  processFilter() {
    this.filteredData = this.orgData ? this.orgData.filter(x => x._id.sectionId === this.sectionId) : null
  }

}

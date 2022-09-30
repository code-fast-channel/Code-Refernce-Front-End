import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tabular-format',
  templateUrl: './tabular-format.component.html',
  styleUrls: ['./tabular-format.component.css']
})
export class TabularFormatComponent implements OnInit {

  @Input() set selectedSectionId(value) {
    this.sectionId = value;
    this.processFilter()
  }

  @Input() set resultData(value) {
    this.orgData = value
    this.processFilter()
  }

  public sectionId
  private orgData
  public filteredData

  constructor() { }

  ngOnInit(): void {
  }

  processFilter() {
    this.filteredData = this.orgData ? this.orgData.filter(x => x._id.sectionId === this.sectionId) : null
  }

  sortData(){

  }

  sortNodes(a, b) {
    if (a[0]._id.distance < b[0].distance) return -1;
    if (a[0].distance > b[0].distance) return 1;
    return 0;
}

}

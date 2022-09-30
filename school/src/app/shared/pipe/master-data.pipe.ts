import { Pipe, PipeTransform } from '@angular/core';
import { MasterData } from '@env/environment';

@Pipe({
  name: 'masterData'
})
export class MasterDataPipe implements PipeTransform {

  transform(id: number, args?: string): string {
    args = args.toLowerCase()

    if(id === null || id === undefined){
      return MasterData.emptyDataText
    }

    switch (args) {
      case "bloodgroup": {
        return this.hasData(MasterData.bloodGroups.filter(x => x.id === id))
      }
      case "department": {
        return this.hasData(MasterData.departments.filter(x => x.id === id))
      }
      case "gender": {
        return this.hasData(MasterData.genders.filter(x => x.id === id))
      }
      case "jobtype": {
        return this.hasData(MasterData.jobTypes.filter(x => x.id === id))
      }
      case "relation": {
        return this.hasData(MasterData.relations.filter(x => x.id === id))
      }
      case "vehicletype": {
        return this.hasData(MasterData.vehicleTypes.filter(x => x.id === id))
      }
      case "fueltype": {
        return this.hasData(MasterData.fuelTypes.filter(x => x.id === id))
      }
      case "attendancestatus": {
        return this.hasData(MasterData.attendanceStatus.filter(x => x.id === id))
      }
      case "classsections": {
        return this.hasData(MasterData.classSections.filter(x => x.id === id))
      }
      case "academicsession": {
        return this.hasData(MasterData.academicSessions.filter(x => x.id === id))
      }
    }
  }

  hasData(filteredData){
    if(filteredData.length > 0){
      return filteredData[0].name
    }
    else{
      return MasterData.emptyDataText
    }
  }
}

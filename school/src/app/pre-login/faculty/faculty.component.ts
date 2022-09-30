import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, VirtualTimeScheduler } from 'rxjs';
import { PreLoginService } from '../services/pre-login.service';
import { takeUntil } from 'rxjs/operators';
import { MasterData } from '@env/environment';
import { SharedService } from '@app/shared/services/shared.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  public masterData = MasterData
  public slides 
  public isLoading
  public teachers = []

  constructor(
    private preLoginService : PreLoginService,
    private sharedService : SharedService
  ) { }

  ngOnInit(): void {
    this.populateCarousel()
  }

  populateCarousel(){    
    this.slides = [
      {
        image: "assets/images/faculty.jpg"
      },
      {
        image: "assets/images/faculty2.jpg"
      }
    ]
  }


  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}

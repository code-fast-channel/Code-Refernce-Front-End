import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-bg-image',
  templateUrl: './bg-image.component.html',
  styleUrls: ['./bg-image.component.css']
})
export class BgImageComponent implements OnInit, OnDestroy {  

  private masterData = MasterData
  private postLogin = "pl/secure/"

  private imageLightSmallCheck = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxMRFPtecBE3lF0LaD2HzZzopXe0d4WDe4x4ZjpG5NlHcziLD0)";
  private imageStones = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3V86qIugo-u5LqUD11X_GUFTe7txD8UEcfCHjrmrWNxp-jBLO)";
  private imageWall = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRmvdAzgmm6aP3xPtnNpK9GcBcG2vm5JzI9xqwK_bs_Un9KOf4)";
  private imageGrass = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTRe5GfvSjDQ5isMuuKDKVTSeI8gWeHHZdVxF6Kq7w5r-iHqyK5)";
  private imageDarkWood = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjEZa7eC7rOSgZfgXvaiD4f6cw_l-JVYXsC22LlgyQ0IhPLmnWsQ&s)";
  private imageLightWood = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWBH9JBxkke3Rbi2vwFv6CDViyEleqCD2ZxKtrLE6AVvbyBlCU6A&s)";
  private imageMix = "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtA5wFVhxO_VvO-jJv0v-KpybcXtVTPC8By9CKtsv9KOjmwGcF&s)";
  private imageAnimatedLeafFall = "url(https://lh5.ggpht.com/_JX4SILykZEo/S2W_7KPfH1I/AAAAAAAABWg/BMPge_PpM_o/s640/floatie12.gif)";

  constructor(
    private router: Router
  ) { 

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {

        if(this.masterData.websiteBgImage === "random")
          this.setBackgroundRandomly()
      }
    });
  }

  ngOnInit(): void {
  }

  setBackgroundRandomly(){
    let idx = this.computeRandomNumber()
    document.documentElement.style.setProperty('--main-bg-image', this.masterData.bgImages[idx].value);
  }

  computeRandomNumber(){
    let min = 1
    let max = this.masterData.bgImages.length - 1
    let idx = Math.floor(Math.random() * max) + min; 
    
    if(idx <= 0 || idx >= this.masterData.bgImages.length){
      idx = 2
    }

    return idx
  }

  setBackgroundImage(){

    let bgImage = this.imageLightSmallCheck

    if(this.router.url.includes(this.postLogin + "dashboard")){
      bgImage = this.imageAnimatedLeafFall
    }
    else if(this.router.url.includes(this.postLogin + "attendance")){
      bgImage = this.imageStones
    }
    else if(this.router.url.includes(this.postLogin + "rating")){
      bgImage = this.imageGrass
    }
    else if(this.router.url.includes(this.postLogin + "school")){
      bgImage = this.imageLightWood
    }
    else if(this.router.url.includes(this.postLogin + "exam")){
      bgImage = this.imageWall
    }

    document.documentElement.style.setProperty('--main-bg-image', bgImage);
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
}

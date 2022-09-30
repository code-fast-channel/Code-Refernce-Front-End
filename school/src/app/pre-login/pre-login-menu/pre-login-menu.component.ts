import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MasterData } from '@env/environment';

@Component({
  selector: 'app-pre-login-menu',
  templateUrl: './pre-login-menu.component.html',
  styleUrls: ['./pre-login-menu.component.css']
})
export class PreLoginMenuComponent implements OnInit {

  @Output() toggleSideMenu: EventEmitter<boolean> = new EventEmitter()
  masterData = MasterData

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  menuClicked(){
    this.toggleSideMenu.emit();
  }

public menuList =
[
  {
    name: 'Home',
    url:'home',
    modelUrl:'guest', 
    icon:'home'
  },
  {
    name: 'About Us',
    url:'aboutUs',
    modelUrl:'guest', 
    icon:'speaker'
  },
  {
    name: 'Faculty',
    url:'faculty',
    modelUrl:'guest', 
    icon:'person'
  },
  {
    name: 'Gallery',
    url:'gallery',
    modelUrl:'guest', 
    icon:'photo_album'
  },  
  {
    name: 'ContactUs',
    url:'contactUs',
    modelUrl:'guest', 
    icon:'perm_phone_msg'
  },
  {
    name: 'login',
    url:'signin',
    modelUrl:'guest', 
    icon:'lock'
  }
]
}

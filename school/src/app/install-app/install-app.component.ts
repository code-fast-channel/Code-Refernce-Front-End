import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'install-app',
  templateUrl: './install-app.component.html',
  styleUrls: ['./install-app.component.css']
})
export class InstallAppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  deferredPrompt: any;
  public showAddToHomeScreenButton = false;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showAddToHomeScreenButton = true;
  }


  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    this.showAddToHomeScreenButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }

}

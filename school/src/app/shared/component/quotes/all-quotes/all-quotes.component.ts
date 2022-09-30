import { Component, OnInit } from '@angular/core';
import { quotes } from '@env/environment';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-quotes',
  templateUrl: './all-quotes.component.html',
  styleUrls: ['./all-quotes.component.css']
})
export class AllQuotesComponent implements OnInit {

  public fliteredQuotes
  public title = "Quotes"
  public subTitle = "View all quotes"
  public isLoading = false
  public showHeader = false

  mainForm: FormGroup = new FormGroup({})
  
  constructor() { }

  ngOnInit() {
    this.fliteredQuotes = quotes
  }

  onSubmit(){
    let autoherName = this.mainForm.get('code').value

    alert(autoherName)

    if(!autoherName){
      this.fliteredQuotes = quotes
    }
    else{
      this.fliteredQuotes = quotes.filter( x => x.quoteAuthor === autoherName)
    }  
  }

}

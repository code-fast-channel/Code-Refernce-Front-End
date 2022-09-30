import { Injectable, Injector, ErrorHandler } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import * as StackTraceParser from 'error-stack-parser';
import { take } from 'rxjs/operators';

/**************************************************************************************
 * stack != null, Then it will handle all the angular or javascript side error and log them to server.
 * stack == null, Then the error is coming from server side and log them to server (if possibloe, for eg. if internet is available).
 **************************************************************************************/
@Injectable({
  providedIn: 'root'
})
export class AppErrorHandlerService implements ErrorHandler {

  constructor(
    private injector: Injector,
    private http: HttpClient
    ) { }
  handleError(error) {
      console.error(error)
      let errorDetails = this.addContextInfo(error)
      this.logAngularError(errorDetails)      
  }

  logAngularError(errorDetails){

    let errorObject = {
      message : errorDetails.message,
      functionName: errorDetails.stack[0]["functionName"],
      error: errorDetails,
      schoolId: null, 
      schoolBranchId: null,
      userId: null, 
      userRoleId: null
    }

    if(! this.isErrorAlreadyLogged(errorDetails.message)){
      this.http.post(environment.apiUrl + "api/errorLog/" + "logAngularError", errorObject) 
      .pipe(take(1))     
      .subscribe()
    }
  }

  addContextInfo(error) {
    // All the context details that you want (usually coming from other services; Constants, UserService...)
    const name = error.name || null;
    const appId = 'Angular App';
    const time = new Date().getTime();
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const status = error.status || null;
    const message = error.message || error.toString();
    const stack = error instanceof HttpErrorResponse ? null : StackTraceParser.parse(error);

    return {name, appId, time, url, status, message, stack};
  }

  isErrorAlreadyLogged(errorMessage: string){

    // Don't log Expression changed After It has been checked angular errors
    if(errorMessage.startsWith('ExpressionChangedAfterItHasBeenCheckedError')){
      return true;
    }

    /* On production we log the error from client side only 
      If the same error was not logged in last one hour

      And on none production environment we will save the error as soon as it will come.
    */

    if(!environment.production){
      return false
    }

    let expiryTimeinSeconds = 3600;
    let cookieMessage = "lastLoggedError="+errorMessage 

    if(document.cookie === cookieMessage){
      return true
    }
    else{
      document.cookie = cookieMessage +";max-age="+expiryTimeinSeconds
      return false
    }
  }

}

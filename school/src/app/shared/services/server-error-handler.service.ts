import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ServerErrorHandlerService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    function setupAuthHeader() {

      let authorizationHeader: any = {
        "dateTime": Date.now(),
        "currentUserRoleId": serializeMongoObjectId(localStorage.getItem("currentUserRoleId")),
        "currentUserId": serializeMongoObjectId(localStorage.getItem("currentUserId")),
        "currentSchoolId": serializeMongoObjectId(localStorage.getItem("currentSchoolId")),
        "currentSchoolBranchId": serializeMongoObjectId(localStorage.getItem("currentSchoolBranchId"))
      }

      return authorizationHeader
    }

    function serializeMongoObjectId(mongoId) {
      try {
        mongoId = JSON.parse(mongoId)
      }
      catch (ex) { }

      if (mongoId == null) {
        return null
      }
      return mongoId.$oid == undefined ? mongoId : mongoId.$oid
    }

    // Attach the authentication header to each request
    const clonedRequest = request.clone({ headers: request.headers.set('Authorization', JSON.stringify(setupAuthHeader())) });

    return next.handle(clonedRequest)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error

            console.log("*************Interceptor Client Side Section Start***********")
            console.log(error)
            console.log("------Interceptor Client Side Section Start----------")

            errorMessage = '\n\nError occured.  \n Error Code: ' + error.status;
            // errorMessage = `Error: ${error.error.message}`;
          } else {

            console.log("*************Interceptor Server Side Section Start***********")
            console.log(error)
            console.log("------Interceptor Server Side Section Start----------")

            if (navigator.onLine) {
              errorMessage = 'Unable to connect to server, please check your internet connection or try after sometime.';
            }
            else {
              errorMessage = 'You are offline, please turn on your internet connection';
            }
          }

          console.log(errorMessage)
          window.alert(errorMessage);
          return throwError(errorMessage);
        })
      )
  }
}

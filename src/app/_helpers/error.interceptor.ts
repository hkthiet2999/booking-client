import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../components/auth/services/auth-service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.authenticationService.logout()
            }

            const error = err.error.message || err.statusText
            return throwError(error);
        }))
    }
}

// The Error Interceptor intercepts http responses from the api to check if there were any errors. If there is a 401 Unauthorized or 403 Forbidden response the user is automatically logged out of the application, all other errors are re-thrown up to the calling service so an alert with the error can be displayed on the screen.

// It's implemented using the HttpInterceptor class included in the HttpClientModule, by extending the HttpInterceptor class you can create a custom interceptor to catch all error responses from the server in a single location.

// Http interceptors are added to the request pipeline in the providers section of the app.module.ts file.
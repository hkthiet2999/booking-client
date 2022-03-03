import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../components/auth/services/auth-service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const user = this.authenticationService.userValue;
        const isLoggedIn = user && user.access_token;
        const isApiUrl = request.url.startsWith(environment.API_URL);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.access_token}`
                }
            })
        }

        return next.handle(request);
    }
}

// The JWT Interceptor intercepts http requests from the application to add a JWT auth token to the Authorization header if the user is logged in and the request is to the application api url (environment.apiUrl).

// It's implemented using the HttpInterceptor class included in the HttpClientModule, by extending the HttpInterceptor class you can create a custom interceptor to modify http requests before they get sent to the server.

// Http interceptors are added to the request pipeline in the providers section of the app.module.ts file.
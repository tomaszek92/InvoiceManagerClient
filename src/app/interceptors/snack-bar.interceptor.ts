import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpStatusCode } from '../shared/http-status-code.model';

@Injectable()
export class SnackbarInterceptor implements HttpInterceptor {

    private readonly Duration: number = 3000;

    constructor(private matSnackBar: MatSnackBar) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(req)
            .pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.showSnackBar(event.status);
                    }
                }),
                catchError((error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        this.showSnackBar(error.status);
                    }
                    return throwError(error);
                })
            );
    }

    private showSnackBar(statusCode: number) {
        const snackBarConfig: MatSnackBarConfig = {
            duration: this.Duration
        };

        switch (statusCode) {
            case HttpStatusCode.Created:
                snackBarConfig.panelClass = [  'mat-toolbar', 'mat-primary' ];
                this.matSnackBar.open('Stworzono', '', snackBarConfig);
                break;
            case HttpStatusCode.NoContent:
                snackBarConfig.panelClass = [ 'mat-toolbar', 'mat-primary' ];
                this.matSnackBar.open('Zapisano', '', snackBarConfig);
                break;
            case HttpStatusCode.InternalServerError:
                snackBarConfig.panelClass = [  'mat-toolbar', 'mat-warn' ];
                this.matSnackBar.open('Wystąpił błąd, spróbuj ponwnie za chwilę', '', snackBarConfig);
                break;
            default:
                break;
        }

    }

}
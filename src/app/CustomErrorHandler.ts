import { ErrorHandler, Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    handleError(error) {
        if (Error instanceof HttpErrorResponse) {
            // we can show the error page
        }
        console.log(error)
        // If we have any log service we can use it here.
        // If we want tp log error in Db, we can do here.
    }
}
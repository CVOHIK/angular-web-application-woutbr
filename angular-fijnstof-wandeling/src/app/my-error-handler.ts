import { ErrorHandler } from '@angular/core'

export class MyErrorHandler implements ErrorHandler {
    //https://stackoverflow.com/questions/51041301/resolver-emitting-error-error-error-object-object/55793462#55793462
    handleError(error: any) {
        // console.error(Object.getOwnPropertyNames(error))
        // Object.getOwnPropertyNames(error).forEach(p => console.error(error[p]))
        console.error(error.fileName, error.lineNumber, ':', error.columnNumber, '\n', error.message, error.rejection)
    }
}

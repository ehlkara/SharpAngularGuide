import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, HttpRequest, HttpHandlerFn } from '@angular/common/http';

import { AppComponent } from './app/app.component';

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    // const req = request.clone({
    //     headers: request.headers.set('X-DEBUG', 'TESTING')
    // });
    console.log('Sending Request...');
    console.log(request);
    return next(request);
}

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(
            withInterceptors([loggingInterceptor])
        ),
    ]
}).catch((err) => console.error(err));

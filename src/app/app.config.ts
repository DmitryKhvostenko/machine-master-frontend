import { ApplicationConfig } from '@angular/core'
import { provideRouter, withComponentInputBinding } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient, withInterceptors } from '@angular/common/http'

import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

function interceptor(
	req: HttpRequest<any>,
	next: HttpHandlerFn
): Observable<HttpEvent<any>> {
	const token = localStorage.getItem('token')
	if (token) {
		const cloned = req.clone({
			headers: req.headers.set('Authorization', token),
		})
		return next(cloned)
	} else {
		return next(req)
	}
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(withInterceptors([interceptor])),
		provideAnimationsAsync(),
	],
}

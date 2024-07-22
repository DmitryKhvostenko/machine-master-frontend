import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, catchError, throwError } from 'rxjs'
import { IUserLogin, IUserLoginResponse } from '../interfaces/user.model'
@Injectable({
	providedIn: 'root',
})
export class UserService {
	private httpClient = inject(HttpClient)

	login(data: IUserLogin) {
		return this.httpClient
			.post<IUserLoginResponse>(
				`https://machine-master-backend.onrender.com/auth/login`,
				data
			)
			.pipe(
				catchError((err) => {
					console.log(err)
					return throwError(() => new Error('Password or login are incorrect'))
				})
			)
	}

	isLogin(): Observable<boolean> {
		const token = localStorage.getItem('token')
		let headers = new HttpHeaders()

		if (token) {
			headers = headers.set('Authorization', token)
		}
		return this.httpClient
			.get<boolean>(
				'https://machine-master-backend.onrender.com/auth/isLogin',
				{ headers }
			)
			.pipe(
				catchError((err) => {
					console.log(err)
					return throwError(() => new Error('Something went wrong with login'))
				})
			)
	}
}

import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { catchError, throwError } from 'rxjs'
import { IMachine } from '../interfaces/machine.model'

@Injectable({
	providedIn: 'root',
})
export class MachineService {
	private httpClient = inject(HttpClient)

	getMachines() {
		return this.httpClient
			.get<IMachine[]>(
				'https://machine-master-backend.onrender.com/machine/all'
			)
			.pipe(
				catchError((err) => {
					console.log(err)
					return throwError(
						() =>
							new Error('Something went wrong fetching the available machines')
					)
				})
			)
	}
}

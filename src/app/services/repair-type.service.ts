import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { IRepairType } from '../interfaces/repairType.model'
import { catchError, throwError } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class RepairTypeService {
	private httpClient = inject(HttpClient)

	getRepairTypes() {
		return this.httpClient
			.get<IRepairType[]>(
				'https://machine-master-backend.onrender.com/repair-types'
			)
			.pipe(
				catchError((err) => {
					console.log(err)
					return throwError(
						() =>
							new Error('Something went wrong fetching the available repair')
					)
				})
			)
	}
}

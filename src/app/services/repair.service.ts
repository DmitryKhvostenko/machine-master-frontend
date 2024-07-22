import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { IPrevRepair } from '../interfaces/prevRepair.model'
import { Observable, catchError, throwError } from 'rxjs'
import { IRepair } from '../interfaces/currentRepair.model'
import { INewRepair, IResponseRepair } from '../interfaces/newRepair.model'

@Injectable({
	providedIn: 'root',
})
export class RepairService {
	private httpClient = inject(HttpClient)

	getPrevsOfRepairs() {
		return this.httpClient
			.get<IPrevRepair[]>(
				'https://machine-master-backend.onrender.com/repair/all-prev'
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

	getRepairById(id: string) {
		return this.httpClient
			.get<IRepair>(`https://machine-master-backend.onrender.com/repair/${id}`)
			.pipe(
				catchError((err) => {
					console.log(err)
					return throwError(
						() => new Error('Something went wrong fetching the current repair')
					)
				})
			)
	}

	deleteRepair(id: string) {
		return this.httpClient
			.delete(`https://machine-master-backend.onrender.com/repair/${id}`)
			.pipe(
				catchError((err) => {
					console.log(err)
					return throwError(
						() => new Error('Something went wrong deleting current repair')
					)
				})
			)
	}

	addMachineAndRepair(newMachine: INewRepair): Observable<IResponseRepair> {
		console.log(newMachine)

		return this.httpClient
			.post<IResponseRepair>(
				'https://machine-master-backend.onrender.com/machine',
				newMachine
			)
			.pipe(
				catchError((err) => {
					console.log(err)

					return throwError(() => new Error('Failed to save new machine'))
				})
			)
	}
}

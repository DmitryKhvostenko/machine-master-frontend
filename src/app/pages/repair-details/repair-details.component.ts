import {
	Component,
	DestroyRef,
	OnInit,
	inject,
	input,
	signal,
} from '@angular/core'
import { RepairService } from '../../services/repair.service'
import { IRepair } from '../../interfaces/currentRepair.model'
import { CurrencyPipe, DatePipe } from '@angular/common'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ErrorComponent } from '../../components/error/error.component'
import { Router } from '@angular/router'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
	selector: 'app-repair-details',
	standalone: true,
	imports: [DatePipe, CurrencyPipe, MatProgressSpinnerModule],
	templateUrl: './repair-details.component.html',
	styleUrl: './repair-details.component.scss',
})
export class RepairDetailsComponent implements OnInit {
	repairInfo = signal<IRepair | undefined>(undefined)

	repairId = input.required<string>()
	private currentRepairService = inject(RepairService)
	private destroyRef = inject(DestroyRef)
	private _snackBar = inject(MatSnackBar)
	private router = inject(Router)

	isLoading = signal(true)

	ngOnInit() {
		const subscription = this.currentRepairService
			.getRepairById(this.repairId())
			.subscribe({
				next: (repair) => {
					console.log(repair)
					this.repairInfo.set(repair)
				},
				complete: () => {
					this.isLoading.set(false)
				},
				error: (err: Error) => {
					console.log(err.message)
					this._snackBar.openFromComponent(ErrorComponent, {
						duration: 5000,
						data: { textError: err.message },
					})
					this.router.navigate(['/repairs'])
				},
			})
		this.destroyRef.onDestroy(() => {
			subscription.unsubscribe()
		})
	}
}

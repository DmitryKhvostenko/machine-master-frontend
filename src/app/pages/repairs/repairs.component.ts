import {
	Component,
	DestroyRef,
	OnInit,
	computed,
	inject,
	signal,
} from '@angular/core'
import { IPrevRepair } from '../../interfaces/prevRepair.model'
import { RepairService } from '../../services/repair.service'
import { RepairCardComponent } from '../../components/repairs/repair-card/repair-card.component'
import { NewRepairComponent } from '../../components/repairs/new-repair/new-repair.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ErrorComponent } from '../../components/error/error.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
	selector: 'app-repairs',
	standalone: true,
	imports: [RepairCardComponent, NewRepairComponent, MatProgressSpinnerModule],
	templateUrl: './repairs.component.html',
	styleUrl: './repairs.component.scss',
})
export class RepairsComponent implements OnInit {
	isNewTask = signal<boolean>(false)
	private selectedFilter = signal<string>('all')
	repairService = inject(RepairService)
	private destroyRef = inject(DestroyRef)
	private _snackBar = inject(MatSnackBar)

	defaultRepair = signal<IPrevRepair[] | undefined>(undefined)
	filteredRepair = signal<IPrevRepair[] | undefined>(undefined)

	isLoading = signal(true)

	ngOnInit() {
		const subscription = this.repairService.getPrevsOfRepairs().subscribe({
			next: (repair) => {
				console.log(repair)
				this.defaultRepair.set(repair)
				this.filteredRepair.set(repair) 
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
				this.isLoading.set(false)
			},
		})

		this.destroyRef.onDestroy(() => {
			subscription.unsubscribe()
		})
	}

	repair = computed(() => {
		switch (this.selectedFilter()) {
			case 'full-repair':
				return this.filteredRepair()?.filter(
					(r) => r.repairName === 'Full repair'
				)
			case 'semi-repair':
				return this.filteredRepair()?.filter(
					(r) => r.repairName === 'Semi repair'
				)
			case 'small-bug':
				return this.filteredRepair()?.filter(
					(r) => r.repairName === 'Small bug'
				)
			case 'clean':
				return this.filteredRepair()?.filter((r) => r.repairName === 'Clean')
			default:
				return this.filteredRepair()
		}
	})

	handleDelete(id: string) {
		if (this.defaultRepair()) {
			const updatedRepair = this.defaultRepair()?.filter(
				(r) => r.repairId !== id
			)
			this.defaultRepair.set(updatedRepair)
			this.filteredRepair.set(updatedRepair)
		}
	}

	onOpenAddTask() {
		this.isNewTask.set(true)
		document.body.classList.add('no-scroll')
	}

	onCloseAddTask() {
		this.isNewTask.set(false)
		document.body.classList.remove('no-scroll')
	}

	onFilter(filter: string) {
		this.selectedFilter.set(filter)
	}

	onInputChange(value: string) {
		const originalRepairs = this.defaultRepair() || []
		const filteredRepairs = originalRepairs.filter(
			(repair) =>
				repair.brand.toLowerCase().includes(value.toLowerCase()) ||
				repair.repairId.toLowerCase().includes(value.toLowerCase())
		)
		this.filteredRepair.set(filteredRepairs)
	}
}

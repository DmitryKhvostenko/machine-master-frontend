import {
	Component,
	DestroyRef,
	EventEmitter,
	OnInit,
	Output,
	inject,
	signal,
} from '@angular/core'
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms'
import {
	INewRepair,
	IResponseRepair,
} from '../../../interfaces/newRepair.model'
import { Router } from '@angular/router'
import { RepairService } from '../../../services/repair.service'
import { RepairTypeService } from '../../../services/repair-type.service'
import { IRepairType } from '../../../interfaces/repairType.model'
import {
	MatSnackBar,
} from '@angular/material/snack-bar'
import { ErrorComponent } from '../../error/error.component'

@Component({
	selector: 'app-new-repair',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './new-repair.component.html',
	styleUrl: './new-repair.component.scss',
})
export class NewRepairComponent implements OnInit {
	@Output() closeAdd = new EventEmitter<void>()

	private router = inject(Router)
	repairService = inject(RepairService)
	repairTypeService = inject(RepairTypeService)
	destroyRef = inject(DestroyRef)
	private _snackBar = inject(MatSnackBar)
	repairTypes = signal<IRepairType[] | undefined>(undefined)

	form = new FormGroup({
		brand: new FormControl('', {
			validators: [Validators.required],
		}),
		year: new FormControl('', {
			validators: [
				Validators.required,
				Validators.min(1000),
				Validators.max(new Date().getFullYear()),
			],
		}),
		country: new FormControl('', {
			validators: [Validators.required],
		}),
		repair: new FormControl<string>(' ', {
			validators: [Validators.required],
		}),
		notes: new FormControl(''),
		startDate: new FormControl('', {
			validators: [Validators.required],
		}),
	})

	ngOnInit() {
		const subscription = this.repairTypeService.getRepairTypes().subscribe({
			next: (types) => {
				this.repairTypes.set(types)
			},
			error: (err: Error) => {
				console.log(err.message)
				this._snackBar.openFromComponent(ErrorComponent, {
					duration: 5000,
					data: { textError: err.message },
				})
			},
		})

		this.destroyRef.onDestroy(() => {
			subscription.unsubscribe()
		})
	}

	onSubmit() {
		if (this.form.invalid) {
			return
		}
		const formValue = this.form.value

		const newMachine: INewRepair = {
			brand: formValue.brand ?? '',
			year: Number(formValue.year) ?? 0,
			country: formValue.country ?? '',
			repairTypeId: formValue.repair ?? '',
			notes: formValue.notes ?? '',
			startDate: formValue.startDate ?? '',
		}
		const subscription = this.repairService
			.addMachineAndRepair(newMachine)
			.subscribe({
				next: (resData: IResponseRepair) => {
					console.log(resData)
					this.router.navigate(['/repairs', resData.repairId])
				},
				error: (err) => {
					this._snackBar.openFromComponent(ErrorComponent, {
						duration: 5000,
						data: { textError: err.message },
					})
				},
			})

		this.destroyRef.onDestroy(() => {
			subscription.unsubscribe()
		})
	}

	onCloseAddTask() {
		this.closeAdd.emit()
	}
}

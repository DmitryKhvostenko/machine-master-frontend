import { Component, DestroyRef, inject, signal } from '@angular/core'
import { MachineService } from '../../services/machine.service'
import { IMachine } from '../../interfaces/machine.model'
import { MachineCardComponent } from '../../components/machines/machine-card/machine-card.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ErrorComponent } from '../../components/error/error.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
	selector: 'app-machines',
	standalone: true,
	imports: [MachineCardComponent, MatProgressSpinnerModule],
	templateUrl: './machines.component.html',
	styleUrl: './machines.component.scss',
})
export class MachinesComponent {
	private destroyRef = inject(DestroyRef)
	defaultMachines = signal<IMachine[] | undefined>(undefined)
	machines = signal<IMachine[] | undefined>(undefined)
	machineService = inject(MachineService)
	private _snackBar = inject(MatSnackBar)
	isLoading = signal(true)
	ngOnInit() {
		const subscription = this.machineService.getMachines().subscribe({
			next: (machines) => {
				this.defaultMachines.set(machines)
				this.machines.set(machines)
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

	onInputChange(value: string) {
		const originalMachines = this.defaultMachines() || []
		console.log(originalMachines)

		const filteredMachines = originalMachines.filter(
			(machine) =>
				machine.brand.toLowerCase().includes(value.toLowerCase()) ||
				machine.country.toLowerCase().includes(value.toLowerCase()) ||
				machine.year.toString().includes(value) ||
				machine._id.toString().includes(value)
		)
		this.machines.set(filteredMachines)
	}
}

import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { RepairService } from '../../../services/repair.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-repair-card',
	standalone: true,
	imports: [RouterLink, MatIconModule],
	templateUrl: './repair-card.component.html',
	styleUrl: './repair-card.component.scss',
})
export class RepairCardComponent {
	brand = input.required<string>()
	repairName = input.required<string>()
	repairId = input.required<string>()
	repairService = inject(RepairService)
	repairDeleted = output<string>()

	private destroyRef = inject(DestroyRef)

	handleDelete() {
		const subscription = this.repairService
			.deleteRepair(this.repairId())
			.subscribe({
				next: () => {
					this.repairDeleted.emit(this.repairId())
				},
				error: (err: Error) => {
					console.log(err.message)
				},
			})
		this.destroyRef.onDestroy(() => {
			subscription.unsubscribe()
		})
	}
}

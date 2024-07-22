import { Component, Inject, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
	selector: 'app-error',
	standalone: true,
	imports: [MatIconModule],
	templateUrl: './error.component.html',
	styleUrl: './error.component.scss',
})
export class ErrorComponent {
	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { textError: string }) {}
}
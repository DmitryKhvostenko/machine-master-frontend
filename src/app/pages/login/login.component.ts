import { Component, DestroyRef, inject, output, signal } from '@angular/core'
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms'
import { UserService } from '../../services/user.service'
import { IUserLoginResponse } from '../../interfaces/user.model'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon'
import { ErrorComponent } from '../../components/error/error.component'

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	form = new FormGroup({
		email: new FormControl('', {
			validators: [Validators.required, Validators.email],
		}),
		password: new FormControl('', {
			validators: [Validators.required],
		}),
	})

	userEntered = output()
	userService = inject(UserService)
	private destroyRef = inject(DestroyRef)
	isError = signal(false)

	onSubmit() {
		if (this.form.invalid) {
			return console.log('error')
		}
		console.log(this.form)
		const subscription = this.userService
			.login({
				email: this.form.value.email!,
				password: this.form.value.password!,
			})
			.subscribe({
				next: (res: IUserLoginResponse) => {
					if (res.token) {
						localStorage.setItem('token', res.token)
						this.userEntered.emit()
					}
				},
				error: (err: Error) => {
					console.log(err.message)
					this._snackBar.openFromComponent(ErrorComponent, {
						duration: 5000,
						data: {textError: err.message}
					})
				},
			})
		this.destroyRef.onDestroy(() => {
			subscription.unsubscribe()
		})
	}

	constructor(private _snackBar: MatSnackBar) {}
}
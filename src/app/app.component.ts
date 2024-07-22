import { Component, DestroyRef, inject, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './components/header/header.component'
import { LoginComponent } from './pages/login/login.component'
import { UserService } from './services/user.service'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		HeaderComponent,
		LoginComponent,
		MatProgressSpinnerModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	isLogin = signal<boolean | null>(null)
	userService = inject(UserService)
	private destroyRef = inject(DestroyRef)
	onEnter() {
		this.isLogin.set(true)
	}

	onExit() {
		this.isLogin.set(false)
	}

	ngOnInit() {
		const subscription = this.userService.isLogin().subscribe({
			next: (res: boolean) => {
				if (res) {
					this.isLogin.set(true)
				}
			},
			error: (err: Error) => {
				this.isLogin.set(false)
			},
		})
		this.destroyRef.onDestroy(() => {
			subscription.unsubscribe()
		})
	}
}

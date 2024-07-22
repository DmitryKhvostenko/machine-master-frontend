import { Component, output } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, MatIconModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
  exit = output();
	onExit() {
		localStorage.removeItem('token')
    this.exit.emit()
	}
}

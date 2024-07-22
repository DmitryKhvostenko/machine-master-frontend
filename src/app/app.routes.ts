import { Routes } from '@angular/router'
import { MachinesComponent } from './pages/machines/machines.component'

export const routes: Routes = [
	{ path: '', redirectTo: 'machines', pathMatch: 'full' },

	{ path: 'machines', component: MachinesComponent },

	{ path: '**', redirectTo: 'machines', pathMatch: 'full' },
]

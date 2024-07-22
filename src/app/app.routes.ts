import { Routes } from '@angular/router'
import { MachinesComponent } from './pages/machines/machines.component'
import { RepairDetailsComponent } from './pages/repair-details/repair-details.component'
import { RepairsComponent } from './pages/repairs/repairs.component'


export const routes: Routes = [
	{ path: '', redirectTo: 'machines', pathMatch: 'full' },
	{ path: 'machines', component: MachinesComponent },
	{ path: 'repairs', component: RepairsComponent },
	{ path: 'repairs/:repairId', component: RepairDetailsComponent },
	{ path: '**', redirectTo: 'machines', pathMatch: 'full' },
]

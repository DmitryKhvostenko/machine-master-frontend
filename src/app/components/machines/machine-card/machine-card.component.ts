import { Component, input } from '@angular/core';
import { IMachine } from '../../../interfaces/machine.model';

@Component({
  selector: 'app-machine-card',
  standalone: true,
  imports: [],
  templateUrl: './machine-card.component.html',
  styleUrl: './machine-card.component.scss'
})
export class MachineCardComponent {
  machine = input.required<IMachine>()
}

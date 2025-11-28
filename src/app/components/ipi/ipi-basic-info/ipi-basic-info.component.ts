import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ipi-basic-info',
  standalone: false,
  templateUrl: './ipi-basic-info.component.html',
  styleUrl: './ipi-basic-info.component.css',
})
export class IpiBasicInfoComponent {
  @Input() formGroup!: FormGroup;
  @Input() workCenters: string[] = [];
  @Input() shifts: string[] = [];
  @Input() priorities: string[] = [];
  @Input() statuses: string[] = [];
}

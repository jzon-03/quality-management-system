import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ipi-summary',
  standalone: false,
  templateUrl: './ipi-summary.component.html',
  styleUrl: './ipi-summary.component.css',
})
export class IpiSummaryComponent {
  @Input() formGroup!: FormGroup;
}

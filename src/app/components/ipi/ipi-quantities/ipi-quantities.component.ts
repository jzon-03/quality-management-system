import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ipi-quantities',
  standalone: false,
  templateUrl: './ipi-quantities.component.html',
  styleUrl: './ipi-quantities.component.css',
})
export class IpiQuantitiesComponent {
  @Input() formGroup!: FormGroup;
  @Input() dispositions: string[] = [];
}

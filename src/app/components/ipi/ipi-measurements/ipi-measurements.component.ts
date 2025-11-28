import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ipi-measurements',
  standalone: false,
  templateUrl: './ipi-measurements.component.html',
  styleUrl: './ipi-measurements.component.css',
})
export class IpiMeasurementsComponent {
  @Input() formGroup!: FormGroup;
  @Input() measurementUnits: string[] = [];
  @Input() results: string[] = [];
  @Output() addMeasurement = new EventEmitter<void>();
  @Output() removeMeasurement = new EventEmitter<number>();

  get measurementsFormArray(): FormArray {
    return this.formGroup.get('measurements') as FormArray;
  }

  onAddMeasurement(): void {
    this.addMeasurement.emit();
  }

  onRemoveMeasurement(index: number): void {
    this.removeMeasurement.emit(index);
  }

  getResultColor(result: string): string {
    switch (result) {
      case 'Pass': return '#388e3c';
      case 'Fail': return '#d32f2f';
      case 'Out of Tolerance': return '#ff9800';
      default: return '#666';
    }
  }
}

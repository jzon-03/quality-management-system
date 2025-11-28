import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ipi-form',
  standalone: false,
  templateUrl: './ipi-form.component.html',
  styleUrl: './ipi-form.component.css',
})
export class IpiFormComponent {
  @Input() ipiForm!: FormGroup;
  @Input() isEditMode: boolean = false;
  @Input() activeTabIndex: number = 0;
  
  // Data arrays
  @Input() workCenters: string[] = [];
  @Input() shifts: string[] = [];
  @Input() priorities: string[] = [];
  @Input() statuses: string[] = [];
  @Input() dispositions: string[] = [];
  @Input() defectTypes: string[] = [];
  @Input() severities: string[] = [];
  @Input() measurementUnits: string[] = [];
  @Input() results: string[] = [];
  @Input() processResults: string[] = [];

  // Event emitters
  @Output() submitForm = new EventEmitter<void>();
  @Output() resetForm = new EventEmitter<void>();
  @Output() addDefect = new EventEmitter<void>();
  @Output() removeDefect = new EventEmitter<number>();
  @Output() addMeasurement = new EventEmitter<void>();
  @Output() removeMeasurement = new EventEmitter<number>();
  @Output() addVisualCheck = new EventEmitter<void>();
  @Output() removeVisualCheck = new EventEmitter<number>();
  @Output() addProcessParameter = new EventEmitter<void>();
  @Output() removeProcessParameter = new EventEmitter<number>();

  onSubmit(): void {
    this.submitForm.emit();
  }

  onResetForm(): void {
    this.resetForm.emit();
  }

  onAddDefect(): void {
    this.addDefect.emit();
  }

  onRemoveDefect(index: number): void {
    this.removeDefect.emit(index);
  }

  onAddMeasurement(): void {
    this.addMeasurement.emit();
  }

  onRemoveMeasurement(index: number): void {
    this.removeMeasurement.emit(index);
  }

  onAddVisualCheck(): void {
    this.addVisualCheck.emit();
  }

  onRemoveVisualCheck(index: number): void {
    this.removeVisualCheck.emit(index);
  }

  onAddProcessParameter(): void {
    this.addProcessParameter.emit();
  }

  onRemoveProcessParameter(index: number): void {
    this.removeProcessParameter.emit(index);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ipi-process-parameters',
  standalone: false,
  templateUrl: './ipi-process-parameters.component.html',
  styleUrl: './ipi-process-parameters.component.css',
})
export class IpiProcessParametersComponent {
  @Input() formGroup!: FormGroup;
  @Input() processResults: string[] = [];
  @Output() addProcessParameter = new EventEmitter<void>();
  @Output() removeProcessParameter = new EventEmitter<number>();

  get processParametersFormArray(): FormArray {
    return this.formGroup.get('processParameters') as FormArray;
  }

  onAddProcessParameter(): void {
    this.addProcessParameter.emit();
  }

  onRemoveProcessParameter(index: number): void {
    this.removeProcessParameter.emit(index);
  }

  getResultColor(result: string): string {
    switch (result) {
      case 'In Control': return '#388e3c';
      case 'Out of Control': return '#d32f2f';
      case 'Warning': return '#ff9800';
      default: return '#666';
    }
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ipi-visual-checks',
  standalone: false,
  templateUrl: './ipi-visual-checks.component.html',
  styleUrl: './ipi-visual-checks.component.css',
})
export class IpiVisualChecksComponent {
  @Input() formGroup!: FormGroup;
  @Input() results: string[] = [];
  @Output() addVisualCheck = new EventEmitter<void>();
  @Output() removeVisualCheck = new EventEmitter<number>();

  get visualChecksFormArray(): FormArray {
    return this.formGroup.get('visualChecks') as FormArray;
  }

  onAddVisualCheck(): void {
    this.addVisualCheck.emit();
  }

  onRemoveVisualCheck(index: number): void {
    this.removeVisualCheck.emit(index);
  }

  getResultColor(result: string): string {
    switch (result) {
      case 'Pass': return '#388e3c';
      case 'Fail': return '#d32f2f';
      case 'Acceptable': return '#388e3c';
      case 'Unacceptable': return '#d32f2f';
      default: return '#666';
    }
  }
}

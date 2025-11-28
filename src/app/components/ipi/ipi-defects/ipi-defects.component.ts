import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ipi-defects',
  standalone: false,
  templateUrl: './ipi-defects.component.html',
  styleUrl: './ipi-defects.component.css',
})
export class IpiDefectsComponent {
  @Input() formGroup!: FormGroup;
  @Input() defectTypes: string[] = [];
  @Input() severities: string[] = [];
  @Output() addDefect = new EventEmitter<void>();
  @Output() removeDefect = new EventEmitter<number>();

  get defectsFormArray(): FormArray {
    return this.formGroup.get('defects') as FormArray;
  }

  onAddDefect(): void {
    this.addDefect.emit();
  }

  onRemoveDefect(index: number): void {
    this.removeDefect.emit(index);
  }

  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'Critical': return '#d32f2f';
      case 'Major': return '#ff9800';
      case 'Minor': return '#388e3c';
      default: return '#666';
    }
  }
}

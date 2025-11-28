import { Component, Input, Output, EventEmitter } from '@angular/core';

interface IpiStatistics {
  inProgress: number;
  hold: number;
  approved: number;
  rejected: number;
  rework: number;
  firstPassYield: number;
}

@Component({
  selector: 'app-ipi-header',
  standalone: false,
  templateUrl: './ipi-header.component.html',
  styleUrl: './ipi-header.component.css',
})
export class IpiHeaderComponent {
  @Input() showForm = false;
  @Input() statistics!: IpiStatistics;
  @Output() toggleForm = new EventEmitter<void>();

  onToggleForm() {
    this.toggleForm.emit();
  }
}

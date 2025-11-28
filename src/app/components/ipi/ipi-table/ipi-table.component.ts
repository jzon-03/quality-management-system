import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ipi-table',
  standalone: false,
  templateUrl: './ipi-table.component.html',
  styleUrl: './ipi-table.component.css',
})
export class IpiTableComponent {
  @Input() records: any[] = [];
  @Input() statuses: string[] = [];
  @Input() workCenters: string[] = [];
  @Input() displayedColumns: string[] = [];
  
  statusFilter: string = '';
  workCenterFilter: string = '';

  @Output() filterChange = new EventEmitter<{status: string, workCenter: string}>();
  @Output() editRecord = new EventEmitter<any>();
  @Output() approveRecord = new EventEmitter<any>();
  @Output() rejectRecord = new EventEmitter<any>();
  @Output() holdRecord = new EventEmitter<any>();
  @Output() viewDetails = new EventEmitter<any>();
  @Output() deleteRecord = new EventEmitter<any>();

  onFilterChange(): void {
    this.filterChange.emit({
      status: this.statusFilter,
      workCenter: this.workCenterFilter
    });
  }

  onEditRecord(record: any): void {
    this.editRecord.emit(record);
  }

  onApproveRecord(record: any): void {
    this.approveRecord.emit(record);
  }

  onRejectRecord(record: any): void {
    this.rejectRecord.emit(record);
  }

  onHoldRecord(record: any): void {
    this.holdRecord.emit(record);
  }

  onViewDetails(record: any): void {
    this.viewDetails.emit(record);
  }

  onDeleteRecord(record: any): void {
    this.deleteRecord.emit(record);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'In Progress': return '#1976d2';
      case 'Hold': return '#ff9800';
      case 'Approved': return '#388e3c';
      case 'Rejected': return '#d32f2f';
      case 'Rework Required': return '#7b1fa2';
      default: return '#666';
    }
  }

  getDispositionColor(disposition: string): string {
    switch (disposition) {
      case 'Accept': return '#388e3c';
      case 'Reject': return '#d32f2f';
      case 'Rework': return '#7b1fa2';
      case 'Use As Is': return '#ff9800';
      default: return '#666';
    }
  }
}

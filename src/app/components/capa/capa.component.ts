import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface CapaRecord {
  id?: number;
  capaNumber: string;
  title: string;
  description: string;
  rootCause: string;
  correctiveAction: string;
  preventiveAction: string;
  assignedTo: string;
  dueDate: Date;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Under Review' | 'Closed' | 'Cancelled';
  source: 'Internal Audit' | 'Customer Complaint' | 'Management Review' | 'Process Monitoring' | 'Other';
  department: string;
  createdDate: Date;
  closedDate?: Date;
  effectiveness: boolean | null;
  followUpDate?: Date;
  attachments?: string[];
}

@Component({
  selector: 'app-capa',
  standalone: false,
  templateUrl: './capa.component.html',
  styleUrl: './capa.component.css',
})
export class CapaComponent implements OnInit {
  capaForm: FormGroup;
  capaRecords: CapaRecord[] = [];
  filteredRecords: CapaRecord[] = [];
  isEditMode = false;
  selectedRecord: CapaRecord | null = null;
  showForm = false;
  statusFilter = '';

  priorities = ['Low', 'Medium', 'High', 'Critical'];
  statuses = ['Open', 'In Progress', 'Under Review', 'Closed', 'Cancelled'];
  sources = ['Internal Audit', 'Customer Complaint', 'Management Review', 'Process Monitoring', 'Other'];
  departments = ['Quality', 'Production', 'Engineering', 'Purchasing', 'Sales', 'Management'];

  displayedColumns: string[] = [
    'capaNumber', 
    'title', 
    'assignedTo', 
    'dueDate', 
    'priority', 
    'status', 
    'actions'
  ];

  constructor(private fb: FormBuilder) {
    this.capaForm = this.createForm();
  }

  ngOnInit() {
    this.loadMockData();
    this.updateFilteredRecords();
  }

  createForm(): FormGroup {
    return this.fb.group({
      capaNumber: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      rootCause: ['', [Validators.required]],
      correctiveAction: ['', [Validators.required]],
      preventiveAction: [''],
      assignedTo: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      priority: ['Medium', [Validators.required]],
      status: ['Open', [Validators.required]],
      source: ['', [Validators.required]],
      department: ['', [Validators.required]],
      followUpDate: [''],
      effectiveness: [null]
    });
  }

  onSubmit() {
    if (this.capaForm.valid) {
      const formValue = this.capaForm.value;
      const capaRecord: CapaRecord = {
        ...formValue,
        id: this.isEditMode ? this.selectedRecord?.id : Date.now(),
        createdDate: this.isEditMode ? this.selectedRecord?.createdDate : new Date(),
        closedDate: formValue.status === 'Closed' ? new Date() : undefined
      };

      if (this.isEditMode && this.selectedRecord) {
        const index = this.capaRecords.findIndex(r => r.id === this.selectedRecord?.id);
        if (index !== -1) {
          this.capaRecords[index] = capaRecord;
        }
      } else {
        this.capaRecords.unshift(capaRecord);
      }

      this.updateFilteredRecords();
      this.resetForm();
    }
  }

  editRecord(record: CapaRecord) {
    this.selectedRecord = record;
    this.isEditMode = true;
    this.showForm = true;
    this.capaForm.patchValue(record);
  }

  deleteRecord(record: CapaRecord) {
    const index = this.capaRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.capaRecords.splice(index, 1);
      this.updateFilteredRecords();
    }
  }

  viewDetails(record: CapaRecord) {
    // Implementation for viewing record details
    console.log('Viewing details for:', record);
  }

  resetForm() {
    this.capaForm.reset();
    this.capaForm.patchValue({
      priority: 'Medium',
      status: 'Open'
    });
    this.isEditMode = false;
    this.selectedRecord = null;
    this.showForm = false;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  updateFilteredRecords() {
    if (!this.statusFilter) {
      this.filteredRecords = [...this.capaRecords];
    } else {
      this.filteredRecords = this.capaRecords.filter(record => 
        record.status === this.statusFilter
      );
    }
  }

  getOpenCount(): number {
    return this.capaRecords.filter(r => r.status === 'Open').length;
  }

  getInProgressCount(): number {
    return this.capaRecords.filter(r => r.status === 'In Progress').length;
  }

  getClosedCount(): number {
    return this.capaRecords.filter(r => r.status === 'Closed').length;
  }

  getOverdueCount(): number {
    const now = new Date();
    return this.capaRecords.filter(r => 
      new Date(r.dueDate) < now && r.status !== 'Closed'
    ).length;
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'Critical': return '#f44336';
      case 'High': return '#ff9800';
      case 'Medium': return '#ffeb3b';
      case 'Low': return '#4caf50';
      default: return '#9e9e9e';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Open': return '#2196f3';
      case 'In Progress': return '#ff9800';
      case 'Under Review': return '#9c27b0';
      case 'Closed': return '#4caf50';
      case 'Cancelled': return '#f44336';
      default: return '#9e9e9e';
    }
  }

  isOverdue(dueDate: Date): boolean {
    return new Date(dueDate) < new Date() && this.selectedRecord?.status !== 'Closed';
  }

  private loadMockData() {
    // Sample data for demonstration
    this.capaRecords = [
      {
        id: 1,
        capaNumber: 'CAPA-2024-001',
        title: 'Non-conforming raw material received',
        description: 'Raw material batch #RM-2024-123 does not meet specifications',
        rootCause: 'Supplier quality control process failure',
        correctiveAction: 'Return non-conforming material to supplier',
        preventiveAction: 'Implement incoming inspection checklist',
        assignedTo: 'John Smith',
        dueDate: new Date('2024-12-15'),
        priority: 'High',
        status: 'In Progress',
        source: 'Process Monitoring',
        department: 'Quality',
        createdDate: new Date('2024-11-01'),
        effectiveness: null
      },
      {
        id: 2,
        capaNumber: 'CAPA-2024-002',
        title: 'Customer complaint - product defect',
        description: 'Customer reported product malfunction in unit #12345',
        rootCause: 'Assembly process error during production',
        correctiveAction: 'Replace defective unit and investigate assembly process',
        preventiveAction: 'Update assembly work instructions and training',
        assignedTo: 'Sarah Johnson',
        dueDate: new Date('2024-12-30'),
        priority: 'Critical',
        status: 'Open',
        source: 'Customer Complaint',
        department: 'Production',
        createdDate: new Date('2024-11-15'),
        effectiveness: null
      }
    ];
  }
}

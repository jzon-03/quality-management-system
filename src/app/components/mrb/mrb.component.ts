import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface MrbRecord {
  id?: number;
  mrbNumber: string;
  title: string;
  description: string;
  partNumber: string;
  lotNumber?: string;
  quantity: number;
  unitOfMeasure: string;
  supplier?: string;
  customerOrder?: string;
  deviation: string;
  deviationType: 'Process' | 'Material' | 'Dimensional' | 'Cosmetic' | 'Documentation' | 'Other';
  severity: 'Minor' | 'Major' | 'Critical';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Submitted' | 'Under Review' | 'Board Review' | 'Approved' | 'Rejected' | 'Closed';
  disposition: 'Use As Is' | 'Rework' | 'Repair' | 'Scrap' | 'Return to Supplier' | 'Pending';
  submittedBy: string;
  submittedDate: Date;
  reviewedBy?: string;
  reviewedDate?: Date;
  boardMembers?: string[];
  boardDecision?: string;
  approvedBy?: string;
  approvedDate?: Date;
  dueDate: Date;
  estimatedCost?: number;
  actualCost?: number;
  customerNotification: boolean;
  customerApproval?: boolean;
  justification?: string;
  qualityImpact?: string;
  correctiveAction?: string;
  attachments?: string[];
  comments?: MrbComment[];
}

export interface MrbComment {
  id: number;
  author: string;
  date: Date;
  comment: string;
  type: 'Review' | 'Board' | 'General';
}

@Component({
  selector: 'app-mrb',
  standalone: false,
  templateUrl: './mrb.component.html',
  styleUrl: './mrb.component.css',
})
export class MrbComponent implements OnInit {
  mrbForm: FormGroup;
  mrbRecords: MrbRecord[] = [];
  filteredRecords: MrbRecord[] = [];
  isEditMode = false;
  selectedRecord: MrbRecord | null = null;
  showForm = false;
  statusFilter = '';
  dispositionFilter = '';

  deviationTypes = ['Process', 'Material', 'Dimensional', 'Cosmetic', 'Documentation', 'Other'];
  severities = ['Minor', 'Major', 'Critical'];
  priorities = ['Low', 'Medium', 'High', 'Critical'];
  statuses = ['Submitted', 'Under Review', 'Board Review', 'Approved', 'Rejected', 'Closed'];
  dispositions = ['Use As Is', 'Rework', 'Repair', 'Scrap', 'Return to Supplier', 'Pending'];
  unitsOfMeasure = ['EA', 'PC', 'LB', 'KG', 'FT', 'M', 'IN', 'MM', 'SQ FT', 'SQ M'];
  boardMembers = ['Quality Manager', 'Engineering Manager', 'Production Manager', 'Customer Rep', 'Supplier Rep'];

  displayedColumns: string[] = [
    'mrbNumber',
    'title',
    'partNumber',
    'quantity',
    'severity',
    'status',
    'disposition',
    'dueDate',
    'actions'
  ];

  constructor(private fb: FormBuilder) {
    this.mrbForm = this.createForm();
  }

  ngOnInit() {
    this.loadMockData();
    this.updateFilteredRecords();
  }

  createForm(): FormGroup {
    return this.fb.group({
      mrbNumber: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      partNumber: ['', [Validators.required]],
      lotNumber: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitOfMeasure: ['EA', [Validators.required]],
      supplier: [''],
      customerOrder: [''],
      deviation: ['', [Validators.required]],
      deviationType: ['', [Validators.required]],
      severity: ['Minor', [Validators.required]],
      priority: ['Medium', [Validators.required]],
      status: ['Submitted', [Validators.required]],
      disposition: ['Pending', [Validators.required]],
      submittedBy: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      estimatedCost: [0, [Validators.min(0)]],
      actualCost: [0, [Validators.min(0)]],
      customerNotification: [false],
      customerApproval: [false],
      justification: [''],
      qualityImpact: [''],
      correctiveAction: ['']
    });
  }

  onSubmit() {
    if (this.mrbForm.valid) {
      const formValue = this.mrbForm.value;
      const mrbRecord: MrbRecord = {
        ...formValue,
        id: this.isEditMode ? this.selectedRecord?.id : Date.now(),
        submittedDate: this.isEditMode ? this.selectedRecord?.submittedDate : new Date(),
        comments: this.isEditMode ? this.selectedRecord?.comments : []
      };

      if (this.isEditMode && this.selectedRecord) {
        const index = this.mrbRecords.findIndex(r => r.id === this.selectedRecord?.id);
        if (index !== -1) {
          this.mrbRecords[index] = { ...this.mrbRecords[index], ...mrbRecord };
        }
      } else {
        this.mrbRecords.unshift(mrbRecord);
      }

      this.updateFilteredRecords();
      this.resetForm();
    }
  }

  editRecord(record: MrbRecord) {
    this.selectedRecord = record;
    this.isEditMode = true;
    this.showForm = true;
    this.mrbForm.patchValue(record);
  }

  deleteRecord(record: MrbRecord) {
    const index = this.mrbRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.mrbRecords.splice(index, 1);
      this.updateFilteredRecords();
    }
  }

  approveRecord(record: MrbRecord) {
    const index = this.mrbRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.mrbRecords[index] = {
        ...this.mrbRecords[index],
        status: 'Approved',
        approvedBy: 'Current User', // In real app, get from auth service
        approvedDate: new Date()
      };
      this.updateFilteredRecords();
    }
  }

  rejectRecord(record: MrbRecord) {
    const index = this.mrbRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.mrbRecords[index] = {
        ...this.mrbRecords[index],
        status: 'Rejected',
        reviewedBy: 'Current User', // In real app, get from auth service
        reviewedDate: new Date()
      };
      this.updateFilteredRecords();
    }
  }

  viewDetails(record: MrbRecord) {
    this.selectedRecord = record;
    // Implementation for detailed view modal or navigation
    console.log('Viewing details for:', record);
  }

  addComment(record: MrbRecord, comment: string, type: 'Review' | 'Board' | 'General' = 'General') {
    const newComment: MrbComment = {
      id: Date.now(),
      author: 'Current User', // In real app, get from auth service
      date: new Date(),
      comment: comment,
      type: type
    };

    const index = this.mrbRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      if (!this.mrbRecords[index].comments) {
        this.mrbRecords[index].comments = [];
      }
      this.mrbRecords[index].comments!.push(newComment);
    }
  }

  resetForm() {
    this.mrbForm.reset();
    this.mrbForm.patchValue({
      unitOfMeasure: 'EA',
      severity: 'Minor',
      priority: 'Medium',
      status: 'Submitted',
      disposition: 'Pending',
      quantity: 1,
      estimatedCost: 0,
      actualCost: 0,
      customerNotification: false,
      customerApproval: false
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
    let filtered = [...this.mrbRecords];

    if (this.statusFilter) {
      filtered = filtered.filter(record => record.status === this.statusFilter);
    }

    if (this.dispositionFilter) {
      filtered = filtered.filter(record => record.disposition === this.dispositionFilter);
    }

    this.filteredRecords = filtered;
  }

  // Statistics methods
  getSubmittedCount(): number {
    return this.mrbRecords.filter(r => r.status === 'Submitted').length;
  }

  getUnderReviewCount(): number {
    return this.mrbRecords.filter(r => r.status === 'Under Review').length;
  }

  getBoardReviewCount(): number {
    return this.mrbRecords.filter(r => r.status === 'Board Review').length;
  }

  getApprovedCount(): number {
    return this.mrbRecords.filter(r => r.status === 'Approved').length;
  }

  getOverdueCount(): number {
    const now = new Date();
    return this.mrbRecords.filter(r => 
      new Date(r.dueDate) < now && 
      !['Approved', 'Rejected', 'Closed'].includes(r.status)
    ).length;
  }

  getTotalEstimatedCost(): number {
    return this.mrbRecords.reduce((total, record) => total + (record.estimatedCost || 0), 0);
  }

  // Color coding methods
  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'Critical': return '#f44336';
      case 'Major': return '#ff9800';
      case 'Minor': return '#4caf50';
      default: return '#9e9e9e';
    }
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
      case 'Submitted': return '#2196f3';
      case 'Under Review': return '#ff9800';
      case 'Board Review': return '#9c27b0';
      case 'Approved': return '#4caf50';
      case 'Rejected': return '#f44336';
      case 'Closed': return '#607d8b';
      default: return '#9e9e9e';
    }
  }

  getDispositionColor(disposition: string): string {
    switch (disposition) {
      case 'Use As Is': return '#4caf50';
      case 'Rework': return '#ff9800';
      case 'Repair': return '#2196f3';
      case 'Scrap': return '#f44336';
      case 'Return to Supplier': return '#9c27b0';
      case 'Pending': return '#607d8b';
      default: return '#9e9e9e';
    }
  }

  isOverdue(dueDate: Date, status: string): boolean {
    return new Date(dueDate) < new Date() && 
           !['Approved', 'Rejected', 'Closed'].includes(status);
  }

  private loadMockData() {
    this.mrbRecords = [
      {
        id: 1,
        mrbNumber: 'MRB-2024-001',
        title: 'Surface finish deviation on machined part',
        description: 'Surface roughness exceeds specification requirement of 32 Ra',
        partNumber: 'PN-12345-A',
        lotNumber: 'LOT-2024-098',
        quantity: 50,
        unitOfMeasure: 'EA',
        supplier: 'ABC Machining Co.',
        customerOrder: 'CO-2024-156',
        deviation: 'Surface roughness measured at 45 Ra instead of specified 32 Ra maximum',
        deviationType: 'Process',
        severity: 'Minor',
        priority: 'Medium',
        status: 'Under Review',
        disposition: 'Pending',
        submittedBy: 'John Smith',
        submittedDate: new Date('2024-11-20'),
        dueDate: new Date('2024-12-05'),
        estimatedCost: 2500,
        customerNotification: true,
        customerApproval: false,
        justification: 'Functional performance not affected, cosmetic issue only',
        qualityImpact: 'No impact on functionality or performance',
        comments: [
          {
            id: 1,
            author: 'Quality Manager',
            date: new Date('2024-11-21'),
            comment: 'Part function not affected by surface finish variance',
            type: 'Review'
          }
        ]
      },
      {
        id: 2,
        mrbNumber: 'MRB-2024-002',
        title: 'Dimensional non-conformance in bracket assembly',
        description: 'Hole diameter out of tolerance in mounting bracket',
        partNumber: 'PN-67890-B',
        lotNumber: 'LOT-2024-099',
        quantity: 25,
        unitOfMeasure: 'EA',
        supplier: 'XYZ Manufacturing',
        customerOrder: 'CO-2024-157',
        deviation: 'Hole diameter 10.2mm instead of 10.0 ±0.1mm specification',
        deviationType: 'Dimensional',
        severity: 'Major',
        priority: 'High',
        status: 'Board Review',
        disposition: 'Rework',
        submittedBy: 'Sarah Johnson',
        submittedDate: new Date('2024-11-18'),
        dueDate: new Date('2024-12-01'),
        estimatedCost: 5000,
        actualCost: 4800,
        customerNotification: true,
        customerApproval: true,
        justification: 'Rework will restore part to full specification compliance',
        qualityImpact: 'Assembly interference potential, requires rework',
        correctiveAction: 'Review machining program and tooling setup',
        comments: []
      }
    ];
  }
}

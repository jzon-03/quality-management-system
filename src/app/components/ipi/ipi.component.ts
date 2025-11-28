import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

export interface IpiRecord {
  id?: number;
  inspectionNumber: string;
  workOrder: string;
  partNumber: string;
  partName: string;
  revision: string;
  operation: string;
  operationSequence: number;
  lotNumber?: string;
  quantity: number;
  inspectedQuantity: number;
  acceptedQuantity: number;
  rejectedQuantity: number;
  reworkQuantity: number;
  inspector: string;
  inspectionDate: Date;
  shift: 'Day' | 'Night' | 'Weekend';
  workCenter: string;
  operator: string;
  machine: string;
  tooling: string;
  status: 'In Progress' | 'Hold' | 'Approved' | 'Rejected' | 'Rework Required';
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  defects: IpiDefect[];
  measurements: IpiMeasurement[];
  visualChecks: IpiVisualCheck[];
  processParameters: IpiProcessParameter[];
  notes?: string;
  nextOperation?: string;
  disposition: 'Accept' | 'Reject' | 'Rework' | 'Hold' | 'Pending';
  customerNotification: boolean;
  qualityAlert: boolean;
  submittedBy: string;
  submittedDate: Date;
  reviewedBy?: string;
  reviewedDate?: Date;
  attachments?: string[];
}

export interface IpiDefect {
  id: number;
  defectType: string;
  description: string;
  quantity: number;
  severity: 'Minor' | 'Major' | 'Critical';
  location: string;
  cause?: string;
  correctionRequired: boolean;
}

export interface IpiMeasurement {
  id: number;
  characteristic: string;
  specification: string;
  nominalValue: number;
  tolerance: string;
  actualValue: number;
  unit: string;
  instrument: string;
  result: 'Pass' | 'Fail' | 'Warning';
  notes?: string;
}

export interface IpiVisualCheck {
  id: number;
  checkPoint: string;
  requirement: string;
  result: 'Pass' | 'Fail' | 'N/A';
  notes?: string;
}

export interface IpiProcessParameter {
  id: number;
  parameter: string;
  specification: string;
  actualValue: string;
  unit: string;
  result: 'Within Spec' | 'Out of Spec' | 'Warning';
  notes?: string;
}

@Component({
  selector: 'app-ipi',
  standalone: false,
  templateUrl: './ipi.component.html',
  styleUrl: './ipi.component.css',
})
export class IpiComponent implements OnInit {
  ipiForm: FormGroup;
  ipiRecords: IpiRecord[] = [];
  filteredRecords: IpiRecord[] = [];
  isEditMode = false;
  selectedRecord: IpiRecord | null = null;
  showForm = false;
  activeTabIndex = 0;
  statusFilter = '';
  workCenterFilter = '';

  shifts = ['Day', 'Night', 'Weekend'];
  statuses = ['In Progress', 'Hold', 'Approved', 'Rejected', 'Rework Required'];
  priorities = ['Low', 'Normal', 'High', 'Urgent'];
  dispositions = ['Accept', 'Reject', 'Rework', 'Hold', 'Pending'];
  severities = ['Minor', 'Major', 'Critical'];
  results = ['Pass', 'Fail', 'Warning', 'N/A'];
  processResults = ['Within Spec', 'Out of Spec', 'Warning'];
  measurementUnits = ['mm', 'in', 'µm', 'µin', 'degrees', '%', 'lbs', 'kg'];
  defectTypes = [
    'Dimensional', 'Surface Finish', 'Burr/Sharp Edge', 'Crack', 'Inclusion', 
    'Porosity', 'Contamination', 'Missing Feature', 'Wrong Material', 'Tool Mark'
  ];
  workCenters = ['WC-100', 'WC-200', 'WC-300', 'WC-400', 'WC-500'];

  displayedColumns: string[] = [
    'inspectionNumber',
    'partNumber',
    'operation',
    'quantity',
    'status',
    'disposition',
    'inspector',
    'inspectionDate',
    'actions'
  ];

  constructor(private fb: FormBuilder) {
    this.ipiForm = this.createForm();
  }

  ngOnInit() {
    this.loadMockData();
    this.updateFilteredRecords();
  }

  createForm(): FormGroup {
    return this.fb.group({
      inspectionNumber: ['', [Validators.required]],
      workOrder: ['', [Validators.required]],
      partNumber: ['', [Validators.required]],
      partName: ['', [Validators.required]],
      revision: ['', [Validators.required]],
      operation: ['', [Validators.required]],
      operationSequence: [1, [Validators.required, Validators.min(1)]],
      lotNumber: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      inspectedQuantity: [1, [Validators.required, Validators.min(0)]],
      acceptedQuantity: [0, [Validators.min(0)]],
      rejectedQuantity: [0, [Validators.min(0)]],
      reworkQuantity: [0, [Validators.min(0)]],
      inspector: ['', [Validators.required]],
      inspectionDate: ['', [Validators.required]],
      shift: ['Day', [Validators.required]],
      workCenter: ['', [Validators.required]],
      operator: ['', [Validators.required]],
      machine: [''],
      tooling: [''],
      status: ['In Progress', [Validators.required]],
      priority: ['Normal', [Validators.required]],
      notes: [''],
      nextOperation: [''],
      disposition: ['Pending', [Validators.required]],
      customerNotification: [false],
      qualityAlert: [false],
      submittedBy: ['', [Validators.required]],
      defects: this.fb.array([]),
      measurements: this.fb.array([]),
      visualChecks: this.fb.array([]),
      processParameters: this.fb.array([])
    });
  }

  // Form Array Getters
  get defects() {
    return this.ipiForm.get('defects') as FormArray;
  }

  get measurements() {
    return this.ipiForm.get('measurements') as FormArray;
  }

  get visualChecks() {
    return this.ipiForm.get('visualChecks') as FormArray;
  }

  get processParameters() {
    return this.ipiForm.get('processParameters') as FormArray;
  }

  // Defect Management
  addDefect() {
    const defectForm = this.fb.group({
      defectType: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      severity: ['Minor', Validators.required],
      location: ['', Validators.required],
      cause: [''],
      correctionRequired: [false]
    });
    this.defects.push(defectForm);
  }

  removeDefect(index: number) {
    this.defects.removeAt(index);
  }

  // Measurement Management
  addMeasurement() {
    const measurementForm = this.fb.group({
      characteristic: ['', Validators.required],
      specification: ['', Validators.required],
      nominalValue: [0, [Validators.required]],
      tolerance: ['', Validators.required],
      actualValue: [0, [Validators.required]],
      unit: ['mm', Validators.required],
      instrument: ['', Validators.required],
      result: ['Pass', Validators.required],
      notes: ['']
    });
    this.measurements.push(measurementForm);
  }

  removeMeasurement(index: number) {
    this.measurements.removeAt(index);
  }

  // Visual Check Management
  addVisualCheck() {
    const visualForm = this.fb.group({
      checkPoint: ['', Validators.required],
      requirement: ['', Validators.required],
      result: ['Pass', Validators.required],
      notes: ['']
    });
    this.visualChecks.push(visualForm);
  }

  removeVisualCheck(index: number) {
    this.visualChecks.removeAt(index);
  }

  // Process Parameter Management
  addProcessParameter() {
    const parameterForm = this.fb.group({
      parameter: ['', Validators.required],
      specification: ['', Validators.required],
      actualValue: ['', Validators.required],
      unit: ['', Validators.required],
      result: ['Within Spec', Validators.required],
      notes: ['']
    });
    this.processParameters.push(parameterForm);
  }

  removeProcessParameter(index: number) {
    this.processParameters.removeAt(index);
  }

  onSubmit() {
    if (this.ipiForm.valid) {
      const formValue = this.ipiForm.value;
      const ipiRecord: IpiRecord = {
        ...formValue,
        id: this.isEditMode ? this.selectedRecord?.id : Date.now(),
        submittedDate: this.isEditMode ? this.selectedRecord?.submittedDate : new Date(),
        defects: formValue.defects.map((defect: any, index: number) => ({ ...defect, id: index + 1 })),
        measurements: formValue.measurements.map((measurement: any, index: number) => ({ ...measurement, id: index + 1 })),
        visualChecks: formValue.visualChecks.map((check: any, index: number) => ({ ...check, id: index + 1 })),
        processParameters: formValue.processParameters.map((param: any, index: number) => ({ ...param, id: index + 1 }))
      };

      if (this.isEditMode && this.selectedRecord) {
        const index = this.ipiRecords.findIndex(r => r.id === this.selectedRecord?.id);
        if (index !== -1) {
          this.ipiRecords[index] = ipiRecord;
        }
      } else {
        this.ipiRecords.unshift(ipiRecord);
      }

      this.updateFilteredRecords();
      this.resetForm();
    }
  }

  editRecord(record: IpiRecord) {
    this.selectedRecord = record;
    this.isEditMode = true;
    this.showForm = true;
    
    // Clear existing form arrays
    this.clearFormArrays();

    // Populate form arrays
    record.defects?.forEach(defect => {
      const defectForm = this.fb.group(defect);
      this.defects.push(defectForm);
    });

    record.measurements?.forEach(measurement => {
      const measurementForm = this.fb.group(measurement);
      this.measurements.push(measurementForm);
    });

    record.visualChecks?.forEach(check => {
      const checkForm = this.fb.group(check);
      this.visualChecks.push(checkForm);
    });

    record.processParameters?.forEach(param => {
      const paramForm = this.fb.group(param);
      this.processParameters.push(paramForm);
    });

    this.ipiForm.patchValue(record);
  }

  deleteRecord(record: IpiRecord) {
    const index = this.ipiRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.ipiRecords.splice(index, 1);
      this.updateFilteredRecords();
    }
  }

  approveRecord(record: IpiRecord) {
    const index = this.ipiRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.ipiRecords[index] = {
        ...this.ipiRecords[index],
        status: 'Approved',
        disposition: 'Accept',
        reviewedBy: 'Current User',
        reviewedDate: new Date()
      };
      this.updateFilteredRecords();
    }
  }

  rejectRecord(record: IpiRecord) {
    const index = this.ipiRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.ipiRecords[index] = {
        ...this.ipiRecords[index],
        status: 'Rejected',
        disposition: 'Reject'
      };
      this.updateFilteredRecords();
    }
  }

  holdRecord(record: IpiRecord) {
    const index = this.ipiRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.ipiRecords[index] = {
        ...this.ipiRecords[index],
        status: 'Hold',
        disposition: 'Hold'
      };
      this.updateFilteredRecords();
    }
  }

  viewDetails(record: IpiRecord) {
    this.selectedRecord = record;
    console.log('Viewing details for:', record);
  }

  resetForm() {
    this.ipiForm.reset();
    this.ipiForm.patchValue({
      shift: 'Day',
      status: 'In Progress',
      priority: 'Normal',
      disposition: 'Pending',
      quantity: 1,
      inspectedQuantity: 1,
      acceptedQuantity: 0,
      rejectedQuantity: 0,
      reworkQuantity: 0,
      operationSequence: 1,
      customerNotification: false,
      qualityAlert: false
    });

    this.clearFormArrays();
    this.isEditMode = false;
    this.selectedRecord = null;
    this.showForm = false;
    this.activeTabIndex = 0;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  private clearFormArrays() {
    while (this.defects.length !== 0) {
      this.defects.removeAt(0);
    }
    while (this.measurements.length !== 0) {
      this.measurements.removeAt(0);
    }
    while (this.visualChecks.length !== 0) {
      this.visualChecks.removeAt(0);
    }
    while (this.processParameters.length !== 0) {
      this.processParameters.removeAt(0);
    }
  }

  updateFilteredRecords() {
    let filtered = [...this.ipiRecords];

    if (this.statusFilter) {
      filtered = filtered.filter(record => record.status === this.statusFilter);
    }

    if (this.workCenterFilter) {
      filtered = filtered.filter(record => record.workCenter === this.workCenterFilter);
    }

    this.filteredRecords = filtered;
  }

  // Statistics methods
  getInProgressCount(): number {
    return this.ipiRecords.filter(r => r.status === 'In Progress').length;
  }

  getHoldCount(): number {
    return this.ipiRecords.filter(r => r.status === 'Hold').length;
  }

  getApprovedCount(): number {
    return this.ipiRecords.filter(r => r.status === 'Approved').length;
  }

  getRejectedCount(): number {
    return this.ipiRecords.filter(r => r.status === 'Rejected').length;
  }

  getReworkCount(): number {
    return this.ipiRecords.filter(r => r.status === 'Rework Required').length;
  }

  getTotalDefects(): number {
    return this.ipiRecords.reduce((total, record) => 
      total + (record.defects?.reduce((defectTotal, defect) => defectTotal + defect.quantity, 0) || 0), 0
    );
  }

  // Quality metrics
  calculateFirstPassYield(): number {
    const totalInspected = this.ipiRecords.reduce((total, record) => total + record.inspectedQuantity, 0);
    const totalAccepted = this.ipiRecords.reduce((total, record) => total + record.acceptedQuantity, 0);
    return totalInspected > 0 ? Math.round((totalAccepted / totalInspected) * 100) : 0;
  }

  // Color coding methods
  getStatusColor(status: string): string {
    switch (status) {
      case 'In Progress': return '#2196f3';
      case 'Hold': return '#ff9800';
      case 'Approved': return '#4caf50';
      case 'Rejected': return '#f44336';
      case 'Rework Required': return '#9c27b0';
      default: return '#9e9e9e';
    }
  }

  getDispositionColor(disposition: string): string {
    switch (disposition) {
      case 'Accept': return '#4caf50';
      case 'Reject': return '#f44336';
      case 'Rework': return '#ff9800';
      case 'Hold': return '#9c27b0';
      case 'Pending': return '#607d8b';
      default: return '#9e9e9e';
    }
  }

  getResultColor(result: string): string {
    switch (result) {
      case 'Pass':
      case 'Within Spec': return '#4caf50';
      case 'Fail':
      case 'Out of Spec': return '#f44336';
      case 'Warning': return '#ff9800';
      case 'N/A': return '#9e9e9e';
      default: return '#607d8b';
    }
  }

  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'Critical': return '#f44336';
      case 'Major': return '#ff9800';
      case 'Minor': return '#4caf50';
      default: return '#9e9e9e';
    }
  }

  private loadMockData() {
    this.ipiRecords = [
      {
        id: 1,
        inspectionNumber: 'IPI-2024-001',
        workOrder: 'WO-2024-156',
        partNumber: 'PN-12345-A',
        partName: 'Main Housing',
        revision: 'C',
        operation: 'CNC Machining',
        operationSequence: 20,
        lotNumber: 'LOT-2024-098',
        quantity: 50,
        inspectedQuantity: 50,
        acceptedQuantity: 48,
        rejectedQuantity: 2,
        reworkQuantity: 0,
        inspector: 'John Smith',
        inspectionDate: new Date('2024-11-25'),
        shift: 'Day',
        workCenter: 'WC-200',
        operator: 'Mike Johnson',
        machine: 'CNC Mill M-100',
        tooling: 'Fixture F-123',
        status: 'Approved',
        priority: 'Normal',
        defects: [
          {
            id: 1,
            defectType: 'Dimensional',
            description: 'Hole diameter slightly undersized',
            quantity: 2,
            severity: 'Minor',
            location: 'Mounting holes',
            cause: 'Tool wear',
            correctionRequired: true
          }
        ],
        measurements: [
          {
            id: 1,
            characteristic: 'Overall Length',
            specification: '100.0 ± 0.1',
            nominalValue: 100.0,
            tolerance: '± 0.1',
            actualValue: 99.98,
            unit: 'mm',
            instrument: 'CMM',
            result: 'Pass'
          }
        ],
        visualChecks: [
          {
            id: 1,
            checkPoint: 'Surface Finish',
            requirement: 'No visible tool marks',
            result: 'Pass'
          }
        ],
        processParameters: [
          {
            id: 1,
            parameter: 'Spindle Speed',
            specification: '3000 ± 100 RPM',
            actualValue: '2980',
            unit: 'RPM',
            result: 'Within Spec'
          }
        ],
        notes: 'Minor dimensional issue resolved by tool change',
        nextOperation: 'Assembly',
        disposition: 'Accept',
        customerNotification: false,
        qualityAlert: false,
        submittedBy: 'Quality Inspector',
        submittedDate: new Date('2024-11-25'),
        reviewedBy: 'QC Supervisor',
        reviewedDate: new Date('2024-11-25'),
        attachments: []
      },
      {
        id: 2,
        inspectionNumber: 'IPI-2024-002',
        workOrder: 'WO-2024-157',
        partNumber: 'PN-67890-B',
        partName: 'Support Bracket',
        revision: 'A',
        operation: 'Welding',
        operationSequence: 30,
        quantity: 25,
        inspectedQuantity: 25,
        acceptedQuantity: 23,
        rejectedQuantity: 0,
        reworkQuantity: 2,
        inspector: 'Sarah Wilson',
        inspectionDate: new Date('2024-11-26'),
        shift: 'Day',
        workCenter: 'WC-300',
        operator: 'Tom Brown',
        machine: 'Welding Station W-200',
        tooling: 'Welding Jig WJ-456',
        status: 'In Progress',
        priority: 'High',
        defects: [],
        measurements: [],
        visualChecks: [],
        processParameters: [],
        notes: 'Welding inspection in progress',
        nextOperation: 'Heat Treatment',
        disposition: 'Pending',
        customerNotification: false,
        qualityAlert: false,
        submittedBy: 'Quality Inspector',
        submittedDate: new Date('2024-11-26'),
        attachments: []
      }
    ];
  }
}

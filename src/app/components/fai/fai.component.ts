import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

export interface FaiRecord {
  id?: number;
  faiNumber: string;
  partNumber: string;
  partName: string;
  revision: string;
  lotNumber?: string;
  serialNumber?: string;
  drawingNumber: string;
  drawingRevision: string;
  workOrder: string;
  customer: string;
  program: string;
  reason: 'Initial Production' | 'Process Change' | 'Tool Change' | 'Material Change' | 'Facility Change' | 'Supplier Change';
  productionMethod: 'Production' | 'Prototype' | 'Pre-Production';
  status: 'In Progress' | 'Pending Review' | 'Approved' | 'Rejected' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  inspectorName: string;
  inspectionDate: Date;
  dueDate: Date;
  manufacturingProcess: string;
  toolingUsed: string;
  equipmentUsed: string;
  materialCertification: boolean;
  processDocumentation: boolean;
  calibrationRecords: boolean;
  dimensions: FaiDimension[];
  functionalTests: FaiTest[];
  materialTests: FaiTest[];
  surfaceFinish: FaiSurfaceFinish[];
  notes?: string;
  disposition: 'Accept' | 'Accept with Deviation' | 'Reject' | 'Pending';
  customerApproval?: boolean;
  approvedBy?: string;
  approvedDate?: Date;
  submittedBy: string;
  submittedDate: Date;
  attachments?: string[];
}

export interface FaiDimension {
  id: number;
  characteristic: string;
  specification: string;
  tolerance: string;
  actualValue: number;
  unit: string;
  method: string;
  result: 'Pass' | 'Fail' | 'N/A';
  notes?: string;
}

export interface FaiTest {
  id: number;
  testName: string;
  specification: string;
  procedure: string;
  actualResult: string;
  result: 'Pass' | 'Fail' | 'N/A';
  equipment?: string;
  notes?: string;
}

export interface FaiSurfaceFinish {
  id: number;
  surface: string;
  specification: string;
  actualValue: number;
  unit: string;
  result: 'Pass' | 'Fail' | 'N/A';
  notes?: string;
}

@Component({
  selector: 'app-fai',
  standalone: false,
  templateUrl: './fai.component.html',
  styleUrl: './fai.component.css',
})
export class FaiComponent implements OnInit {
  faiForm: FormGroup;
  faiRecords: FaiRecord[] = [];
  filteredRecords: FaiRecord[] = [];
  isEditMode = false;
  selectedRecord: FaiRecord | null = null;
  showForm = false;
  activeTab = 'basic';
  activeTabIndex = 0;
  statusFilter = '';

  reasons = ['Initial Production', 'Process Change', 'Tool Change', 'Material Change', 'Facility Change', 'Supplier Change'];
  productionMethods = ['Production', 'Prototype', 'Pre-Production'];
  statuses = ['In Progress', 'Pending Review', 'Approved', 'Rejected', 'Closed'];
  priorities = ['Low', 'Medium', 'High', 'Critical'];
  dispositions = ['Accept', 'Accept with Deviation', 'Reject', 'Pending'];
  measurementUnits = ['mm', 'in', 'µm', 'µin', 'degrees', '%'];
  testResults = ['Pass', 'Fail', 'N/A'];

  displayedColumns: string[] = [
    'faiNumber',
    'partNumber',
    'customer',
    'reason',
    'status',
    'disposition',
    'dueDate',
    'actions'
  ];

  constructor(private fb: FormBuilder) {
    this.faiForm = this.createForm();
  }

  ngOnInit() {
    this.loadMockData();
    this.updateFilteredRecords();
  }

  createForm(): FormGroup {
    return this.fb.group({
      faiNumber: ['', [Validators.required]],
      partNumber: ['', [Validators.required]],
      partName: ['', [Validators.required]],
      revision: ['', [Validators.required]],
      lotNumber: [''],
      serialNumber: [''],
      drawingNumber: ['', [Validators.required]],
      drawingRevision: ['', [Validators.required]],
      workOrder: ['', [Validators.required]],
      customer: ['', [Validators.required]],
      program: [''],
      reason: ['', [Validators.required]],
      productionMethod: ['Production', [Validators.required]],
      status: ['In Progress', [Validators.required]],
      priority: ['Medium', [Validators.required]],
      inspectorName: ['', [Validators.required]],
      inspectionDate: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      manufacturingProcess: ['', [Validators.required]],
      toolingUsed: [''],
      equipmentUsed: [''],
      materialCertification: [false],
      processDocumentation: [false],
      calibrationRecords: [false],
      notes: [''],
      disposition: ['Pending', [Validators.required]],
      customerApproval: [false],
      submittedBy: ['', [Validators.required]],
      dimensions: this.fb.array([]),
      functionalTests: this.fb.array([]),
      materialTests: this.fb.array([]),
      surfaceFinish: this.fb.array([])
    });
  }

  // Form Array Getters
  get dimensions() {
    return this.faiForm.get('dimensions') as FormArray;
  }

  get functionalTests() {
    return this.faiForm.get('functionalTests') as FormArray;
  }

  get materialTests() {
    return this.faiForm.get('materialTests') as FormArray;
  }

  get surfaceFinish() {
    return this.faiForm.get('surfaceFinish') as FormArray;
  }

  // Dimension Management
  addDimension() {
    const dimensionForm = this.fb.group({
      characteristic: ['', Validators.required],
      specification: ['', Validators.required],
      tolerance: ['', Validators.required],
      actualValue: [0, [Validators.required, Validators.min(0)]],
      unit: ['mm', Validators.required],
      method: ['', Validators.required],
      result: ['Pass', Validators.required],
      notes: ['']
    });
    this.dimensions.push(dimensionForm);
  }

  removeDimension(index: number) {
    this.dimensions.removeAt(index);
  }

  // Functional Test Management
  addFunctionalTest() {
    const testForm = this.fb.group({
      testName: ['', Validators.required],
      specification: ['', Validators.required],
      procedure: ['', Validators.required],
      actualResult: ['', Validators.required],
      result: ['Pass', Validators.required],
      equipment: [''],
      notes: ['']
    });
    this.functionalTests.push(testForm);
  }

  removeFunctionalTest(index: number) {
    this.functionalTests.removeAt(index);
  }

  // Material Test Management
  addMaterialTest() {
    const testForm = this.fb.group({
      testName: ['', Validators.required],
      specification: ['', Validators.required],
      procedure: ['', Validators.required],
      actualResult: ['', Validators.required],
      result: ['Pass', Validators.required],
      equipment: [''],
      notes: ['']
    });
    this.materialTests.push(testForm);
  }

  removeMaterialTest(index: number) {
    this.materialTests.removeAt(index);
  }

  // Surface Finish Management
  addSurfaceFinish() {
    const surfaceForm = this.fb.group({
      surface: ['', Validators.required],
      specification: ['', Validators.required],
      actualValue: [0, [Validators.required, Validators.min(0)]],
      unit: ['µm', Validators.required],
      result: ['Pass', Validators.required],
      notes: ['']
    });
    this.surfaceFinish.push(surfaceForm);
  }

  removeSurfaceFinish(index: number) {
    this.surfaceFinish.removeAt(index);
  }

  onSubmit() {
    if (this.faiForm.valid) {
      const formValue = this.faiForm.value;
      const faiRecord: FaiRecord = {
        ...formValue,
        id: this.isEditMode ? this.selectedRecord?.id : Date.now(),
        submittedDate: this.isEditMode ? this.selectedRecord?.submittedDate : new Date(),
        dimensions: formValue.dimensions.map((dim: any, index: number) => ({ ...dim, id: index + 1 })),
        functionalTests: formValue.functionalTests.map((test: any, index: number) => ({ ...test, id: index + 1 })),
        materialTests: formValue.materialTests.map((test: any, index: number) => ({ ...test, id: index + 1 })),
        surfaceFinish: formValue.surfaceFinish.map((surface: any, index: number) => ({ ...surface, id: index + 1 }))
      };

      if (this.isEditMode && this.selectedRecord) {
        const index = this.faiRecords.findIndex(r => r.id === this.selectedRecord?.id);
        if (index !== -1) {
          this.faiRecords[index] = faiRecord;
        }
      } else {
        this.faiRecords.unshift(faiRecord);
      }

      this.updateFilteredRecords();
      this.resetForm();
    }
  }

  editRecord(record: FaiRecord) {
    this.selectedRecord = record;
    this.isEditMode = true;
    this.showForm = true;
    
    // Clear existing form arrays
    while (this.dimensions.length !== 0) {
      this.dimensions.removeAt(0);
    }
    while (this.functionalTests.length !== 0) {
      this.functionalTests.removeAt(0);
    }
    while (this.materialTests.length !== 0) {
      this.materialTests.removeAt(0);
    }
    while (this.surfaceFinish.length !== 0) {
      this.surfaceFinish.removeAt(0);
    }

    // Populate form arrays
    record.dimensions?.forEach(dim => {
      const dimensionForm = this.fb.group(dim);
      this.dimensions.push(dimensionForm);
    });

    record.functionalTests?.forEach(test => {
      const testForm = this.fb.group(test);
      this.functionalTests.push(testForm);
    });

    record.materialTests?.forEach(test => {
      const testForm = this.fb.group(test);
      this.materialTests.push(testForm);
    });

    record.surfaceFinish?.forEach(surface => {
      const surfaceForm = this.fb.group(surface);
      this.surfaceFinish.push(surfaceForm);
    });

    this.faiForm.patchValue(record);
  }

  deleteRecord(record: FaiRecord) {
    const index = this.faiRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.faiRecords.splice(index, 1);
      this.updateFilteredRecords();
    }
  }

  approveRecord(record: FaiRecord) {
    const index = this.faiRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.faiRecords[index] = {
        ...this.faiRecords[index],
        status: 'Approved',
        disposition: 'Accept',
        approvedBy: 'Current User',
        approvedDate: new Date()
      };
      this.updateFilteredRecords();
    }
  }

  rejectRecord(record: FaiRecord) {
    const index = this.faiRecords.findIndex(r => r.id === record.id);
    if (index !== -1) {
      this.faiRecords[index] = {
        ...this.faiRecords[index],
        status: 'Rejected',
        disposition: 'Reject'
      };
      this.updateFilteredRecords();
    }
  }

  viewDetails(record: FaiRecord) {
    this.selectedRecord = record;
    console.log('Viewing details for:', record);
  }

  resetForm() {
    this.faiForm.reset();
    this.faiForm.patchValue({
      productionMethod: 'Production',
      status: 'In Progress',
      priority: 'Medium',
      disposition: 'Pending',
      materialCertification: false,
      processDocumentation: false,
      calibrationRecords: false,
      customerApproval: false
    });

    // Clear form arrays
    while (this.dimensions.length !== 0) {
      this.dimensions.removeAt(0);
    }
    while (this.functionalTests.length !== 0) {
      this.functionalTests.removeAt(0);
    }
    while (this.materialTests.length !== 0) {
      this.materialTests.removeAt(0);
    }
    while (this.surfaceFinish.length !== 0) {
      this.surfaceFinish.removeAt(0);
    }

    this.isEditMode = false;
    this.selectedRecord = null;
    this.showForm = false;
    this.activeTab = 'basic';
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  updateFilteredRecords() {
    if (!this.statusFilter) {
      this.filteredRecords = [...this.faiRecords];
    } else {
      this.filteredRecords = this.faiRecords.filter(record => 
        record.status === this.statusFilter
      );
    }
  }

  // Statistics methods
  getInProgressCount(): number {
    return this.faiRecords.filter(r => r.status === 'In Progress').length;
  }

  getPendingReviewCount(): number {
    return this.faiRecords.filter(r => r.status === 'Pending Review').length;
  }

  getApprovedCount(): number {
    return this.faiRecords.filter(r => r.status === 'Approved').length;
  }

  getRejectedCount(): number {
    return this.faiRecords.filter(r => r.status === 'Rejected').length;
  }

  getOverdueCount(): number {
    const now = new Date();
    return this.faiRecords.filter(r => 
      new Date(r.dueDate) < now && 
      !['Approved', 'Rejected', 'Closed'].includes(r.status)
    ).length;
  }

  // Color coding methods
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
      case 'In Progress': return '#2196f3';
      case 'Pending Review': return '#ff9800';
      case 'Approved': return '#4caf50';
      case 'Rejected': return '#f44336';
      case 'Closed': return '#607d8b';
      default: return '#9e9e9e';
    }
  }

  getDispositionColor(disposition: string): string {
    switch (disposition) {
      case 'Accept': return '#4caf50';
      case 'Accept with Deviation': return '#ff9800';
      case 'Reject': return '#f44336';
      case 'Pending': return '#607d8b';
      default: return '#9e9e9e';
    }
  }

  getResultColor(result: string): string {
    switch (result) {
      case 'Pass': return '#4caf50';
      case 'Fail': return '#f44336';
      case 'N/A': return '#9e9e9e';
      default: return '#607d8b';
    }
  }

  isOverdue(dueDate: Date, status: string): boolean {
    return new Date(dueDate) < new Date() && 
           !['Approved', 'Rejected', 'Closed'].includes(status);
  }

  calculateOverallResult(): 'Pass' | 'Fail' | 'Partial' {
    const allResults = [
      ...this.dimensions.value.map((d: any) => d.result),
      ...this.functionalTests.value.map((t: any) => t.result),
      ...this.materialTests.value.map((t: any) => t.result),
      ...this.surfaceFinish.value.map((s: any) => s.result)
    ];

    const hasPass = allResults.includes('Pass');
    const hasFail = allResults.includes('Fail');

    if (hasFail) return 'Fail';
    if (hasPass && !hasFail) return 'Pass';
    return 'Partial';
  }

  private loadMockData() {
    this.faiRecords = [
      {
        id: 1,
        faiNumber: 'FAI-2024-001',
        partNumber: 'PN-12345-A',
        partName: 'Main Housing Assembly',
        revision: 'C',
        lotNumber: 'LOT-2024-098',
        serialNumber: 'SN-001',
        drawingNumber: 'DWG-12345',
        drawingRevision: 'C',
        workOrder: 'WO-2024-156',
        customer: 'Boeing',
        program: 'Commercial Aircraft',
        reason: 'Initial Production',
        productionMethod: 'Production',
        status: 'Pending Review',
        priority: 'High',
        inspectorName: 'John Smith',
        inspectionDate: new Date('2024-11-20'),
        dueDate: new Date('2024-12-05'),
        manufacturingProcess: 'CNC Machining, Assembly',
        toolingUsed: 'Fixture A-123, Jig B-456',
        equipmentUsed: 'CNC Mill M-100, CMM C-200',
        materialCertification: true,
        processDocumentation: true,
        calibrationRecords: true,
        dimensions: [
          {
            id: 1,
            characteristic: 'Overall Length',
            specification: '100.0 ± 0.1',
            tolerance: '± 0.1',
            actualValue: 100.05,
            unit: 'mm',
            method: 'CMM Measurement',
            result: 'Pass'
          },
          {
            id: 2,
            characteristic: 'Hole Diameter',
            specification: '10.0 +0.1/-0.0',
            tolerance: '+0.1/-0.0',
            actualValue: 10.08,
            unit: 'mm',
            method: 'Pin Gauge',
            result: 'Pass'
          }
        ],
        functionalTests: [
          {
            id: 1,
            testName: 'Pressure Test',
            specification: '1000 PSI minimum',
            procedure: 'PR-TEST-001',
            actualResult: '1150 PSI',
            result: 'Pass',
            equipment: 'Pressure Tester PT-100'
          }
        ],
        materialTests: [
          {
            id: 1,
            testName: 'Material Hardness',
            specification: 'HRC 45-50',
            procedure: 'ASTM E18',
            actualResult: 'HRC 47',
            result: 'Pass',
            equipment: 'Rockwell Tester RT-200'
          }
        ],
        surfaceFinish: [
          {
            id: 1,
            surface: 'Machined Surface A',
            specification: '3.2 Ra max',
            actualValue: 2.8,
            unit: 'µm',
            result: 'Pass'
          }
        ],
        notes: 'All measurements within specification. Ready for production.',
        disposition: 'Accept',
        customerApproval: false,
        submittedBy: 'Quality Inspector',
        submittedDate: new Date('2024-11-18'),
        attachments: []
      },
      {
        id: 2,
        faiNumber: 'FAI-2024-002',
        partNumber: 'PN-67890-B',
        partName: 'Support Bracket',
        revision: 'A',
        drawingNumber: 'DWG-67890',
        drawingRevision: 'A',
        workOrder: 'WO-2024-157',
        customer: 'Airbus',
        program: 'A350 Program',
        reason: 'Process Change',
        productionMethod: 'Production',
        status: 'In Progress',
        priority: 'Medium',
        inspectorName: 'Sarah Johnson',
        inspectionDate: new Date('2024-11-22'),
        dueDate: new Date('2024-12-10'),
        manufacturingProcess: 'Sheet Metal Forming, Welding',
        toolingUsed: 'Press Tool P-789',
        equipmentUsed: 'Press P-500, Welder W-300',
        materialCertification: true,
        processDocumentation: false,
        calibrationRecords: true,
        dimensions: [],
        functionalTests: [],
        materialTests: [],
        surfaceFinish: [],
        notes: 'First article in progress. Awaiting material test results.',
        disposition: 'Pending',
        customerApproval: true,
        submittedBy: 'Quality Inspector',
        submittedDate: new Date('2024-11-20'),
        attachments: []
      }
    ];
  }
}

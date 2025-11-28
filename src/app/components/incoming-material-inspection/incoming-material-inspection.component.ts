import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

interface IncomingMaterialStatistics {
  pending: number;
  accepted: number;
  rejected: number;
  quarantine: number;
  rework: number;
  acceptanceRate: number;
}

interface IncomingMaterialRecord {
  id: number;
  purchaseOrder: string;
  receiptDate: Date;
  packingSlipNumber?: string;
  supplier: string;
  supplierLotNumber: string;
  partNumber: string;
  partDescription: string;
  revision?: string;
  quantityOrdered: number;
  quantityReceived: number;
  unitOfMeasure: string;
  materialType: string;
  inspectionLevel: string;
  aql?: string;
  sampleSize: number;
  inspector: string;
  inspectionDate: Date;
  overallStatus: string;
  disposition?: string;
  dispositionNotes?: string;
  qualityEngineer?: string;
  approvalDate?: Date;
  storageLocation?: string;
  cocReceived?: string;
  cocNumber?: string;
  mtrReceived?: string;
  mtrNumber?: string;
}

@Component({
  selector: 'app-incoming-material-inspection',
  standalone: false,
  templateUrl: './incoming-material-inspection.component.html',
  styleUrl: './incoming-material-inspection.component.css'
})
export class IncomingMaterialInspectionComponent implements OnInit {
  showForm = false;
  incomingMaterialForm!: FormGroup;
  dataSource = new MatTableDataSource<IncomingMaterialRecord>();
  displayedColumns: string[] = ['purchaseOrder', 'partInfo', 'supplier', 'quantity', 'inspector', 'status', 'actions'];
  
  statusFilter = '';
  supplierFilter = '';
  searchFilter = '';

  // Dropdown options
  suppliers = [
    'ABC Manufacturing Co.', 'XYZ Precision Parts', 'Global Steel Supply', 
    'Advanced Materials Inc.', 'Quality Components Ltd.', 'Reliable Fasteners Corp.'
  ];
  
  unitOfMeasures = ['Each', 'Lbs', 'Kg', 'Feet', 'Meters', 'Sq Ft', 'Cu In', 'Gallons', 'Liters'];
  
  materialTypes = [
    'Raw Material', 'Fasteners', 'Electrical Components', 'Mechanical Parts',
    'Chemicals', 'Packaging Materials', 'Tools & Equipment', 'Software/Documentation'
  ];
  
  inspectionLevels = ['General Level I', 'General Level II', 'General Level III', 'Special', 'Skip Lot'];
  aqlLevels = ['0.010', '0.015', '0.025', '0.040', '0.065', '0.10', '0.15', '0.25', '0.40', '0.65', '1.0', '1.5', '2.5', '4.0', '6.5', '10', '15'];
  
  inspectors = ['Inspector-001 John Smith', 'Inspector-002 Jane Doe', 'Inspector-003 Mike Johnson', 'Inspector-004 Sarah Wilson'];
  qualityEngineers = ['QE-001 Robert Chen', 'QE-002 Lisa Park', 'QE-003 David Kumar'];
  
  dispositions = [
    'Release to Stock', 'Return to Supplier', 'Scrap', 'Rework', 
    'Use As-Is', 'Sort & Rework', 'Quarantine', 'Engineering Review'
  ];
  
  statusOptions = ['Accepted', 'Rejected', 'Quarantined', 'Rework/Sort', 'Conditional Accept', 'Pending Inspection'];

  // Inspection type labels
  inspectionTypeLabels = [
    'Visual Inspection',
    'Dimensional Verification',
    'Material Testing',
    'Surface Finish Check',
    'Functional Testing',
    'Documentation Review',
    'Chemical Analysis',
    'Hardness Testing'
  ];

  // Visual inspection labels
  visualInspectionLabels = [
    'Overall Appearance',
    'Surface Defects',
    'Dimensional Compliance',
    'Marking/Labeling',
    'Packaging Condition',
    'Color/Finish'
  ];

  // Documentation labels
  documentationLabels = [
    'Drawing/Specification',
    'Process Sheets',
    'Calibration Certificates',
    'Safety Data Sheets',
    'Inspection Reports',
    'Shipping Documents'
  ];

  // Sample data
  mockData: IncomingMaterialRecord[] = [
    {
      id: 1,
      purchaseOrder: 'PO-2024-1001',
      receiptDate: new Date('2024-11-28'),
      packingSlipNumber: 'PS-ABC-5678',
      supplier: 'ABC Manufacturing Co.',
      supplierLotNumber: 'ABC-LOT-2024-456',
      partNumber: 'P/N-STL-001',
      partDescription: '316 Stainless Steel Rod',
      revision: 'B',
      quantityOrdered: 100,
      quantityReceived: 100,
      unitOfMeasure: 'Each',
      materialType: 'Raw Material',
      inspectionLevel: 'General Level II',
      aql: '1.5',
      sampleSize: 13,
      inspector: 'Inspector-001 John Smith',
      inspectionDate: new Date('2024-11-28'),
      overallStatus: 'Accepted',
      disposition: 'Release to Stock',
      cocReceived: 'Yes',
      cocNumber: 'COC-ABC-2024-789'
    },
    {
      id: 2,
      purchaseOrder: 'PO-2024-1002',
      receiptDate: new Date('2024-11-27'),
      supplier: 'XYZ Precision Parts',
      supplierLotNumber: 'XYZ-BATCH-2024-123',
      partNumber: 'P/N-ELC-456',
      partDescription: 'Electronic Connector Assembly',
      quantityOrdered: 50,
      quantityReceived: 45,
      unitOfMeasure: 'Each',
      materialType: 'Electrical Components',
      inspectionLevel: 'General Level I',
      sampleSize: 8,
      inspector: 'Inspector-002 Jane Doe',
      inspectionDate: new Date('2024-11-27'),
      overallStatus: 'Rejected',
      disposition: 'Return to Supplier',
      dispositionNotes: 'Dimensional non-conformance detected'
    },
    {
      id: 3,
      purchaseOrder: 'PO-2024-1003',
      receiptDate: new Date('2024-11-26'),
      supplier: 'Global Steel Supply',
      supplierLotNumber: 'GSS-2024-789',
      partNumber: 'P/N-ALU-789',
      partDescription: 'Aluminum Plate 6061-T6',
      quantityOrdered: 25,
      quantityReceived: 25,
      unitOfMeasure: 'Sq Ft',
      materialType: 'Raw Material',
      inspectionLevel: 'General Level II',
      sampleSize: 5,
      inspector: 'Inspector-003 Mike Johnson',
      inspectionDate: new Date('2024-11-26'),
      overallStatus: 'Quarantined',
      disposition: 'Engineering Review',
      dispositionNotes: 'Material certification pending review'
    }
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.dataSource.data = this.mockData;
  }

  get statistics(): IncomingMaterialStatistics {
    const data = this.dataSource.data;
    const total = data.length;
    const accepted = data.filter(item => item.overallStatus === 'Accepted').length;
    
    return {
      pending: data.filter(item => item.overallStatus === 'Pending Inspection').length,
      accepted: accepted,
      rejected: data.filter(item => item.overallStatus === 'Rejected').length,
      quarantine: data.filter(item => item.overallStatus === 'Quarantined').length,
      rework: data.filter(item => item.overallStatus === 'Rework/Sort').length,
      acceptanceRate: total > 0 ? Math.round((accepted / total) * 100) : 0
    };
  }

  initializeForm(): void {
    this.incomingMaterialForm = this.formBuilder.group({
      // Receipt Information
      purchaseOrder: ['', Validators.required],
      receiptDate: ['', Validators.required],
      packingSlipNumber: [''],
      supplier: ['', Validators.required],
      supplierLotNumber: ['', Validators.required],
      partNumber: ['', Validators.required],
      partDescription: ['', Validators.required],
      revision: [''],
      quantityOrdered: ['', [Validators.required, Validators.min(1)]],
      quantityReceived: ['', [Validators.required, Validators.min(1)]],
      unitOfMeasure: [''],
      materialType: ['', Validators.required],
      
      // Sampling Plan
      inspectionLevel: ['', Validators.required],
      aql: [''],
      sampleSize: ['', [Validators.required, Validators.min(1)]],
      inspector: ['', Validators.required],
      inspectionDate: ['', Validators.required],
      
      // Inspection Types
      inspectionTypes: this.formBuilder.array(this.createInspectionTypes()),
      
      // Test Results
      visualInspections: this.formBuilder.array(this.createVisualInspections()),
      measurements: this.formBuilder.array([this.createMeasurement()]),
      
      // Material Testing
      hardnessTest: [''],
      surfaceFinish: [''],
      chemicalComposition: [''],
      tensileStrength: [''],
      
      // Documentation
      cocReceived: [''],
      cocNumber: [''],
      mtrReceived: [''],
      mtrNumber: [''],
      documentationChecks: this.formBuilder.array(this.createDocumentationChecks()),
      
      // Disposition
      overallStatus: ['', Validators.required],
      disposition: [''],
      dispositionNotes: [''],
      qualityEngineer: [''],
      approvalDate: [''],
      storageLocation: [''],
      notificationMethod: [''],
      notificationDate: ['']
    });
  }

  createInspectionTypes(): FormGroup[] {
    return this.inspectionTypeLabels.map(() => 
      this.formBuilder.group({
        required: [false],
        specification: ['']
      })
    );
  }

  createVisualInspections(): FormGroup[] {
    return this.visualInspectionLabels.map(() => 
      this.formBuilder.group({
        result: ['Pass'],
        comments: ['']
      })
    );
  }

  createDocumentationChecks(): FormGroup[] {
    return this.documentationLabels.map(() => 
      this.formBuilder.group({
        received: [false],
        reference: ['']
      })
    );
  }

  createMeasurement(): FormGroup {
    return this.formBuilder.group({
      characteristic: [''],
      specification: [''],
      actualValue: [''],
      result: ['Pass']
    });
  }

  get inspectionTypesFormArray(): FormArray {
    return this.incomingMaterialForm.get('inspectionTypes') as FormArray;
  }

  get visualInspectionsFormArray(): FormArray {
    return this.incomingMaterialForm.get('visualInspections') as FormArray;
  }

  get measurementsFormArray(): FormArray {
    return this.incomingMaterialForm.get('measurements') as FormArray;
  }

  get documentationChecksFormArray(): FormArray {
    return this.incomingMaterialForm.get('documentationChecks') as FormArray;
  }

  getInspectionTypeLabel(index: number): string {
    return this.inspectionTypeLabels[index] || `Inspection Type ${index + 1}`;
  }

  getVisualInspectionLabel(index: number): string {
    return this.visualInspectionLabels[index] || `Visual Check ${index + 1}`;
  }

  getDocumentationLabel(index: number): string {
    return this.documentationLabels[index] || `Document ${index + 1}`;
  }

  addMeasurement(): void {
    this.measurementsFormArray.push(this.createMeasurement());
  }

  removeMeasurement(index: number): void {
    if (this.measurementsFormArray.length > 1) {
      this.measurementsFormArray.removeAt(index);
    }
  }

  shouldShowSupplierNotification(): boolean {
    const status = this.incomingMaterialForm.get('overallStatus')?.value;
    return status === 'Rejected' || status === 'Quarantined' || status === 'Rework/Sort';
  }

  onToggleForm(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.onReset();
    }
  }

  onSubmit(): void {
    if (this.incomingMaterialForm.valid) {
      const formData = this.incomingMaterialForm.value;
      console.log('Incoming Material Inspection Data:', formData);
      
      // Add new record to table
      const newRecord: IncomingMaterialRecord = {
        id: this.dataSource.data.length + 1,
        ...formData,
        receiptDate: new Date(formData.receiptDate),
        inspectionDate: new Date(formData.inspectionDate),
        approvalDate: formData.approvalDate ? new Date(formData.approvalDate) : undefined
      };
      
      this.dataSource.data = [newRecord, ...this.dataSource.data];
      this.onToggleForm();
    }
  }

  onReset(): void {
    this.incomingMaterialForm.reset();
    this.initializeForm();
  }

  onFilterChange(): void {
    const filterValue = this.searchFilter.toLowerCase();
    this.dataSource.filter = filterValue;
    
    this.dataSource.filterPredicate = (data: IncomingMaterialRecord, filter: string) => {
      const matchesSearch = !filter || 
        data.purchaseOrder.toLowerCase().includes(filter) ||
        data.partNumber.toLowerCase().includes(filter) ||
        data.partDescription.toLowerCase().includes(filter) ||
        data.supplier.toLowerCase().includes(filter);
      
      const matchesStatus = !this.statusFilter || data.overallStatus === this.statusFilter;
      const matchesSupplier = !this.supplierFilter || data.supplier === this.supplierFilter;
      
      return matchesSearch && matchesStatus && matchesSupplier;
    };
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Accepted': 'status-accepted',
      'Rejected': 'status-rejected',
      'Quarantined': 'status-quarantine',
      'Rework/Sort': 'status-rework',
      'Conditional Accept': 'status-conditional',
      'Pending Inspection': 'status-pending'
    };
    return statusMap[status] || 'status-default';
  }

  // Action methods
  onView(record: IncomingMaterialRecord): void {
    console.log('View record:', record);
  }

  onEdit(record: IncomingMaterialRecord): void {
    console.log('Edit record:', record);
    // Load record data into form
    this.incomingMaterialForm.patchValue(record);
    this.showForm = true;
  }

  onPrintCertificate(record: IncomingMaterialRecord): void {
    console.log('Print certificate for:', record);
    // Implement certificate printing
  }

  onCreateNCR(record: IncomingMaterialRecord): void {
    console.log('Create NCR for:', record);
    // Navigate to NCR creation with pre-filled data
  }

  onMoveToStock(record: IncomingMaterialRecord): void {
    console.log('Move to stock:', record);
    // Implement stock movement workflow
    record.storageLocation = 'STOCK-A1';
    this.dataSource.data = [...this.dataSource.data];
  }

  onDelete(record: IncomingMaterialRecord): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.dataSource.data = this.dataSource.data.filter(item => item.id !== record.id);
    }
  }
}

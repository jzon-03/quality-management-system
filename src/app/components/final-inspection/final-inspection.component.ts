import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

interface FinalInspectionStatistics {
  pending: number;
  approved: number;
  rejected: number;
  rework: number;
  shipped: number;
  passRate: number;
}

interface FinalInspectionRecord {
  id: number;
  workOrder: string;
  partNumber: string;
  partName: string;
  revision: string;
  serialNumber?: string;
  lotNumber: string;
  quantity: number;
  customerPO?: string;
  inspector: string;
  inspectionDate: Date;
  shift?: string;
  overallStatus: string;
  disposition?: string;
  inspectorNotes?: string;
  qualityEngineer?: string;
  qeApprovalDate?: Date;
  packageType?: string;
  shippingMethod?: string;
  trackingNumber?: string;
  specialInstructions?: string;
}

@Component({
  selector: 'app-final-inspection',
  standalone: false,
  templateUrl: './final-inspection.component.html',
  styleUrl: './final-inspection.component.css'
})
export class FinalInspectionComponent implements OnInit {
  showForm = false;
  finalInspectionForm!: FormGroup;
  dataSource = new MatTableDataSource<FinalInspectionRecord>();
  displayedColumns: string[] = ['workOrder', 'partInfo', 'quantity', 'inspector', 'status', 'actions'];
  
  statusFilter = '';
  searchFilter = '';

  // Dropdown options
  inspectors = ['John Smith', 'Jane Doe', 'Mike Johnson', 'Sarah Wilson'];
  shifts = ['Day Shift', 'Night Shift', 'Weekend'];
  qualityEngineers = ['QE-001 Robert Chen', 'QE-002 Lisa Park', 'QE-003 David Kumar'];
  dispositions = ['Ship', 'Rework', 'Scrap', 'Return to Vendor', 'Hold'];
  packageTypes = ['Standard Box', 'Anti-Static Bag', 'Custom Container', 'Foam Packaging'];
  shippingMethods = ['Ground', 'Express', 'Overnight', 'International'];
  statusOptions = ['Approved', 'Rejected', 'Rework Required', 'Hold', 'Shipped'];

  // Visual inspection checklist labels
  visualCheckLabels = [
    'Surface finish meets specification',
    'No visible defects or damage',
    'Proper marking/labeling applied',
    'Correct color/coating',
    'No foreign material contamination',
    'Proper packaging condition',
    'Documentation complete'
  ];

  // Packaging checklist labels
  packagingCheckLabels = [
    'Correct packaging material used',
    'Anti-static protection (if required)',
    'Proper cushioning/protection',
    'Labels and markings applied',
    'Certificate of Conformance included',
    'Customer requirements met',
    'Package sealed properly'
  ];

  // Sample data
  mockData: FinalInspectionRecord[] = [
    {
      id: 1,
      workOrder: 'WO-2024-1234',
      partNumber: 'P/N-ABC-123',
      partName: 'Precision Machined Component',
      revision: 'C',
      serialNumber: 'SN-001234',
      lotNumber: 'LOT-2024-045',
      quantity: 50,
      customerPO: 'PO-CUST-789',
      inspector: 'John Smith',
      inspectionDate: new Date('2024-11-28'),
      shift: 'Day Shift',
      overallStatus: 'Approved',
      disposition: 'Ship',
      qualityEngineer: 'QE-001 Robert Chen',
      packageType: 'Anti-Static Bag',
      shippingMethod: 'Express'
    },
    {
      id: 2,
      workOrder: 'WO-2024-1235',
      partNumber: 'P/N-DEF-456',
      partName: 'Electronic Assembly',
      revision: 'B',
      lotNumber: 'LOT-2024-046',
      quantity: 25,
      inspector: 'Jane Doe',
      inspectionDate: new Date('2024-11-27'),
      overallStatus: 'Rework Required',
      disposition: 'Rework'
    },
    {
      id: 3,
      workOrder: 'WO-2024-1236',
      partNumber: 'P/N-GHI-789',
      partName: 'Aerospace Component',
      revision: 'A',
      lotNumber: 'LOT-2024-047',
      quantity: 10,
      inspector: 'Mike Johnson',
      inspectionDate: new Date('2024-11-26'),
      overallStatus: 'Shipped',
      disposition: 'Ship',
      trackingNumber: 'TRK-123456789'
    }
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.dataSource.data = this.mockData;
  }

  get statistics(): FinalInspectionStatistics {
    const data = this.dataSource.data;
    const total = data.length;
    const approved = data.filter(item => item.overallStatus === 'Approved').length;
    
    return {
      pending: data.filter(item => item.overallStatus === 'Pending Review').length,
      approved: approved,
      rejected: data.filter(item => item.overallStatus === 'Rejected').length,
      rework: data.filter(item => item.overallStatus === 'Rework Required').length,
      shipped: data.filter(item => item.overallStatus === 'Shipped').length,
      passRate: total > 0 ? Math.round((approved / total) * 100) : 0
    };
  }

  initializeForm(): void {
    this.finalInspectionForm = this.formBuilder.group({
      // Product Information
      workOrder: ['', Validators.required],
      partNumber: ['', Validators.required],
      partName: ['', Validators.required],
      revision: ['', Validators.required],
      serialNumber: [''],
      lotNumber: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      customerPO: [''],
      
      // Inspection Details
      inspector: ['', Validators.required],
      inspectionDate: ['', Validators.required],
      shift: [''],
      
      // Visual Checks
      visualChecks: this.formBuilder.array(this.createVisualChecks()),
      
      // Dimensions
      dimensions: this.formBuilder.array([this.createDimension()]),
      
      // Final Approval
      overallStatus: ['', Validators.required],
      disposition: [''],
      inspectorNotes: [''],
      qualityEngineer: [''],
      qeApprovalDate: [''],
      
      // Packaging
      packagingChecks: this.formBuilder.array(this.createPackagingChecks()),
      packageType: [''],
      shippingMethod: [''],
      trackingNumber: [''],
      specialInstructions: ['']
    });
  }

  createVisualChecks(): FormGroup[] {
    return this.visualCheckLabels.map(() => 
      this.formBuilder.group({
        passed: [true],
        comments: ['']
      })
    );
  }

  createPackagingChecks(): FormGroup[] {
    return this.packagingCheckLabels.map(() => 
      this.formBuilder.group({
        completed: [true],
        comments: ['']
      })
    );
  }

  createDimension(): FormGroup {
    return this.formBuilder.group({
      feature: [''],
      nominal: [''],
      actual: [''],
      result: ['Pass']
    });
  }

  get visualChecksFormArray(): FormArray {
    return this.finalInspectionForm.get('visualChecks') as FormArray;
  }

  get dimensionsFormArray(): FormArray {
    return this.finalInspectionForm.get('dimensions') as FormArray;
  }

  get packagingChecksFormArray(): FormArray {
    return this.finalInspectionForm.get('packagingChecks') as FormArray;
  }

  getVisualCheckLabel(index: number): string {
    return this.visualCheckLabels[index] || `Visual Check ${index + 1}`;
  }

  getPackagingCheckLabel(index: number): string {
    return this.packagingCheckLabels[index] || `Packaging Check ${index + 1}`;
  }

  addDimension(): void {
    this.dimensionsFormArray.push(this.createDimension());
  }

  removeDimension(index: number): void {
    if (this.dimensionsFormArray.length > 1) {
      this.dimensionsFormArray.removeAt(index);
    }
  }

  onToggleForm(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.onReset();
    }
  }

  onSubmit(): void {
    if (this.finalInspectionForm.valid) {
      const formData = this.finalInspectionForm.value;
      console.log('Final Inspection Data:', formData);
      
      // Add new record to table
      const newRecord: FinalInspectionRecord = {
        id: this.dataSource.data.length + 1,
        ...formData,
        inspectionDate: new Date(formData.inspectionDate)
      };
      
      this.dataSource.data = [newRecord, ...this.dataSource.data];
      this.onToggleForm();
    }
  }

  onReset(): void {
    this.finalInspectionForm.reset();
    this.initializeForm();
  }

  onFilterChange(): void {
    const filterValue = this.searchFilter.toLowerCase();
    this.dataSource.filter = filterValue;
    
    this.dataSource.filterPredicate = (data: FinalInspectionRecord, filter: string) => {
      const matchesSearch = !filter || 
        data.partNumber.toLowerCase().includes(filter) ||
        data.workOrder.toLowerCase().includes(filter) ||
        data.partName.toLowerCase().includes(filter);
      
      const matchesStatus = !this.statusFilter || data.overallStatus === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    };
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Approved': 'status-approved',
      'Rejected': 'status-rejected',
      'Rework Required': 'status-rework',
      'Hold': 'status-hold',
      'Shipped': 'status-shipped',
      'Pending Review': 'status-pending'
    };
    return statusMap[status] || 'status-default';
  }

  // Action methods
  onView(record: FinalInspectionRecord): void {
    console.log('View record:', record);
  }

  onEdit(record: FinalInspectionRecord): void {
    console.log('Edit record:', record);
    // Load record data into form
    this.finalInspectionForm.patchValue(record);
    this.showForm = true;
  }

  onPrint(record: FinalInspectionRecord): void {
    console.log('Print record:', record);
    // Implement print functionality
  }

  onShip(record: FinalInspectionRecord): void {
    console.log('Ship record:', record);
    // Update status to shipped
    record.overallStatus = 'Shipped';
    this.dataSource.data = [...this.dataSource.data];
  }

  onDelete(record: FinalInspectionRecord): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.dataSource.data = this.dataSource.data.filter(item => item.id !== record.id);
    }
  }
}

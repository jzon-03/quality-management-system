import { Component, OnInit } from '@angular/core';

interface NCR {
  id: string;
  title: string;
  description: string;
  reportedBy: string;
  reportedDate: Date;
  department: string;
  area: string;
  category: 'Product' | 'Process' | 'System' | 'Documentation' | 'Personnel';
  severity: 'Critical' | 'Major' | 'Minor';
  status: 'Open' | 'Under Investigation' | 'CAPA Required' | 'Closed' | 'Cancelled';
  assignedTo: string;
  targetCloseDate: Date;
  actualCloseDate?: Date;
  rootCause?: string;
  immediateAction: string;
  capaRequired: boolean;
  capaId?: string;
  verificationMethod?: string;
  verifiedBy?: string;
  verificationDate?: Date;
  attachments: string[];
  cost?: number;
  customerImpact: 'None' | 'Low' | 'Medium' | 'High';
}

@Component({
  selector: 'app-ncr',
  templateUrl: './ncr.component.html',
  standalone: false,
  styleUrl: './ncr.component.css'
})
export class NcrComponent implements OnInit {
  ncrs: NCR[] = [
    {
      id: 'NCR-2024-001',
      title: 'Dimensional Non-Conformance in Batch #12345',
      description: 'Parts found to be outside specified dimensional tolerances during final inspection. 15 units affected.',
      reportedBy: 'John Inspector',
      reportedDate: new Date('2024-11-20'),
      department: 'Production',
      area: 'Final Assembly',
      category: 'Product',
      severity: 'Major',
      status: 'Under Investigation',
      assignedTo: 'Quality Engineer',
      targetCloseDate: new Date('2024-12-05'),
      immediateAction: 'Quarantine affected batch, inspect additional units from same production run',
      capaRequired: true,
      capaId: 'CAPA-2024-015',
      attachments: ['inspection_report.pdf', 'photos.zip'],
      cost: 2500,
      customerImpact: 'Medium'
    },
    {
      id: 'NCR-2024-002',
      title: 'Procedure Not Followed - Material Handling',
      description: 'Operator found not following proper material handling procedure, potentially contaminating raw materials.',
      reportedBy: 'Shift Supervisor',
      reportedDate: new Date('2024-11-18'),
      department: 'Production',
      area: 'Material Storage',
      category: 'Process',
      severity: 'Minor',
      status: 'CAPA Required',
      assignedTo: 'Production Manager',
      targetCloseDate: new Date('2024-11-30'),
      rootCause: 'Inadequate training on updated material handling procedures',
      immediateAction: 'Re-training conducted, materials inspected and segregated if necessary',
      capaRequired: true,
      capaId: 'CAPA-2024-016',
      attachments: ['witness_statement.pdf'],
      cost: 150,
      customerImpact: 'Low'
    },
    {
      id: 'NCR-2024-003',
      title: 'Missing Calibration Certificate',
      description: 'Measuring equipment found without valid calibration certificate during audit.',
      reportedBy: 'Internal Auditor',
      reportedDate: new Date('2024-11-15'),
      department: 'Quality',
      area: 'Metrology Lab',
      category: 'System',
      severity: 'Major',
      status: 'Closed',
      assignedTo: 'Metrology Technician',
      targetCloseDate: new Date('2024-11-25'),
      actualCloseDate: new Date('2024-11-22'),
      rootCause: 'Calibration due date tracking system failure',
      immediateAction: 'Equipment immediately sent for calibration, all measurements verified',
      capaRequired: false,
      verificationMethod: 'Calibration certificate review and system verification',
      verifiedBy: 'Quality Manager',
      verificationDate: new Date('2024-11-22'),
      attachments: ['audit_finding.pdf', 'calibration_cert.pdf'],
      cost: 300,
      customerImpact: 'None'
    },
    {
      id: 'NCR-2024-004',
      title: 'Customer Complaint - Product Defect',
      description: 'Customer reported premature failure of product within warranty period. Investigation required.',
      reportedBy: 'Customer Service',
      reportedDate: new Date('2024-11-22'),
      department: 'Quality',
      area: 'Customer Interface',
      category: 'Product',
      severity: 'Critical',
      status: 'Open',
      assignedTo: 'Senior Quality Engineer',
      targetCloseDate: new Date('2024-12-10'),
      immediateAction: 'Product recalled, customer provided replacement, investigation initiated',
      capaRequired: true,
      attachments: ['customer_complaint.pdf', 'returned_product_photos.zip'],
      cost: 5000,
      customerImpact: 'High'
    }
  ];

  filteredNcrs = this.ncrs;
  searchTerm = '';
  selectedCategory = '';
  selectedSeverity = '';
  selectedStatus = '';
  selectedDepartment = '';

  categories = ['Product', 'Process', 'System', 'Documentation', 'Personnel'];
  severities = ['Critical', 'Major', 'Minor'];
  statuses = ['Open', 'Under Investigation', 'CAPA Required', 'Closed', 'Cancelled'];
  departments = ['Production', 'Quality', 'Engineering', 'Procurement', 'Shipping'];

  displayedColumns = ['id', 'title', 'category', 'severity', 'status', 'reportedBy', 'reportedDate', 'assignedTo', 'actions'];

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredNcrs = this.ncrs.filter(ncr => {
      const matchesSearch = !this.searchTerm || 
        ncr.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ncr.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ncr.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || ncr.category === this.selectedCategory;
      const matchesSeverity = !this.selectedSeverity || ncr.severity === this.selectedSeverity;
      const matchesStatus = !this.selectedStatus || ncr.status === this.selectedStatus;
      const matchesDepartment = !this.selectedDepartment || ncr.department === this.selectedDepartment;
      
      return matchesSearch && matchesCategory && matchesSeverity && matchesStatus && matchesDepartment;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedSeverity = '';
    this.selectedStatus = '';
    this.selectedDepartment = '';
    this.applyFilters();
  }

  viewNCR(ncr: NCR) {
    console.log('Viewing NCR:', ncr.id);
    // Implement view logic here
  }

  editNCR(ncr: NCR) {
    console.log('Editing NCR:', ncr.id);
    // Implement edit logic here
  }

  closeNCR(ncr: NCR) {
    console.log('Closing NCR:', ncr.id);
    // Implement close logic here
  }

  createCAPA(ncr: NCR) {
    console.log('Creating CAPA for NCR:', ncr.id);
    // Implement CAPA creation logic here
  }

  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'Critical': return 'warn';
      case 'Major': return 'accent';
      case 'Minor': return 'primary';
      default: return '';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Open': return 'warn';
      case 'Under Investigation': return 'accent';
      case 'CAPA Required': return 'accent';
      case 'Closed': return 'primary';
      case 'Cancelled': return '';
      default: return '';
    }
  }

  isOverdue(targetDate: Date, status: string): boolean {
    if (status === 'Closed' || status === 'Cancelled') return false;
    return new Date() > targetDate;
  }

  getDaysUntilDue(targetDate: Date): number {
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getNcrsByStatus(status: string): NCR[] {
    return this.ncrs.filter(ncr => ncr.status === status);
  }

  getNcrsBySeverity(severity: string): NCR[] {
    return this.ncrs.filter(ncr => ncr.severity === severity);
  }

  getTotalCost(): number {
    return this.ncrs.reduce((total, ncr) => total + (ncr.cost || 0), 0);
  }

  getOpenNcrsCount(): number {
    return this.ncrs.filter(ncr => ncr.status !== 'Closed' && ncr.status !== 'Cancelled').length;
  }

  getOverdueCount(): number {
    return this.ncrs.filter(ncr => this.isOverdue(ncr.targetCloseDate, ncr.status)).length;
  }
}

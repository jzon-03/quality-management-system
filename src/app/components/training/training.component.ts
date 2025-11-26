import { Component, OnInit } from '@angular/core';

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  hireDate: Date;
  email: string;
  supervisor: string;
  active: boolean;
}

interface TrainingRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  trainingTitle: string;
  trainingType: 'Orientation' | 'Procedure Training' | 'Certification' | 'Safety Training' | 'Skill Development' | 'Refresher' | 'Regulatory';
  category: 'Quality' | 'Safety' | 'Manufacturing' | 'Regulatory' | 'Technical' | 'Leadership' | 'Compliance';
  instructor: string;
  trainingDate: Date;
  expirationDate?: Date;
  duration: number; // hours
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Failed' | 'Expired' | 'Cancelled';
  score?: number;
  passingScore: number;
  attempts: number;
  maxAttempts: number;
  certificateNumber?: string;
  relatedProcedures: string[];
  requiredBy: string; // regulation or requirement
  competencyAreas: string[];
  trainingMethod: 'Classroom' | 'Online' | 'On-the-Job' | 'Workshop' | 'External' | 'Self-Study';
  cost: number;
  provider: string;
  location: string;
  notes?: string;
  attachments: string[];
}

interface Certification {
  id: string;
  name: string;
  issuingBody: string;
  category: 'Internal' | 'Industry' | 'Regulatory' | 'Professional';
  validityPeriod: number; // months
  prerequisite?: string;
  description: string;
  renewalRequired: boolean;
  cost: number;
}

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  standalone: false,
  styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit {
  employees: Employee[] = [
    {
      id: 'EMP-001',
      name: 'John Smith',
      department: 'Production',
      position: 'Machine Operator',
      hireDate: new Date('2023-06-15'),
      email: 'john.smith@company.com',
      supervisor: 'Mike Johnson',
      active: true
    },
    {
      id: 'EMP-002',
      name: 'Sarah Wilson',
      department: 'Quality',
      position: 'QC Inspector',
      hireDate: new Date('2022-03-10'),
      email: 'sarah.wilson@company.com',
      supervisor: 'Lisa Brown',
      active: true
    },
    {
      id: 'EMP-003',
      name: 'Mike Davis',
      department: 'Engineering',
      position: 'Quality Engineer',
      hireDate: new Date('2021-09-20'),
      email: 'mike.davis@company.com',
      supervisor: 'David Chen',
      active: true
    }
  ];

  trainingRecords: TrainingRecord[] = [
    {
      id: 'TRN-001',
      employeeId: 'EMP-001',
      employeeName: 'John Smith',
      trainingTitle: 'CNC Machine Operation Safety',
      trainingType: 'Safety Training',
      category: 'Safety',
      instructor: 'Safety Manager',
      trainingDate: new Date('2024-11-15'),
      expirationDate: new Date('2025-11-15'),
      duration: 4,
      status: 'Completed',
      score: 92,
      passingScore: 80,
      attempts: 1,
      maxAttempts: 3,
      certificateNumber: 'SAFE-2024-001',
      relatedProcedures: ['SOP-MFG-003'],
      requiredBy: 'OSHA Safety Standards',
      competencyAreas: ['Machine Safety', 'Emergency Procedures'],
      trainingMethod: 'Classroom',
      cost: 150,
      provider: 'Internal Training Dept',
      location: 'Training Room A',
      attachments: ['certificate.pdf', 'training_materials.pdf']
    },
    {
      id: 'TRN-002',
      employeeId: 'EMP-002',
      employeeName: 'Sarah Wilson',
      trainingTitle: 'ISO 9001:2015 Internal Auditor Certification',
      trainingType: 'Certification',
      category: 'Quality',
      instructor: 'External Consultant',
      trainingDate: new Date('2024-10-20'),
      expirationDate: new Date('2027-10-20'),
      duration: 24,
      status: 'Completed',
      score: 88,
      passingScore: 75,
      attempts: 1,
      maxAttempts: 2,
      certificateNumber: 'ISO-AUDIT-2024-045',
      relatedProcedures: ['SOP-QM-001', 'SOP-QM-002'],
      requiredBy: 'ISO 9001 Certification',
      competencyAreas: ['Audit Planning', 'Non-conformance Identification', 'Report Writing'],
      trainingMethod: 'External',
      cost: 1200,
      provider: 'Quality Training Institute',
      location: 'External Facility',
      notes: 'Excellent performance, recommended for lead auditor training',
      attachments: ['iso_certificate.pdf', 'audit_checklist.pdf']
    },
    {
      id: 'TRN-003',
      employeeId: 'EMP-003',
      employeeName: 'Mike Davis',
      trainingTitle: 'Statistical Process Control (SPC)',
      trainingType: 'Skill Development',
      category: 'Technical',
      instructor: 'Quality Manager',
      trainingDate: new Date('2024-09-10'),
      duration: 16,
      status: 'Completed',
      score: 95,
      passingScore: 70,
      attempts: 1,
      maxAttempts: 3,
      certificateNumber: 'SPC-2024-012',
      relatedProcedures: ['SOP-QC-005', 'WI-SPC-001'],
      requiredBy: 'Quality System Requirements',
      competencyAreas: ['Control Charts', 'Process Capability', 'Statistical Analysis'],
      trainingMethod: 'Workshop',
      cost: 800,
      provider: 'Internal Training Dept',
      location: 'Conference Room B',
      attachments: ['spc_manual.pdf', 'control_chart_templates.xlsx']
    },
    {
      id: 'TRN-004',
      employeeId: 'EMP-001',
      employeeName: 'John Smith',
      trainingTitle: 'New Employee Orientation',
      trainingType: 'Orientation',
      category: 'Compliance',
      instructor: 'HR Manager',
      trainingDate: new Date('2023-06-16'),
      expirationDate: new Date('2024-06-16'),
      duration: 8,
      status: 'Expired',
      score: 85,
      passingScore: 70,
      attempts: 1,
      maxAttempts: 2,
      relatedProcedures: ['HR-001', 'SAFE-001'],
      requiredBy: 'Company Policy',
      competencyAreas: ['Company Policies', 'Safety Basics', 'Quality Awareness'],
      trainingMethod: 'Classroom',
      cost: 100,
      provider: 'Internal HR Dept',
      location: 'Main Conference Room',
      notes: 'Needs refresher training',
      attachments: ['employee_handbook.pdf']
    },
    {
      id: 'TRN-005',
      employeeId: 'EMP-002',
      employeeName: 'Sarah Wilson',
      trainingTitle: 'Measurement System Analysis (MSA)',
      trainingType: 'Procedure Training',
      category: 'Quality',
      instructor: 'Metrology Engineer',
      trainingDate: new Date('2024-12-05'),
      duration: 6,
      status: 'Scheduled',
      passingScore: 80,
      attempts: 0,
      maxAttempts: 3,
      relatedProcedures: ['SOP-MSA-001', 'WI-GAGE-002'],
      requiredBy: 'IATF 16949 Requirements',
      competencyAreas: ['Gage R&R', 'Bias Studies', 'Linearity Analysis'],
      trainingMethod: 'On-the-Job',
      cost: 200,
      provider: 'Internal Training Dept',
      location: 'Metrology Lab',
      attachments: []
    }
  ];

  certifications: Certification[] = [
    {
      id: 'CERT-001',
      name: 'ISO 9001 Internal Auditor',
      issuingBody: 'Quality Training Institute',
      category: 'Industry',
      validityPeriod: 36,
      description: 'Certification for conducting internal quality audits per ISO 9001 standard',
      renewalRequired: true,
      cost: 1200
    },
    {
      id: 'CERT-002',
      name: 'CNC Machine Safety Certification',
      issuingBody: 'Company Safety Department',
      category: 'Internal',
      validityPeriod: 12,
      description: 'Internal certification for safe operation of CNC machinery',
      renewalRequired: true,
      cost: 150
    },
    {
      id: 'CERT-003',
      name: 'Statistical Process Control Specialist',
      issuingBody: 'American Society for Quality',
      category: 'Professional',
      validityPeriod: 24,
      prerequisite: 'Basic Statistics Knowledge',
      description: 'Professional certification in statistical process control methods',
      renewalRequired: true,
      cost: 800
    }
  ];

  filteredRecords = this.trainingRecords;
  searchTerm = '';
  selectedEmployee = '';
  selectedType = '';
  selectedCategory = '';
  selectedStatus = '';
  selectedMethod = '';

  trainingTypes = ['Orientation', 'Procedure Training', 'Certification', 'Safety Training', 'Skill Development', 'Refresher', 'Regulatory'];
  categories = ['Quality', 'Safety', 'Manufacturing', 'Regulatory', 'Technical', 'Leadership', 'Compliance'];
  statuses = ['Scheduled', 'In Progress', 'Completed', 'Failed', 'Expired', 'Cancelled'];
  methods = ['Classroom', 'Online', 'On-the-Job', 'Workshop', 'External', 'Self-Study'];

  displayedColumns = ['employee', 'training', 'type', 'category', 'date', 'status', 'score', 'expiration', 'actions'];

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredRecords = this.trainingRecords.filter(record => {
      const matchesSearch = !this.searchTerm || 
        record.employeeName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        record.trainingTitle.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        record.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesEmployee = !this.selectedEmployee || record.employeeId === this.selectedEmployee;
      const matchesType = !this.selectedType || record.trainingType === this.selectedType;
      const matchesCategory = !this.selectedCategory || record.category === this.selectedCategory;
      const matchesStatus = !this.selectedStatus || record.status === this.selectedStatus;
      const matchesMethod = !this.selectedMethod || record.trainingMethod === this.selectedMethod;
      
      return matchesSearch && matchesEmployee && matchesType && matchesCategory && matchesStatus && matchesMethod;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedEmployee = '';
    this.selectedType = '';
    this.selectedCategory = '';
    this.selectedStatus = '';
    this.selectedMethod = '';
    this.applyFilters();
  }

  viewTrainingRecord(record: TrainingRecord) {
    console.log('Viewing training record:', record.id);
  }

  scheduleTraining(employeeId: string) {
    console.log('Scheduling training for employee:', employeeId);
  }

  takeTest(record: TrainingRecord) {
    console.log('Starting test for:', record.trainingTitle);
  }

  renewCertification(record: TrainingRecord) {
    console.log('Renewing certification:', record.certificateNumber);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed': return 'primary';
      case 'In Progress': return 'accent';
      case 'Scheduled': return 'accent';
      case 'Expired': return 'warn';
      case 'Failed': return 'warn';
      case 'Cancelled': return '';
      default: return '';
    }
  }

  getScoreColor(score: number, passingScore: number): string {
    if (score >= passingScore + 10) return 'success';
    if (score >= passingScore) return 'primary';
    return 'warn';
  }

  isExpiringWithin30Days(expirationDate?: Date): boolean {
    if (!expirationDate) return false;
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    return expirationDate <= thirtyDaysFromNow;
  }

  isExpired(expirationDate?: Date): boolean {
    if (!expirationDate) return false;
    return new Date() > expirationDate;
  }

  getRecordsByStatus(status: string): TrainingRecord[] {
    return this.trainingRecords.filter(record => record.status === status);
  }

  getExpiringCount(): number {
    return this.trainingRecords.filter(record => 
      record.expirationDate && this.isExpiringWithin30Days(record.expirationDate)
    ).length;
  }

  getCompletedThisMonth(): number {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    return this.trainingRecords.filter(record => 
      record.status === 'Completed' &&
      record.trainingDate.getMonth() === thisMonth &&
      record.trainingDate.getFullYear() === thisYear
    ).length;
  }

  getTotalTrainingCost(): number {
    return this.trainingRecords.reduce((total, record) => total + record.cost, 0);
  }

  getAverageScore(): number {
    const completedRecords = this.trainingRecords.filter(record => 
      record.status === 'Completed' && record.score !== undefined
    );
    if (completedRecords.length === 0) return 0;
    const totalScore = completedRecords.reduce((sum, record) => sum + (record.score || 0), 0);
    return Math.round(totalScore / completedRecords.length);
  }
}

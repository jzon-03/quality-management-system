import { Component, OnInit } from '@angular/core';

interface Procedure {
  id: string;
  title: string;
  description: string;
  category: 'Quality Management' | 'Manufacturing' | 'Inspection' | 'Calibration' | 'Training' | 'Safety' | 'Environmental';
  type: 'SOP' | 'Work Instruction' | 'Process Procedure' | 'Test Method' | 'Quality Plan' | 'Checklist';
  version: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Active' | 'Obsolete';
  owner: string;
  department: string;
  approvedBy: string;
  approvalDate: Date;
  effectiveDate: Date;
  nextReviewDate: Date;
  lastReviewDate: Date;
  reviewFrequency: number; // months
  trainingRequired: boolean;
  certificationRequired: boolean;
  relatedDocuments: string[];
  equipmentRequired: string[];
  skillsRequired: string[];
  safetyRequirements: string[];
  estimatedDuration: number; // minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  downloadCount: number;
  usage: 'Active' | 'Rarely Used' | 'Frequently Used';
  tags: string[];
  fileSize: string;
}

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  standalone: false,
  styleUrl: './procedures.component.css'
})
export class ProceduresComponent implements OnInit {
  procedures: Procedure[] = [
    {
      id: 'SOP-QM-001',
      title: 'Incoming Material Inspection Procedure',
      description: 'Detailed procedure for inspecting incoming raw materials and components to ensure quality standards',
      category: 'Quality Management',
      type: 'SOP',
      version: '3.2',
      status: 'Active',
      owner: 'Quality Manager',
      department: 'Quality Assurance',
      approvedBy: 'VP Quality',
      approvalDate: new Date('2024-10-15'),
      effectiveDate: new Date('2024-11-01'),
      nextReviewDate: new Date('2025-11-01'),
      lastReviewDate: new Date('2024-10-10'),
      reviewFrequency: 12,
      trainingRequired: true,
      certificationRequired: false,
      relatedDocuments: ['FORM-001', 'WI-INS-002'],
      equipmentRequired: ['Calipers', 'Coordinate Measuring Machine', 'Visual Inspection Lamp'],
      skillsRequired: ['Basic Measurement', 'GD&T Reading', 'Material Identification'],
      safetyRequirements: ['Safety Glasses', 'Gloves'],
      estimatedDuration: 45,
      difficulty: 'Intermediate',
      downloadCount: 156,
      usage: 'Frequently Used',
      tags: ['inspection', 'incoming', 'materials', 'quality'],
      fileSize: '2.8 MB'
    },
    {
      id: 'SOP-MFG-003',
      title: 'CNC Machine Setup and Operation',
      description: 'Standard operating procedure for setting up and operating CNC machining centers',
      category: 'Manufacturing',
      type: 'SOP',
      version: '2.1',
      status: 'Active',
      owner: 'Manufacturing Engineer',
      department: 'Production',
      approvedBy: 'Manufacturing Manager',
      approvalDate: new Date('2024-09-20'),
      effectiveDate: new Date('2024-10-01'),
      nextReviewDate: new Date('2025-04-01'),
      lastReviewDate: new Date('2024-09-15'),
      reviewFrequency: 6,
      trainingRequired: true,
      certificationRequired: true,
      relatedDocuments: ['WI-SAFE-001', 'CHKLIST-CNC-001'],
      equipmentRequired: ['CNC Machine', 'Cutting Tools', 'Measuring Equipment', 'Safety Equipment'],
      skillsRequired: ['CNC Programming', 'Blueprint Reading', 'Tool Selection', 'Machine Operation'],
      safetyRequirements: ['Safety Glasses', 'Steel-toed Boots', 'Machine Guard Verification'],
      estimatedDuration: 120,
      difficulty: 'Advanced',
      downloadCount: 89,
      usage: 'Frequently Used',
      tags: ['cnc', 'machining', 'setup', 'manufacturing'],
      fileSize: '4.2 MB'
    },
    {
      id: 'WI-CAL-005',
      title: 'Gauge Block Calibration Work Instruction',
      description: 'Step-by-step work instruction for calibrating precision gauge blocks',
      category: 'Calibration',
      type: 'Work Instruction',
      version: '1.8',
      status: 'Active',
      owner: 'Metrology Technician',
      department: 'Quality Assurance',
      approvedBy: 'Quality Manager',
      approvalDate: new Date('2024-08-10'),
      effectiveDate: new Date('2024-08-15'),
      nextReviewDate: new Date('2025-08-15'),
      lastReviewDate: new Date('2024-08-05'),
      reviewFrequency: 12,
      trainingRequired: true,
      certificationRequired: true,
      relatedDocuments: ['SOP-CAL-001', 'CERT-CAL-REQ'],
      equipmentRequired: ['Gauge Blocks', 'Comparator', 'Environmental Controls'],
      skillsRequired: ['Precision Measurement', 'Calibration Procedures', 'Environmental Awareness'],
      safetyRequirements: ['Clean Room Protocol', 'ESD Protection'],
      estimatedDuration: 90,
      difficulty: 'Advanced',
      downloadCount: 34,
      usage: 'Rarely Used',
      tags: ['calibration', 'gauge blocks', 'metrology'],
      fileSize: '1.5 MB'
    },
    {
      id: 'SOP-TRN-002',
      title: 'New Employee Quality Training Program',
      description: 'Comprehensive training program for new employees on quality procedures and standards',
      category: 'Training',
      type: 'Quality Plan',
      version: '4.0',
      status: 'Under Review',
      owner: 'Training Coordinator',
      department: 'Human Resources',
      approvedBy: 'HR Director',
      approvalDate: new Date('2024-11-01'),
      effectiveDate: new Date('2024-12-01'),
      nextReviewDate: new Date('2025-06-01'),
      lastReviewDate: new Date('2024-10-25'),
      reviewFrequency: 6,
      trainingRequired: false,
      certificationRequired: false,
      relatedDocuments: ['TRN-MATRIX-001', 'EVAL-FORM-002'],
      equipmentRequired: ['Training Materials', 'Presentation Equipment'],
      skillsRequired: ['Training Delivery', 'Assessment'],
      safetyRequirements: [],
      estimatedDuration: 480, // 8 hours
      difficulty: 'Beginner',
      downloadCount: 67,
      usage: 'Active',
      tags: ['training', 'onboarding', 'quality', 'new employee'],
      fileSize: '3.1 MB'
    },
    {
      id: 'CHKLIST-FINAL-001',
      title: 'Final Inspection Checklist',
      description: 'Comprehensive checklist for final product inspection before shipment',
      category: 'Inspection',
      type: 'Checklist',
      version: '2.3',
      status: 'Active',
      owner: 'QC Inspector',
      department: 'Quality Control',
      approvedBy: 'Quality Manager',
      approvalDate: new Date('2024-07-15'),
      effectiveDate: new Date('2024-08-01'),
      nextReviewDate: new Date('2025-02-01'),
      lastReviewDate: new Date('2024-07-10'),
      reviewFrequency: 6,
      trainingRequired: true,
      certificationRequired: false,
      relatedDocuments: ['SOP-FINAL-001', 'SPEC-PROD-001'],
      equipmentRequired: ['Inspection Tools', 'Test Equipment'],
      skillsRequired: ['Product Knowledge', 'Inspection Techniques'],
      safetyRequirements: ['Safety Glasses'],
      estimatedDuration: 30,
      difficulty: 'Intermediate',
      downloadCount: 203,
      usage: 'Frequently Used',
      tags: ['final inspection', 'checklist', 'shipping'],
      fileSize: '0.8 MB'
    }
  ];

  filteredProcedures = this.procedures;
  searchTerm = '';
  selectedCategory = '';
  selectedType = '';
  selectedStatus = '';
  selectedDifficulty = '';
  selectedUsage = '';

  categories = ['Quality Management', 'Manufacturing', 'Inspection', 'Calibration', 'Training', 'Safety', 'Environmental'];
  types = ['SOP', 'Work Instruction', 'Process Procedure', 'Test Method', 'Quality Plan', 'Checklist'];
  statuses = ['Draft', 'Under Review', 'Approved', 'Active', 'Obsolete'];
  difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  usageTypes = ['Active', 'Rarely Used', 'Frequently Used'];

  displayedColumns = ['id', 'title', 'category', 'type', 'version', 'status', 'owner', 'nextReview', 'actions'];

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProcedures = this.procedures.filter(proc => {
      const matchesSearch = !this.searchTerm || 
        proc.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        proc.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        proc.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        proc.tags.some(tag => tag.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesCategory = !this.selectedCategory || proc.category === this.selectedCategory;
      const matchesType = !this.selectedType || proc.type === this.selectedType;
      const matchesStatus = !this.selectedStatus || proc.status === this.selectedStatus;
      const matchesDifficulty = !this.selectedDifficulty || proc.difficulty === this.selectedDifficulty;
      const matchesUsage = !this.selectedUsage || proc.usage === this.selectedUsage;
      
      return matchesSearch && matchesCategory && matchesType && matchesStatus && matchesDifficulty && matchesUsage;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.selectedType = '';
    this.selectedStatus = '';
    this.selectedDifficulty = '';
    this.selectedUsage = '';
    this.applyFilters();
  }

  viewProcedure(proc: Procedure) {
    console.log('Viewing procedure:', proc.id);
    proc.downloadCount++;
  }

  editProcedure(proc: Procedure) {
    console.log('Editing procedure:', proc.id);
  }

  downloadProcedure(proc: Procedure) {
    console.log('Downloading procedure:', proc.id);
    proc.downloadCount++;
  }

  startTraining(proc: Procedure) {
    console.log('Starting training for:', proc.id);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Active': return 'primary';
      case 'Approved': return 'primary';
      case 'Under Review': return 'accent';
      case 'Draft': return 'warn';
      case 'Obsolete': return '';
      default: return '';
    }
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Beginner': return 'primary';
      case 'Intermediate': return 'accent';
      case 'Advanced': return 'warn';
      default: return '';
    }
  }

  isReviewDueSoon(reviewDate: Date): boolean {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    return reviewDate <= thirtyDaysFromNow;
  }

  getDaysUntilReview(reviewDate: Date): number {
    const today = new Date();
    const diffTime = reviewDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getProceduresByCategory(category: string): Procedure[] {
    return this.procedures.filter(proc => proc.category === category);
  }

  getProceduresByStatus(status: string): Procedure[] {
    return this.procedures.filter(proc => proc.status === status);
  }

  getTrainingRequiredCount(): number {
    return this.procedures.filter(proc => proc.trainingRequired).length;
  }

  getReviewDueCount(): number {
    return this.procedures.filter(proc => this.isReviewDueSoon(proc.nextReviewDate)).length;
  }

  getTotalDownloads(): number {
    return this.procedures.reduce((total, proc) => total + proc.downloadCount, 0);
  }
}

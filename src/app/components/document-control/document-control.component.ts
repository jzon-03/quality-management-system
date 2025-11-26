import { Component, OnInit } from '@angular/core';

interface Document {
  id: string;
  title: string;
  type: 'Procedure' | 'Policy' | 'Form' | 'Manual' | 'Specification' | 'Record';
  version: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Obsolete';
  approvedBy: string;
  approvalDate: Date;
  effectiveDate: Date;
  reviewDate: Date;
  department: string;
  owner: string;
  description: string;
  fileSize: string;
  downloadCount: number;
}

@Component({
  selector: 'app-document-control',
  standalone: false,
  templateUrl: './document-control.component.html',
  styleUrl: './document-control.component.css',
})
export class DocumentControlComponent implements OnInit {
  documents: Document[] = [
    {
      id: 'QP-001',
      title: 'Quality Policy',
      type: 'Policy',
      version: '2.1',
      status: 'Approved',
      approvedBy: 'Quality Manager',
      approvalDate: new Date('2024-01-15'),
      effectiveDate: new Date('2024-02-01'),
      reviewDate: new Date('2025-02-01'),
      department: 'Quality',
      owner: 'John Smith',
      description: 'Corporate quality policy and commitment statement',
      fileSize: '1.2 MB',
      downloadCount: 45
    },
    {
      id: 'QP-002',
      title: 'Document Control Procedure',
      type: 'Procedure',
      version: '3.0',
      status: 'Under Review',
      approvedBy: 'Quality Director',
      approvalDate: new Date('2024-10-01'),
      effectiveDate: new Date('2024-11-01'),
      reviewDate: new Date('2025-11-01'),
      department: 'Quality',
      owner: 'Sarah Johnson',
      description: 'Procedures for creating, reviewing, and maintaining controlled documents',
      fileSize: '2.8 MB',
      downloadCount: 23
    },
    {
      id: 'SOP-101',
      title: 'Incoming Material Inspection',
      type: 'Procedure',
      version: '1.5',
      status: 'Approved',
      approvedBy: 'Operations Manager',
      approvalDate: new Date('2024-08-15'),
      effectiveDate: new Date('2024-09-01'),
      reviewDate: new Date('2025-09-01'),
      department: 'Production',
      owner: 'Mike Wilson',
      description: 'Standard operating procedure for incoming material inspection',
      fileSize: '3.1 MB',
      downloadCount: 67
    },
    {
      id: 'FORM-001',
      title: 'Non-Conformance Report Form',
      type: 'Form',
      version: '2.0',
      status: 'Approved',
      approvedBy: 'Quality Manager',
      approvalDate: new Date('2024-06-10'),
      effectiveDate: new Date('2024-07-01'),
      reviewDate: new Date('2025-07-01'),
      department: 'Quality',
      owner: 'Lisa Brown',
      description: 'Standard form for reporting non-conformances',
      fileSize: '0.5 MB',
      downloadCount: 134
    }
  ];

  filteredDocuments = this.documents;
  searchTerm = '';
  selectedType = '';
  selectedStatus = '';
  selectedDepartment = '';

  documentTypes = ['Procedure', 'Policy', 'Form', 'Manual', 'Specification', 'Record'];
  documentStatuses = ['Draft', 'Under Review', 'Approved', 'Obsolete'];
  departments = ['Quality', 'Production', 'Engineering', 'HR', 'Finance'];

  displayedColumns = ['id', 'title', 'type', 'version', 'status', 'approvedBy', 'effectiveDate', 'actions'];

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredDocuments = this.documents.filter(doc => {
      const matchesSearch = !this.searchTerm || 
        doc.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesType = !this.selectedType || doc.type === this.selectedType;
      const matchesStatus = !this.selectedStatus || doc.status === this.selectedStatus;
      const matchesDepartment = !this.selectedDepartment || doc.department === this.selectedDepartment;
      
      return matchesSearch && matchesType && matchesStatus && matchesDepartment;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedType = '';
    this.selectedStatus = '';
    this.selectedDepartment = '';
    this.applyFilters();
  }

  downloadDocument(doc: Document) {
    console.log('Downloading document:', doc.title);
    // Implement download logic here
  }

  viewDocument(doc: Document) {
    console.log('Viewing document:', doc.title);
    // Implement view logic here
  }

  editDocument(doc: Document) {
    console.log('Editing document:', doc.title);
    // Implement edit logic here
  }

  deleteDocument(doc: Document) {
    console.log('Deleting document:', doc.title);
    // Implement delete logic here
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Approved': return 'primary';
      case 'Under Review': return 'accent';
      case 'Draft': return 'warn';
      case 'Obsolete': return '';
      default: return '';
    }
  }

  isDocumentExpiringSoon(reviewDate: Date): boolean {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    return reviewDate <= thirtyDaysFromNow;
  }

  getDocumentsByStatus(status: string): Document[] {
    return this.documents.filter(doc => doc.status === status);
  }
}

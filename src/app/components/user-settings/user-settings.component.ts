import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// Interfaces
interface UserStatistics {
  activeUsers: number;
  inactiveUsers: number;
  adminUsers: number;
  pendingUsers: number;
  totalRoles: number;
  totalPermissions: number;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  lastLogin: Date;
  lastLoginLocation: string;
  avatar?: string;
  createdDate: Date;
  permissions: string[];
}

interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystemRole: boolean;
}

interface Permission {
  key: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

interface ActivityLog {
  id: string;
  timestamp: Date;
  userName: string;
  userRole: string;
  action: string;
  target: string;
  description: string;
  activityType: string;
  status: 'Success' | 'Failed' | 'Warning';
  ipAddress: string;
  userAgent: string;
}

interface SystemSettings {
  passwordMinLength: number;
  sessionTimeout: number;
  requirePasswordComplexity: boolean;
  enableTwoFactor: boolean;
  enableAccountLockout: boolean;
  maxFailedAttempts: number;
  lockoutDuration: number;
  enableUserActivityLogging: boolean;
  enableSystemAuditTrail: boolean;
  logRetentionDays: number;
  backupFrequency: string;
  enableEmailNotifications: boolean;
  notifyUserCreation: boolean;
  notifyPasswordReset: boolean;
  notifyRoleChanges: boolean;
  notifySecurityEvents: boolean;
}

@Component({
  selector: 'app-user-settings',
  standalone: false,
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css',
})
export class UserSettingsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Tab management
  selectedTab = 0;

  // User Statistics
  userStatistics: UserStatistics = {
    activeUsers: 24,
    inactiveUsers: 3,
    adminUsers: 5,
    pendingUsers: 2,
    totalRoles: 8,
    totalPermissions: 45
  };

  // Users Management
  users: User[] = [];
  filteredUsers = new MatTableDataSource<User>([]);
  userColumns = ['user', 'role', 'department', 'status', 'lastLogin', 'actions'];
  userSearchTerm = '';
  selectedRoleFilter = '';
  selectedStatusFilter = '';

  // Roles and Permissions
  roles: Role[] = [];
  permissions: Permission[] = [];
  permissionMatrix: Permission[] = [];
  matrixColumns: string[] = ['permission'];

  // System Settings
  systemSettingsForm!: FormGroup;

  // Activity Log
  activityLogs: ActivityLog[] = [];
  filteredLogs = new MatTableDataSource<ActivityLog>([]);
  logColumns = ['timestamp', 'user', 'activity', 'details', 'status'];
  selectedUserFilter = '';
  selectedActivityFilter = '';
  logDateRange = { start: null as Date | null, end: null as Date | null };

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.initializeSystemSettingsForm();
    this.initializeMockData();
  }

  ngOnInit(): void {
    this.loadUserStatistics();
    this.loadUsers();
    this.loadRoles();
    this.loadPermissions();
    this.loadActivityLogs();
    this.setupMatrixColumns();
  }

  private initializeSystemSettingsForm(): void {
    this.systemSettingsForm = this.fb.group({
      // Security Settings
      passwordMinLength: [8, [Validators.required, Validators.min(6), Validators.max(20)]],
      sessionTimeout: [30, [Validators.required, Validators.min(5), Validators.max(480)]],
      requirePasswordComplexity: [true],
      enableTwoFactor: [false],
      enableAccountLockout: [true],
      maxFailedAttempts: [5, [Validators.min(3), Validators.max(10)]],
      lockoutDuration: [15, [Validators.min(5), Validators.max(60)]],
      
      // Audit Settings
      enableUserActivityLogging: [true],
      enableSystemAuditTrail: [true],
      logRetentionDays: [90, [Validators.min(30), Validators.max(365)]],
      backupFrequency: ['weekly'],
      
      // Email Notifications
      enableEmailNotifications: [true],
      notifyUserCreation: [true],
      notifyPasswordReset: [true],
      notifyRoleChanges: [true],
      notifySecurityEvents: [true]
    });
  }

  private initializeMockData(): void {
    // Initialize mock users
    this.users = [
      {
        id: '1',
        fullName: 'John Smith',
        email: 'john.smith@company.com',
        role: 'Administrator',
        department: 'IT',
        position: 'System Administrator',
        status: 'active',
        lastLogin: new Date('2024-11-28T10:30:00'),
        lastLoginLocation: 'New York, NY',
        avatar: '',
        createdDate: new Date('2024-01-15'),
        permissions: ['user_management', 'system_settings', 'audit_logs']
      },
      {
        id: '2',
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        role: 'Quality Manager',
        department: 'Quality',
        position: 'Quality Assurance Manager',
        status: 'active',
        lastLogin: new Date('2024-11-28T09:15:00'),
        lastLoginLocation: 'Chicago, IL',
        avatar: '',
        createdDate: new Date('2024-02-10'),
        permissions: ['quality_procedures', 'inspections', 'ncr_management']
      },
      {
        id: '3',
        fullName: 'Mike Davis',
        email: 'mike.davis@company.com',
        role: 'Inspector',
        department: 'Production',
        position: 'Quality Inspector',
        status: 'active',
        lastLogin: new Date('2024-11-28T08:00:00'),
        lastLoginLocation: 'Detroit, MI',
        avatar: '',
        createdDate: new Date('2024-03-05'),
        permissions: ['inspections', 'measurements']
      },
      {
        id: '4',
        fullName: 'Lisa Brown',
        email: 'lisa.brown@company.com',
        role: 'Operator',
        department: 'Production',
        position: 'Production Operator',
        status: 'inactive',
        lastLogin: new Date('2024-11-25T16:45:00'),
        lastLoginLocation: 'Phoenix, AZ',
        avatar: '',
        createdDate: new Date('2024-04-20'),
        permissions: ['basic_access']
      },
      {
        id: '5',
        fullName: 'David Wilson',
        email: 'david.wilson@company.com',
        role: 'Supervisor',
        department: 'Production',
        position: 'Production Supervisor',
        status: 'pending',
        lastLogin: new Date('2024-11-27T14:20:00'),
        lastLoginLocation: 'Seattle, WA',
        avatar: '',
        createdDate: new Date('2024-11-20'),
        permissions: ['production_oversight', 'team_management']
      }
    ];

    // Initialize mock roles
    this.roles = [
      {
        id: '1',
        name: 'Administrator',
        displayName: 'System Administrator',
        description: 'Full system access with all permissions',
        permissions: ['user_management', 'system_settings', 'audit_logs', 'all_modules'],
        userCount: 2,
        isSystemRole: true
      },
      {
        id: '2',
        name: 'Quality Manager',
        displayName: 'Quality Manager',
        description: 'Manage quality processes, procedures, and inspections',
        permissions: ['quality_procedures', 'inspections', 'ncr_management', 'capa_management', 'training'],
        userCount: 3,
        isSystemRole: false
      },
      {
        id: '3',
        name: 'Inspector',
        displayName: 'Quality Inspector',
        description: 'Perform inspections and quality checks',
        permissions: ['inspections', 'measurements', 'ncr_create', 'reports_view'],
        userCount: 8,
        isSystemRole: false
      },
      {
        id: '4',
        name: 'Supervisor',
        displayName: 'Production Supervisor',
        description: 'Oversee production operations and team management',
        permissions: ['production_oversight', 'team_management', 'schedule_management'],
        userCount: 5,
        isSystemRole: false
      },
      {
        id: '5',
        name: 'Operator',
        displayName: 'Production Operator',
        description: 'Basic production floor access',
        permissions: ['basic_access', 'work_instructions'],
        userCount: 15,
        isSystemRole: false
      }
    ];

    // Initialize mock permissions
    this.permissions = [
      { key: 'user_management', name: 'User Management', description: 'Create, edit, and manage user accounts', icon: 'people', category: 'Administration' },
      { key: 'system_settings', name: 'System Settings', description: 'Configure system-wide settings', icon: 'settings', category: 'Administration' },
      { key: 'audit_logs', name: 'Audit Logs', description: 'View system audit trails', icon: 'history', category: 'Administration' },
      { key: 'quality_procedures', name: 'Quality Procedures', description: 'Manage SOPs and procedures', icon: 'menu_book', category: 'Quality' },
      { key: 'inspections', name: 'Inspections', description: 'Perform quality inspections', icon: 'fact_check', category: 'Quality' },
      { key: 'ncr_management', name: 'NCR Management', description: 'Manage non-conformance reports', icon: 'report_problem', category: 'Quality' },
      { key: 'capa_management', name: 'CAPA Management', description: 'Manage corrective actions', icon: 'build_circle', category: 'Quality' },
      { key: 'training', name: 'Training Management', description: 'Manage training programs', icon: 'school', category: 'Quality' },
      { key: 'production_oversight', name: 'Production Oversight', description: 'Monitor production activities', icon: 'precision_manufacturing', category: 'Production' },
      { key: 'team_management', name: 'Team Management', description: 'Manage team assignments', icon: 'group', category: 'Production' }
    ];

    // Initialize activity logs
    this.activityLogs = [
      {
        id: '1',
        timestamp: new Date('2024-11-28T10:30:00'),
        userName: 'John Smith',
        userRole: 'Administrator',
        action: 'User Created',
        target: 'David Wilson',
        description: 'Created new user account for David Wilson',
        activityType: 'user_management',
        status: 'Success',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      {
        id: '2',
        timestamp: new Date('2024-11-28T09:45:00'),
        userName: 'Sarah Johnson',
        userRole: 'Quality Manager',
        action: 'Permission Modified',
        target: 'Inspector Role',
        description: 'Added NCR creation permission to Inspector role',
        activityType: 'role_management',
        status: 'Success',
        ipAddress: '192.168.1.105',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      {
        id: '3',
        timestamp: new Date('2024-11-28T08:15:00'),
        userName: 'Mike Davis',
        userRole: 'Inspector',
        action: 'Failed Login',
        target: 'Self',
        description: 'Failed login attempt - incorrect password',
        activityType: 'security_events',
        status: 'Failed',
        ipAddress: '192.168.1.110',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    ];

    this.permissionMatrix = this.permissions;
  }

  private setupMatrixColumns(): void {
    this.matrixColumns = ['permission', ...this.roles.map(role => role.name)];
  }

  private loadUserStatistics(): void {
    // Calculate statistics from users array
    this.userStatistics = {
      activeUsers: this.users.filter(u => u.status === 'active').length,
      inactiveUsers: this.users.filter(u => u.status === 'inactive').length,
      adminUsers: this.users.filter(u => u.role === 'Administrator').length,
      pendingUsers: this.users.filter(u => u.status === 'pending').length,
      totalRoles: this.roles.length,
      totalPermissions: this.permissions.length
    };
  }

  private loadUsers(): void {
    this.filteredUsers.data = this.users;
    this.filteredUsers.paginator = this.paginator;
  }

  private loadRoles(): void {
    // Roles already initialized in constructor
  }

  private loadPermissions(): void {
    // Permissions already initialized in constructor
  }

  private loadActivityLogs(): void {
    this.filteredLogs.data = this.activityLogs;
  }

  // User Management Methods
  filterUsers(): void {
    let filtered = this.users;

    if (this.userSearchTerm) {
      const searchTerm = this.userSearchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.fullName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm)
      );
    }

    if (this.selectedRoleFilter) {
      filtered = filtered.filter(user => user.role === this.selectedRoleFilter);
    }

    if (this.selectedStatusFilter) {
      filtered = filtered.filter(user => user.status === this.selectedStatusFilter);
    }

    this.filteredUsers.data = filtered;
  }

  clearUserSearch(): void {
    this.userSearchTerm = '';
    this.filterUsers();
  }

  addUser(): void {
    // Open add user dialog
    this.showSnackBar('Add User dialog would open here');
  }

  editUser(user: User): void {
    this.showSnackBar(`Edit user: ${user.fullName}`);
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user: ${user.fullName}?`)) {
      this.users = this.users.filter(u => u.id !== user.id);
      this.filterUsers();
      this.loadUserStatistics();
      this.showSnackBar(`User ${user.fullName} deleted successfully`);
    }
  }

  toggleUserStatus(user: User): void {
    user.status = user.status === 'active' ? 'inactive' : 'active';
    this.loadUserStatistics();
    this.showSnackBar(`User ${user.fullName} ${user.status === 'active' ? 'activated' : 'deactivated'}`);
  }

  managePermissions(user: User): void {
    this.showSnackBar(`Manage permissions for: ${user.fullName}`);
  }

  resetPassword(user: User): void {
    this.showSnackBar(`Password reset email sent to: ${user.email}`);
  }

  exportUsers(): void {
    this.showSnackBar('User list exported successfully');
  }

  refreshData(): void {
    this.loadUsers();
    this.loadUserStatistics();
    this.showSnackBar('Data refreshed');
  }

  // Role Management Methods
  getRoleIcon(role: string): string {
    const roleIcons: {[key: string]: string} = {
      'Administrator': 'admin_panel_settings',
      'Quality Manager': 'verified_user',
      'Inspector': 'fact_check',
      'Supervisor': 'supervisor_account',
      'Operator': 'engineering',
      'default': 'person'
    };
    return roleIcons[role] || roleIcons['default'];
  }

  addRole(): void {
    this.showSnackBar('Add Role dialog would open here');
  }

  editRole(role: Role): void {
    this.showSnackBar(`Edit role: ${role.displayName}`);
  }

  deleteRole(role: Role): void {
    if (role.isSystemRole) {
      this.showSnackBar('Cannot delete system roles');
      return;
    }
    if (confirm(`Are you sure you want to delete role: ${role.displayName}?`)) {
      this.roles = this.roles.filter(r => r.id !== role.id);
      this.setupMatrixColumns();
      this.showSnackBar(`Role ${role.displayName} deleted successfully`);
    }
  }

  // Permission Management Methods
  hasPermission(roleName: string, permissionKey: string): boolean {
    const role = this.roles.find(r => r.name === roleName);
    return role ? role.permissions.includes(permissionKey) : false;
  }

  togglePermission(roleName: string, permissionKey: string, checked: boolean): void {
    const role = this.roles.find(r => r.name === roleName);
    if (role) {
      if (checked) {
        if (!role.permissions.includes(permissionKey)) {
          role.permissions.push(permissionKey);
        }
      } else {
        role.permissions = role.permissions.filter(p => p !== permissionKey);
      }
      this.showSnackBar(`Permission ${checked ? 'granted' : 'revoked'} for ${role.displayName}`);
    }
  }

  exportPermissions(): void {
    this.showSnackBar('Permissions matrix exported successfully');
  }

  resetPermissions(): void {
    if (confirm('Are you sure you want to reset all permissions to default values?')) {
      this.showSnackBar('Permissions reset to defaults');
    }
  }

  // System Settings Methods
  saveSystemSettings(): void {
    if (this.systemSettingsForm.valid) {
      this.showSnackBar('System settings saved successfully');
    } else {
      this.showSnackBar('Please correct the form errors');
    }
  }

  resetSystemSettings(): void {
    if (confirm('Are you sure you want to reset system settings to defaults?')) {
      this.initializeSystemSettingsForm();
      this.showSnackBar('System settings reset to defaults');
    }
  }

  cleanupSessions(): void {
    this.showSnackBar('Inactive sessions cleaned up successfully');
  }

  archiveLogs(): void {
    this.showSnackBar('Audit logs archived successfully');
  }

  exportSettings(): void {
    this.showSnackBar('System settings exported successfully');
  }

  // Activity Log Methods
  filterLogs(): void {
    let filtered = this.activityLogs;

    if (this.selectedUserFilter) {
      filtered = filtered.filter(log => log.userName.includes(this.selectedUserFilter));
    }

    if (this.selectedActivityFilter) {
      filtered = filtered.filter(log => log.activityType === this.selectedActivityFilter);
    }

    if (this.logDateRange.start && this.logDateRange.end) {
      filtered = filtered.filter(log => 
        log.timestamp >= this.logDateRange.start! && 
        log.timestamp <= this.logDateRange.end!
      );
    }

    this.filteredLogs.data = filtered;
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }

  getActivityIcon(activityType: string): string {
    const activityIcons: {[key: string]: string} = {
      'login': 'login',
      'user_management': 'people',
      'role_management': 'admin_panel_settings',
      'permission_changes': 'security',
      'system_settings': 'settings',
      'security_events': 'warning',
      'default': 'info'
    };
    return activityIcons[activityType] || activityIcons['default'];
  }

  getBrowserInfo(userAgent: string): string {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  exportLogs(): void {
    this.showSnackBar('Activity logs exported successfully');
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}

import { Component, signal, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface QMSMenuItem {
  id: number;
  name: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('quality-management-system');
  
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  isMobile = false;
  private destroy$ = new Subject<void>();
  
  qmsMenu: QMSMenuItem[] = [
    { id: 1, name: "Dashboard", route: "/dashboard", icon: "dashboard" },
    { id: 2, name: "Document Control", route: "/document-control", icon: "description" },
    { id: 3, name: "Non-Conformance Reports (NCR)", route: "/ncr", icon: "report_problem" },
    { id: 4, name: "Corrective & Preventive Actions (CAPA)", route: "/capa", icon: "build_circle" },
    { id: 5, name: "Audit Management", route: "/audits", icon: "fact_check" },
    { id: 6, name: "Training Records", route: "/training", icon: "school" },
    { id: 7, name: "Quality Procedures & SOPs", route: "/sop-library", icon: "menu_book" },
    { id: 8, name: "Inspection Plans", route: "/inspection-plans", icon: "assignment_turned_in" },
    { id: 9, name: "Incoming Material Inspection", route: "/incoming-inspection", icon: "inventory_2" },
    { id: 10, name: "In-Process Inspection", route: "/inprocess-inspection", icon: "precision_manufacturing" },
    { id: 11, name: "Final Inspection", route: "/final-inspection", icon: "task_alt" },
    { id: 12, name: "Calibration Management", route: "/calibration", icon: "tune" },
    { id: 13, name: "Supplier Quality Management", route: "/suppliers", icon: "handshake" },
    { id: 14, name: "Quality Alerts", route: "/quality-alerts", icon: "warning" },
    { id: 15, name: "Deviation / Concession Requests", route: "/deviations", icon: "compare_arrows" },
    { id: 16, name: "Risk Management (FMEA)", route: "/risk-management", icon: "assessment" },
    { id: 17, name: "Customer Complaints", route: "/complaints", icon: "support_agent" },
    { id: 18, name: "KPI & Reporting", route: "/reports", icon: "insights" },
    { id: 19, name: "Tasks & Approvals", route: "/workflow", icon: "checklist_rtl" },
    { id: 20, name: "Settings & User Management", route: "/settings", icon: "settings" }
  ];
  
  constructor(private breakpointObserver: BreakpointObserver) {}
  
  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isMobile = result.matches;
        if (this.sidenav) {
          if (this.isMobile) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        }
      });
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  toggleSidenav() {
    this.sidenav.toggle();
  }
  
  onMenuItemClick() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }
}

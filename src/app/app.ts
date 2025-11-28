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
    { id: 3, name: "Quality Procedures / SOP", route: "/procedures", icon: "menu_book" },
    { id: 4, name: "Training & Certifications", route: "/training", icon: "school" },
    { id: 5, name: "Non-Conformance Reports (NCR)", route: "/ncr", icon: "report_problem" },

    { id: 6, name: "Corrective Actions (CAPA)", route: "/capa", icon: "build_circle" },
    { id: 7, name: "Deviation / MRB Review", route: "/mrb", icon: "gavel" },

    { id: 8, name: "AS9102 First Article Inspection (FAI)", route: "/fai", icon: "assignment" },
    { id: 9, name: "In-Process Inspection", route: "/ipi", icon: "precision_manufacturing" },
    { id: 10, name: "Final Inspection", route: "/final-inspection", icon: "task_alt" },
    { id: 11, name: "Incoming Material Inspection", route: "/incoming", icon: "inventory_2" },
    // { id: 12, name: "Gauge Calibration / MTE", route: "/calibration", icon: "tune" },

    // { id: 13, name: "Tooling & Fixture Management", route: "/tooling", icon: "construction" },
    // { id: 14, name: "Material Lot Traceability", route: "/traceability", icon: "qr_code_2" },
    // { id: 15, name: "Process Control Plans", route: "/control-plans", icon: "assignment_turned_in" },

    // { id: 16, name: "Supplier Quality", route: "/suppliers", icon: "handshake" },
    // { id: 17, name: "Customer Complaints", route: "/complaints", icon: "support_agent" },

    // { id: 18, name: "Internal & Supplier Audits", route: "/audits", icon: "fact_check" },
    // { id: 19, name: "Risk Management (FMEA)", route: "/fmea", icon: "assessment" },
    // { id: 20, name: "KPIs & Reports", route: "/reports", icon: "insights" },

    { id: 21, name: "User & Permission Settings", route: "/settings", icon: "settings" }
  ];

  constructor(private breakpointObserver: BreakpointObserver) { }

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

# Quality Management System (QMS)

A comprehensive Quality Management System built with Angular 18+ and Material Design, featuring inspection workflows, user management, and compliance tracking.

## 🌐 Live Deployment

**Production URL**: [https://qms.sharpfloornc.com](https://qms.sharpfloornc.com)

This application is automatically deployed to GitHub Pages with custom domain support and Angular routing compatibility.

## ⭐ Features

### 📋 Inspection Modules
- **In-Process Inspection (IPI)** - Modular sub-components for production quality checks
- **Final Inspection** - Multi-tab approval workflow with packaging requirements  
- **Incoming Material Inspection** - Supplier quality verification and receipt inspection

### 👥 User Management
- **User & Permission Settings** - Complete role-based access control
- **Activity Logging** - Comprehensive audit trail
- **System Settings** - Security, notifications, and maintenance

### 📊 Quality Processes
- **Document Control** - Version management and approval workflows
- **Non-Conformance Reports (NCR)** - Issue tracking and resolution
- **Corrective Actions (CAPA)** - Systematic improvement processes
- **Training & Certifications** - Personnel qualification management

## 🚀 Quick Deployment

```bash
# Deploy to GitHub Pages
npm run deploy:gh-pages
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

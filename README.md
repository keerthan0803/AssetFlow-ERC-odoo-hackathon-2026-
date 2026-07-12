# 🚀 AssetFlow – Enterprise Asset & Resource Management System

> **A modern ERP solution for managing organizational assets, shared resources, maintenance, audits, and lifecycle tracking through secure role-based workflows.**

---

## 📖 Overview

AssetFlow is a comprehensive **Enterprise Asset & Resource Management System (ERP)** designed to help organizations digitize and streamline the management of physical assets and shared resources.

Organizations often rely on spreadsheets, paper records, and manual approvals to manage laptops, furniture, vehicles, meeting rooms, lab equipment, and other assets. These approaches result in:

- Asset loss
- Duplicate allocations
- Booking conflicts
- Missed maintenance
- Lack of operational visibility
- Manual auditing
- Poor accountability

AssetFlow solves these challenges by providing a centralized, secure, and scalable platform that manages the complete lifecycle of organizational assets.

---

# 🎯 Problem Statement

Organizations struggle with:

- Manual asset tracking
- No centralized asset inventory
- Double allocation of assets
- Overlapping meeting room/resource bookings
- Inefficient maintenance approval process
- Difficult audit management
- Lack of real-time visibility
- Missing accountability
- No historical asset tracking
- Poor reporting and analytics

AssetFlow digitizes these operations through an ERP platform built with enterprise-grade architecture.

---

# 🌟 Key Features

## 🔐 Authentication & Security

- Secure Login
- Employee Signup
- JWT Authentication
- Password Encryption
- Forgot Password
- Session Validation
- Role-based Authorization
- Secure API Access

---

## 👥 Role-Based Access Control

### Admin

- Manage Departments
- Manage Employees
- Promote Employees
- Create Asset Managers
- Assign Department Heads
- Manage Categories
- View Reports
- View Analytics

---

### Asset Manager

- Register Assets
- Allocate Assets
- Approve Transfers
- Approve Maintenance
- Manage Returns
- View Reports

---

### Department Head

- View Department Assets
- Approve Allocation Requests
- Approve Transfers
- Book Resources

---

### Employee

- View Assigned Assets
- Book Resources
- Raise Maintenance Requests
- Request Transfers
- Request Returns

---

# 🏢 Organization Management

Manage:

- Departments
- Parent Departments
- Asset Categories
- Employee Directory
- Organization Structure

Supports hierarchical departments.

Example

```
Head Office
│
├── IT
│   ├── Backend
│   ├── AI
│   └── DevOps
│
├── HR
├── Finance
└── Sales
```

---

# 💼 Asset Management

Register organizational assets such as

- Laptops
- Desktops
- Furniture
- Vehicles
- Medical Equipment
- Projectors
- Cameras
- Lab Equipment
- Printers
- Meeting Rooms
- Shared Resources

Each asset contains:

- Asset Tag
- QR Code
- Category
- Serial Number
- Purchase Date
- Purchase Cost
- Warranty
- Location
- Department
- Condition
- Current Status
- Images
- Documents

---

# 🔄 Asset Lifecycle

```
Draft
   ↓
Registered
   ↓
Available
   ↓
Reserved
   ↓
Allocated
   ↓
Transfer Requested
   ↓
Transferred
   ↓
Returned
   ↓
Inspection
   ↓
Available
   ↓
Maintenance
   ↓
Available
   ↓
Lost
   ↓
Recovered
   ↓
Retired
   ↓
Disposed
```

---

# 📦 Asset Allocation

Supports:

- Employee Allocation
- Department Allocation
- Expected Return Date
- Asset Return
- Asset Transfer
- Allocation History
- Condition Check
- Conflict Prevention

### Business Rule

A single asset **cannot be allocated to multiple employees simultaneously.**

Instead, the system provides a Transfer Request workflow.

---

# 🔄 Asset Transfer Workflow

```
Transfer Requested
        ↓
Department Approval
        ↓
Asset Manager Approval
        ↓
Transfer Completed
        ↓
History Updated
```

---

# 📅 Resource Booking

Book shared organizational resources:

- Meeting Rooms
- Vehicles
- Conference Halls
- Cameras
- Projectors
- Equipment

Features

- Calendar View
- Slot Booking
- Overlap Detection
- Booking Status
- Reschedule
- Cancellation
- Booking Reminders

### Validation

```
Existing Booking

09:00 - 10:00

New Booking

09:30 - 10:30

❌ Rejected

10:00 - 11:00

✅ Accepted
```

---

# 🛠 Maintenance Management

Employees can raise maintenance requests.

Workflow

```
Pending
    ↓
Approved
    ↓
Technician Assigned
    ↓
In Progress
    ↓
Resolved
    ↓
Closed
```

Automatically changes asset status:

```
Available
      ↓
Under Maintenance
      ↓
Available
```

Stores complete maintenance history.

---

# 🔍 Asset Audit

Supports structured audit cycles.

Workflow

```
Create Audit

↓

Assign Auditor

↓

Verify Assets

↓

Generate Discrepancy Report

↓

Resolve Issues

↓

Close Audit
```

Each asset is marked as:

- Verified
- Missing
- Damaged

---

# 🔔 Notifications

Real-time notifications for:

- Asset Allocation
- Booking Confirmation
- Booking Reminder
- Maintenance Approval
- Maintenance Rejection
- Transfer Approval
- Asset Return Reminder
- Overdue Return
- Audit Assignment
- Audit Discrepancy

---

# 📈 Dashboard

Real-time operational dashboard.

Displays:

- Available Assets
- Allocated Assets
- Assets Under Maintenance
- Active Bookings
- Pending Transfers
- Upcoming Returns
- Overdue Returns
- Pending Maintenance
- Audit Status

---

# 📊 Reports & Analytics

Generate insights such as

- Asset Utilization
- Department-wise Allocation
- Most Used Assets
- Idle Assets
- Maintenance Trends
- Booking Heatmap
- Asset Distribution
- Assets Nearing Retirement
- Assets Due for Maintenance

Export:

- Excel
- PDF
- CSV

---

# 📝 Activity Logs

Every important system activity is logged.

Example

```
John allocated Laptop AF-001

Rahul approved Maintenance Request #102

Admin promoted Employee to Asset Manager

Meeting Room B booked
```

Each log stores:

- User
- Action
- Timestamp
- Module

---

# 📂 File Management

Supports uploading

- Asset Images
- Purchase Invoice
- Warranty Documents
- Manuals
- Maintenance Reports

---

# 📱 QR Code Integration

Every asset receives a unique QR Code.

Scanning the QR Code instantly displays:

- Asset Information
- Allocation History
- Maintenance Records
- Current Holder
- Current Status

---

# 🎨 User Experience

- Responsive UI
- Mobile Friendly
- Dark Mode Support
- Search & Filtering
- Global Search
- Pagination
- Sort & Filter
- Dashboard Widgets

---

# 🔍 Search

Search assets using:

- Asset Tag
- QR Code
- Serial Number
- Employee
- Department
- Category
- Location
- Status

---

# 🏗 Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- Axios
- React Hook Form
- Zod
- Recharts
- FullCalendar

---

## Backend

- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- Maven

---

## Database

- MySQL

---

## Additional Services

- Cloudinary
- ZXing QR Generator
- Apache POI
- Spring Mail
- WebSocket (Optional)

---

# 🧩 Project Architecture

```
                    React Frontend
                          │
                          │
                    REST API Layer
                          │
          Spring Boot Backend Services
                          │
 ┌────────────────────────────────────────┐
 │ Authentication Module                  │
 │ Organization Module                    │
 │ Employee Module                        │
 │ Asset Module                           │
 │ Allocation Module                      │
 │ Booking Module                         │
 │ Maintenance Module                     │
 │ Audit Module                           │
 │ Reports Module                         │
 │ Notification Module                    │
 │ Activity Log Module                    │
 └────────────────────────────────────────┘
                          │
                        MySQL
```

---

# 📦 Major Modules

- Authentication
- Employee Management
- Department Management
- Asset Categories
- Asset Registration
- Asset Allocation
- Asset Transfers
- Resource Booking
- Maintenance Management
- Audit Management
- Notifications
- Reports
- Dashboard
- Activity Logs

---

# 🚀 Future Enhancements

- AI-based Predictive Maintenance
- IoT Asset Tracking
- RFID Integration
- Mobile Application
- Offline Mode
- Multi-Tenant Organizations
- Barcode Scanner Support
- SSO Authentication
- AI Asset Utilization Prediction
- OCR Invoice Processing

---

# 🎯 Business Rules

✔ No self-assigned Admin role

✔ Asset cannot be allocated twice

✔ Booking overlaps are prevented

✔ Maintenance requires approval

✔ Asset status updates automatically

✔ Audit cycles become immutable after closing

✔ Overdue returns generate notifications

✔ Every action is logged

✔ Role-based authorization enforced

✔ Complete asset lifecycle tracking

---

# 📌 Target Organizations

- Corporate Offices
- Educational Institutions
- Hospitals
- Government Organizations
- Manufacturing Industries
- Warehouses
- Logistics Companies
- Research Labs
- NGOs
- Startups

---

# 🤝 Contributors

Built with a focus on clean architecture, modular design, enterprise workflows, and scalable ERP principles.

---

## ⭐ If you find this project useful, consider giving it a star!
\# Matrix School Automation (Google Sheets + Apps Script)



\## 1) Overview

A production-grade Google Sheets + Apps Script stack that centralizes admissions, academics, finance, HR, marketing, and reporting for Matrix College. Most sheets include `appsscript.gs` and `Initial setup.gs` for validation, triggers, and workflows.



\*\*Core ideas:\*\* single source of truth, form-driven inputs, strict validation, automated PDFs/emails, scheduled jobs, and analysis-ready tables.



---



\## 2) System Modules \& Key Sheets



\### A) Admissions \& Student Records

\- \*\*Front Desk App\*\* — receptionist UI (lookup, quick actions).  

\- \*\*Student Application (Responses)\*\* — raw form intake.  

\- \*\*Registration (Responses) (Centralized)\*\* — normalized enrollment; joins application ↔ course.  

\- \*\*Student ID Database (New) (Centralized)\*\* — unique IDs, identity lifecycle.  

\- \*\*Student Detail Database (New) (Centralized)\*\* — golden record for student attributes.  

\- \*\*Class Transfer / Class Schedule for Export / Schedule Template\*\* — cohort changes \& export views.  



\### B) Academics \& Attendance

\- \*\*Matrix Strategic Attendance (New)\*\* — policy-aware attendance (late/leave rules).  

\- \*\*Internal Attendance\*\* — staff/faculty time tracking.  

\- \*\*Course Database (Centralised)\*\* — canonical course codes, hours, categories.  

\- \*\*Instructor Database\*\* — faculty roster, assignments, availability.  

\- \*\*Course Schedule 2024 (New) / Course Schedule 2025 / Detail Schedule Management / Schedule for Instructor\*\* — timetable planning and instructor views.  

\- \*\*Academics Report System / Student Report for Teacher Template / Score Card Template\*\* — academic reporting pipelines.  



\### C) Finance, Sales \& Customer Programs

\- \*\*Sales-Lead by year\*\* — CRM funnel.  

\- \*\*Corporate Lead (Centralised)\*\* — B2B pipeline and organization links.  

\- \*\*Price and Promo by year\*\* — pricing matrix \& campaign rules.  

\- \*\*Payment Checking \& Account Book (Centralized)\*\* — receivables reconciliation \& audit trail.  

\- \*\*Loyalty \& Referral (Centralized)\*\* — rewards logic; duplication dedupe.  

\- \*\*Sales Report / Sales History Analysis by year\*\* — daily aggregates \& longitudinal analysis.  



\### D) Marketing \& Content

\- \*\*Media Marketing Sheet by year\*\* — campaign calendar \& metrics.  

\- \*\*Content Library\*\* — canonical assets (course blurbs, banners, URLs).  



\### E) Organizations \& Assets

\- \*\*Organization Database (centralized) / New Organization Database (centralized)\*\* — institutions, partners; normalized keys.  

\- \*\*Fixed Asset Management\*\* — asset registry, condition, disposal, and depreciation.  



\### F) Facilities \& Operations

\- \*\*Front Desk by year\*\* — ops log; quick tickets.  

\- \*\*Room Rental by year\*\* — space booking, chargeback.  



\### G) Templates \& Boilerplates

\- \*\*Matrix Sheet Template / Form Field\*\* — governed dropdowns, data validation lists.  

\- \*\*Certificate Issued Management\*\* — certificate issuance \& verification registry.  



> Every module uses Apps Script (`Initial setup.gs` for headers/ranges/triggers; `appsscript.gs` for business logic, data guards, PDF/email jobs).



---



\## 3) Data Flow (High Level)



The system follows a structured life cycle from course creation to certification, with governance and HR layers wrapping the process.



1\. \*\*Course Design\*\*  

&nbsp;  - Course Database (canonical course codes, hours, categories)  

&nbsp;  - Course Scheduling \& Instructor assignment  



2\. \*\*Marketing \& Lead Generation\*\*  

&nbsp;  - Price \& Promo (campaigns, pricing rules)  

&nbsp;  - Media Marketing Schedule (planned outreach)  

&nbsp;  - Sales-Lead (individual prospects) + Corporate Lead (B2B prospects)  



3\. \*\*Sales \& Finance\*\*  

&nbsp;  - Quoted prices from Price \& Promo  

&nbsp;  - Payment Checking \& Account Book (reconciliation)  

&nbsp;  - Sales History Analysis (tracking trends, forecasting)  



4\. \*\*Enrollment\*\*  

&nbsp;  - Student Application (Responses) → Registration (Centralized)  

&nbsp;  - Student ID Database (unique student IDs)  

&nbsp;  - Student Detail Database (golden student profile)  

&nbsp;  - Organization Database (partner institutions)  

&nbsp;  - Corporate Lead Database (corporate client records)  

&nbsp;  - Loyalty \& Referral Program (rewards, re-enrollment logic)  



5\. \*\*Academics \& Operations\*\*  

&nbsp;  - Front Desk (attendance, receptionist tools)  

&nbsp;  - Matrix Strategic Attendance (policy-aware logs)  

&nbsp;  - Feedback systems (course/student evaluations)  



6\. \*\*Certification \& Reporting\*\*  

&nbsp;  - Certificate Issued Management (PDF generation + registry)  

&nbsp;  - Website integration (publish/verifiable records)  

&nbsp;  - Dashboards \& Reports (Academics Report System, Sales Report)  



7\. \*\*Governance \& Support Layers\*\*  

&nbsp;  - Matrix System Control (orchestration of all sheets/modules)  

&nbsp;  - HR \& Employee Attendance (staff management, payroll data integration)  

&nbsp;  - Asset Management (fixed asset tracking, classrooms, resources)  



\*\*Automations:\*\*  

\- OnSubmit triggers (for lead, application, attendance forms)  

\- Time-driven triggers (for reconciliation, daily attendance rollups, certificate generation)  

\- Apps Script menus (front desk tools, HR actions, certificate issuance)  



---



\## 4) Selected Illustrative Snippets (Redacted)



> ⚠️ Full production code is private. Below are placeholders for simplified examples.  




5\) Governance \& Quality

Validation: dropdowns from Form Field; strict schema checks on write.



Keys: student\_id, org\_id, course\_code used across modules.



Auditability: timestamped logs for edits/issuances; Payment Checking as ledger.



Separation: staging vs. golden tables; templates isolated from production data.



6\) Impact

Reduced certificate turnaround from days → minutes (automated PDFs + email).



Fewer enrollment data errors via normalized Registration (Centralized).



Instructor scheduling conflicts minimized with Detail Schedule Management.



Faster finance checks due to Payment Checking \& Account Book automation.



Consistent pricing \& promos with governed Price and Promo sheets.



7\) Screenshots / GIFs to Include

Student Application → Registration flow (redacted).



Matrix Strategic Attendance dashboard.



Course Schedule planner (2025) with instructor assignment.



Payment Checking reconciliation view.



Certificate Issued Management with a sample redacted PDF.


8\) My Role

Architecture, data modeling, Apps Script development, trigger design, deployment, staff training, and ongoing maintenance.



9\) Demo / Contact

This case study is documentation only; full source is private.

I can demo privately on request.



📧 Contact: phonemyatthanoo@gmail.com



yaml

Copy code



---



✅ Copy this over your existing `README.md` (open with `notepad README.md`, paste, save).  

Then run:  

```bash

git add README.md

git commit -m "docs: update data flow section for Matrix School Automation"

git push


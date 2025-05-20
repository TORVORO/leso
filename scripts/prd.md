# LeaseSync – Product Requirements Document (PRD)

## 0. Document Control

| Item          | Value                                                      |
| ------------- | ---------------------------------------------------------- |
| **Author**    | T (Product Owner)                                          |
| **Date**      | 2025-05-20                                                 |
| **Version**   | 0.1 (Draft)                                                |
| **Reviewers** | Engineering Lead, UX Lead, Finance Ops, Compliance Officer |
| **Approval**  | *TBD*                                                      |

---

## 1. Purpose & Background

LeaseSync is a web‑based lease‑management and compliance platform that helps mid‑market companies upload, extract, track, and report on their lease agreements in minutes instead of days. The existing Next.js UI mock‑ups are approved; this PRD defines the **scope required to bring the UI to life** on a simple, scalable backend (Supabase + Clerk + OpenAI Vision).

### Opportunity

* New U.S. and international accounting standards (ASC 842, IFRS 16) require detailed right‑of‑use asset reporting. Manual spreadsheets are error‑prone and time‑consuming.
* Competitors target enterprise; mid‑market teams (up to ~2000 users) lack affordable, modern UX.

### Goals & Success Metrics

| Goal               | Metric (12 weeks post‑launch)                  |
| ------------------ | ---------------------------------------------- |
| Fast onboarding    | **< 5 min** to first processed lease           |
| Extraction quality | **≥ 95 % field accuracy** vs. ground truth     |
| Performance        | p95 CRUD latency **≤ 150 ms**                  |
| Conversion         | **> 15 %** free‑to‑paid upgrade within 30 days |

---

## 2. Personas

1. **Finance Manager (Primary)** – Needs accurate lease liabilities for month‑end close.
2. **Operations Manager** – Tracks lease renewals & alerts.
3. **External Auditor** – Verifies compliance evidence.
4. **SaaS Admin / IT** – Manages users, SSO, billing.

---

## 3. Problem Statement

> Mid‑market finance teams waste days re‑keying lease data and fear audit penalties because existing tools are expensive, outdated, or too complex.

---

## 4. Vision & Scope

LeaseSync will provide an **upload‑to‑report** workflow: drag‑and‑drop lease PDFs, automatic extraction, real‑time dashboards, one‑click compliance reports, and straightforward seat‑based billing. First release targets ≤ 2000 users per tenant and ≤ 100 leases per tenant.

---

## 5. Assumptions

* UI remains as delivered (Next.js 14, dark theme).
* Supabase Starter / Pro tiers are sufficient (<10 k req/min).
* OpenAI Vision API throughput meets SLA for PDF extraction (under 8 sec per doc at launch volumes).

---

## 6. Out of Scope (MVP)

* Multi‑currency rent projections
* Deep ERP integrations (NetSuite, SAP)
* On‑prem deployment

---

## 7. Functional Requirements

### 7.1 Authentication & User Management

* Clerk‑hosted sign‑up/login, magic link, Google SSO
* Organizations with **Admin, Member, Auditor** roles

### 7.2 Lease Portfolio CRUD

* Create, Read, Update, Archive leases with metadata fields shown in UI (type, term, location, rent, status)
* Row‑Level Security via `org_id`

### 7.3 Document Upload & Extraction

* PDF upload via signed URL (≤ 50 MB)
* Background Edge Function calls OpenAI Vision -> JSON output mapped to lease fields
* Progress bar & notifications in real‑time

### 7.4 Reporting

* Generate ASC 842 & IFRS 16 PDF/Excel within 10 s for ≤ 100 leases
* Saved report templates & recent report list

### 7.5 Activity Feed & Notifications

* Realtime feed of uploads, approvals, comments, issues
* Email alerts for expiring leases (90, 30, 7 days)

### 7.6 Billing

* Seat‑based pricing tiers (Free = 1 seat, 5 docs/mo)
* Upgrade/downgrade via Clerk + Stripe checkout modal
* Webhooks update org limits instantly

### 7.7 Search & Filters

* Full‑text search across lease names & comments
* Filter list by type, status, location, date range

### 7.8 Settings

* Profile (name, email)
* Organization settings (plan, payment method, limits)

---

## 8. Non‑Functional Requirements

| Category          | Requirement                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| **Performance**   | p95 API latency ≤ 150 ms; extraction pipeline ≤ 8 s per doc             |
| **Scalability**   | Support 2000 concurrent users, 1 million docs platform‑wide            |
| **Availability**  | 99.9 % monthly uptime                                                   |
| **Security**      | SOC 2 aligned; data encrypted in transit & at rest; least‑privilege IAM |
| **Compliance**    | ASC 842, IFRS 16 calculation accuracy; GDPR data handling               |
| **Accessibility** | WCAG 2.1 AA                                                             |

---

## 9. User Stories (MVP)

| ID    | As a…       | I want…                                         | So that…                           | Acceptance                                |
| ----- | ----------- | ----------------------------------------------- | ---------------------------------- | ----------------------------------------- |
| US‑01 | Finance Mgr | to upload a lease PDF                           | I avoid manual data entry          | Fields auto‑populate with ≥ 95 % accuracy |
| US‑02 | Finance Mgr | to download ASC 842 report                      | I can finish month‑end close       | PDF generated under 10 s                  |
| US‑03 | Ops Mgr     | to receive an email 30 days before lease expiry | I can initiate renewal discussions | Email sent; feed entry created            |
| US‑04 | Auditor     | to view an immutable extraction history         | I can verify compliance            | Audit trail table exposed                 |
| US‑05 | Admin       | to add users and assign roles                   | I control access                   | Clerk org UI functional                   |

---

## 10. KPIs & Analytics

* Time‑to‑first‑value (upload → processed) median < 5 min
* Monthly Active Organizations (MAO)
* Extraction accuracy rate (manual QA sampling)
* Report generation success rate (> 98 %)
* Free‑to‑paid conversion (> 15 %)

---

## 11. Milestones & Timeline

| Phase | Date    | Deliverable                                  |
| ----- | ------- | -------------------------------------------- |
| Alpha | +6 wks  | Upload & extraction end‑to‑end on test env   |
| Beta  | +9 wks  | CRUD, billing, reporting; limited live users |
| GA    | +12 wks | Public launch, paid plans                    |

---

## 12. Risks & Mitigations

| Risk                       | Likelihood | Impact | Mitigation                                   |
| -------------------------- | ---------- | ------ | -------------------------------------------- |
| OpenAI rate limits         | Medium     | High   | Batch requests, caching, queue back‑off      |
| Extraction accuracy < 95 % | Medium     | High   | Manual correction queue, model prompt tuning |
| Supabase cost overruns     | Low        | Medium | Usage monitoring, row limits per plan        |

---

## 13. Open Questions



---

## 14. Appendix

* Glossary (ASC 842, RLS, OCR, etc.)
* Links to UI wireframes & prototype

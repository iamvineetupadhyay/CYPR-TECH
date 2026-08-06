<div align="center">
<img src="assets/logo/cypr-logo.png" alt="CYPR Logo" width="50%" />

# CYPR
### Enterprise-Grade Cybersecurity Platform

**Secure. Analyze. Detect. Protect.**

[Live Demo](https://cyprtech.vercel.app)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Docker Setup](#docker-setup)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Project Highlights](#project-highlights)
- [Author](#author)

---

## Overview

CYPR is an enterprise-grade cybersecurity platform designed to help individuals and organizations analyze, monitor, and improve their digital security posture.

The platform combines multiple security tools into a single dashboard, including phishing detection, malware analysis, SSL inspection, password strength evaluation, breach monitoring, security scoring, audit logging, and threat intelligence.

The project follows a scalable backend architecture using Java Spring Boot with Dockerized deployment and modern frontend technologies.

---

## Features

### Authentication & Security

- JWT Authentication
- Secure Login & Registration
- Role-Based Access
- Password Encryption
- Session Management

### Security Tools

<details>
<summary><strong>URL Phishing Checker</strong></summary>
<br>

Analyze URLs using VirusTotal threat intelligence.
</details>

<details>
<summary><strong>Password Strength Analyzer</strong></summary>
<br>

Local password entropy analysis with zero server logging.
</details>

<details>
<summary><strong>Malware Scanner</strong></summary>
<br>

Upload suspicious files and analyze malware signatures.
</details>

<details>
<summary><strong>SSL Certificate Inspector</strong></summary>
<br>

Inspects:
- SSL validity
- Expiration date
- Cipher suites
- TLS information
</details>

<details>
<summary><strong>Data Breach Search</strong></summary>
<br>

Search whether an email or credential has appeared in public breach datasets.
</details>

<details>
<summary><strong>Threat Intelligence Feed</strong></summary>
<br>

Live security news and CVE updates.
</details>

<details>
<summary><strong>Personal Safe Score</strong></summary>
<br>

Generates a personalized cybersecurity safety score based on multiple security metrics.
</details>

<details>
<summary><strong>Security Audit Log</strong></summary>
<br>

Tracks:
- User activities
- Login history
- Security events
- Scan history
</details>

---

## Architecture

```
                        +----------------------+
                        |      React.js        |
                        |     Frontend UI      |
                        +----------+-----------+
                                   |
                          REST API Requests
                                   |
                                   v
                    +-----------------------------+
                    |      Spring Boot API        |
                    | Authentication              |
                    | Business Logic              |
                    | Security Services           |
                    +-------------+---------------+
                                  |
              ---------------------------------------
              |             |             |          |
              v             v             v          v
          PostgreSQL    VirusTotal     SSL APIs   Threat APIs
              |
              v
        Audit Logs
        User Data
        Scan Results
```

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Tailwind CSS, Framer Motion, Axios |
| Backend | Java, Spring Boot, Spring Security, Spring Data JPA, REST APIs |
| Database | PostgreSQL |
| DevOps | Docker, Docker Compose, Vercel (Frontend), Railway / Render (Backend) |
| APIs | VirusTotal API, SSL Inspection APIs, Threat Intelligence APIs |

---

## API Endpoints

<details>
<summary><strong>Authentication</strong></summary>
<br>

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```
</details>

<details>
<summary><strong>Security Tools</strong></summary>
<br>

```
POST /api/phishing/check
POST /api/password/analyze
POST /api/malware/scan
GET  /api/ssl/check
GET  /api/breach/search
GET  /api/threat/feed
GET  /api/dashboard
GET  /api/audit/history
```
</details>

---

## Database Schema

<details>
<summary><strong>View schema</strong></summary>
<br>

```
Users
-----
id
name
email
password
role
created_at

  |
  +-- Audit Logs
  |     id, user_id, action, timestamp
  |
  +-- URL Scans
  |     id, user_id, url, risk_score, status
  |
  +-- Malware Reports
  |     id, user_id, filename, result
  |
  +-- Password Reports
  |     id, user_id, strength
  |
  +-- Security Score
        id, user_id, score, last_updated
```
</details>

---

## Docker Setup

**Clone repository**

```bash
git clone https://github.com/yourusername/cypr.git
cd cypr
```

**Build**

```bash
docker compose build
```

**Run**

```bash
docker compose up
```

**Application**

```
Frontend  ->  http://localhost:3000
Backend   ->  http://localhost:8080
```

---

## Screenshots

### Landing Page & Security Hub

<p align="center">
  <img src="assets/screenshots/home.png" alt="CYPR Welcome Home Security Hub" width="100%" />
  <br />
  <sub><b>Figure 1:</b> Centralized Security Hub featuring VAJRA Engine v2 announcements and quick tool access cards.</sub>
</p>

### Executive Security Dashboard

<p align="center">
  <img src="assets/screenshots/dashboard.png" alt="CYPR Executive Security Dashboard" width="100%" />
  <br />
  <sub><b>Figure 2:</b> Executive Security Dashboard displaying Vault Safe Score (98/100), Scans Performed (124), Threats Neutralized (18), and real-time activity stream.</sub>
</p>

### Threat Intelligence & AI Cyber News Feed

<p align="center">
  <img src="assets/screenshots/cyber-news.png" alt="CYPR AI Threat Intelligence & Cyber News Feed" width="100%" />
  <br />
  <sub><b>Figure 3:</b> Real-time Cyber News Feed aggregator with automated AI article summarizer and source filters.</sub>
</p>

### File Malware Scanner & Payload Sandbox

<p align="center">
  <img src="assets/screenshots/malware-scanner.png" alt="CYPR File Malware Scanner & Sandbox" width="100%" />
  <br />
  <sub><b>Figure 4:</b> Drag-and-drop file malware scanner and raw script payload inspection tool (.ps1, .sh, .py, .exe).</sub>
</p>

### Password Strength & Entropy Auditor

<p align="center">
  <img src="assets/screenshots/password-check.png" alt="CYPR Password Entropy & Strength Auditor" width="100%" />
  <br />
  <sub><b>Figure 5:</b> Zero-knowledge client-side password entropy calculator with V8 memory isolation and passphrase evaluation.</sub>
</p>

---

## Roadmap

<details>
<summary><strong>Detection & Intelligence</strong></summary>
<br>

- AI Threat Detection
- WebSocket Live Alerts
- Email Threat Scanner
- SIEM Integration
</details>

<details>
<summary><strong>Platform & Scale</strong></summary>
<br>

- Multi-Factor Authentication (MFA)
- Kubernetes Deployment
- Redis Caching
- API Rate Limiting
- Multi-Tenant Architecture
- Enterprise Team Dashboard
</details>

<details>
<summary><strong>Experience & Access</strong></summary>
<br>

- Browser Extension
- Security Report PDF Export
</details>

---

## Project Highlights

- Enterprise Dashboard
- Dockerized Deployment
- Spring Boot REST APIs
- JWT Authentication
- Security Audit Logs
- Malware Analysis
- SSL Inspection
- Threat Intelligence
- Modern Responsive UI
- Scalable Backend Architecture

---

## Author

**Vineet Kumar Upadhyay**

Java Backend Developer

Spring Boot • Docker • PostgreSQL • REST APIs • React
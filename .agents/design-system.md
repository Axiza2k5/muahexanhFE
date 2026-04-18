# Mua Hè Xanh Online Register System - Design System v1.0

## 1. Foundation
This design system is built to facilitate trust, efficiency, and community impact. It follows a clean, modern aesthetic with a focus on high-contrast actionable elements.

### Typography
* **Primary Font:** `Inter` (Sans-serif)
* **Scale:**

| Level | Size | Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | 64px | 72px | Bold (700) | Hero sections, Page titles |
| **H2** | 48px | 56px | Bold (700) | Main section headers |
| **H3** | 40px | 48px | Semi-Bold (600) | Card titles, Modal headers |
| **H4** | 32px | 40px | Medium (500) | Subsection headers |
| **H5** | 24px | 32px | Medium (500) | Form labels, Small UI titles |
| **Body** | 16px | 24px | Regular (400) | Default text, Input content |
| **Small** | 14px | 20px | Regular (400) | Captions, Metadata, Helpers |

---

## 2. Color Palette
Colors are categorized by their functional role within the application logic.

### Brand Colors
* **Primary (Blue Rocket):** `#564AF7`
    * Usage: Main CTA buttons, active navigation, links, and primary branding.
* **Text (Dark Side):** `#121827`
    * Usage: Headings, body text, and dark iconography.
* **Surface (Light Side):** `#FFFFFF`
    * Usage: Card backgrounds, page surface, and container backgrounds.

### Semantic Colors (Logic-Driven)
* **Success (Yoda):** `#0FB328`
    * Usage: **Approved** project status, **Accepted** student status, and "Skills Match" highlights.
* **Warning (Chewie):** `#FFA900`
    * Usage: **Pending** status, verification alerts, and medium-priority notifications.
* **Error / Danger (Maul):** `#FF0000`
    * Usage: **Rejected** project/student status, **Reject Unqualified** buttons, and critical errors.

---

## 3. Spacing & Grid
We strictly follow an **8pt Grid System** to ensure visual rhythm and consistent "white space."

* **Base Unit:** 8px
* **Layout Spacing:**
    * `Space-XS`: 8px (Small gaps between related items)
    * `Space-S`: 16px (Padding inside small components)
    * `Space-M`: 24px (Standard card padding, gap between fields)
    * `Space-L`: 32px (Margin between sections)
    * `Space-XL`: 48px (Major page dividers)
* **Border Radius:**
    * Standard Components: `12px` (Buttons, Inputs, Cards)
    * Small Components: `4px` (Tags, Badges)

---

## 4. Business Logic Mapping
This section maps the UI elements to your **Java Spring Boot / PostgreSQL** backend states.

### Project Verification (Admin)
| Status | UI Label | UI Color | Backend State (Enum) |
| :--- | :--- | :--- | :--- |
| **Waiting** | Pending | Chewie (#FFA900) | `PROJECT_PENDING` |
| **Verified** | Approved | Yoda (#0FB328) | `PROJECT_APPROVED` |
| **Declined** | Disapproved | Maul (#FF0000) | `PROJECT_REJECTED` |

### Student Application (Leader)
| Action | UI Color | Backend Logic |
| :--- | :--- | :--- |
| **Accept** | Yoda (#0FB328) | `UPDATE status = 'ACCEPTED'` |
| **Reject Unqualified** | Maul (#FF0000) | `UPDATE status = 'REJECTED_UNQUALIFIED'` |

---

## 5. Components Guidelines

### Buttons
* **Primary:** Solid Blue Rocket background, White text.
* **Success:** Solid Yoda background (used for "Accept" or "Approve").
* **Destructive:** Solid Maul background (used for "Reject" or "Delete").

### Inputs
* **Normal:** 1px border (#D1D5DB), 16px horizontal padding.
* **Focus State:** 2px border (Blue Rocket), subtle outer glow.
* **Error State:** 1.5px border (Maul Red), error message text below in 14px.

### Cards
* **Project Card:** White background, 1px border (#E5E7EB), soft drop shadow (0px 4px 6px rgba(0,0,0,0.05)).
* **Tag:** Small font, background color based on status (e.g., Green for "Skill Matched").

---
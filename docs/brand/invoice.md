# Brand: Invoice channel guidelines

Client invoices are a routine but high-stakes artefact — they land in a client's accounts payable system and are the primary mechanism for payment. The visual and verbal standards here carry full brand weight. This document is self-contained for AI consumption; it inlines the relevant visual and verbal subsets and cites canonical refs for depth. Do not alter values found here without first updating `docs/brand/foundations.md` and `docs/brand/voice.md`.

---

## 1. Purpose & context

Client invoices are formal PDF documents issued to a client's accounts payable team at defined engagement milestones or on a monthly retainer schedule.

**Audience:** The client's accounts payable team — the people who process and approve payments. They are not evaluating #sharp's capabilities; they are matching a document to an approved purchase order or contract, verifying the arithmetic, and triggering a payment run. The invoice must be unambiguous, correctly labelled, and machine-processable where possible.

**When to issue an invoice:** At any of the following trigger points:

- **Deposit invoice** — issued before work commences, where a deposit is required per the agreed payment schedule (e.g., 50% on commencement).
- **Mid-project invoice** — issued at an agreed milestone during a longer engagement (e.g., on delivery of a defined output).
- **Completion invoice** — issued on final delivery of the engagement scope.
- **Monthly retainer invoice** — issued on the first working day of each month for retainer-based engagements, covering the period ahead or the period just completed, per the retainer agreement.

**Relationship to other documents:** The commercial terms of an invoice must align directly with the proposal that was accepted (see `brand/proposal.md`). The line items, rates, and VAT treatment on an invoice must match the pricing section of the signed proposal. Never issue an invoice for scope or amounts that differ from the accepted proposal without first issuing a change-of-scope document.

---

## 2. Visual specs (inlined subset)

### Colour

Invoices use a deliberately restrained palette. Red is reserved for two specific elements only.

| Role                      | Hex       | Where used                                             |
| ------------------------- | --------- | ------------------------------------------------------ |
| Body text / labels        | `#333333` | All body copy, table text, labels, metadata, footer    |
| Background                | `#FFFFFF` | Full page; clean, printable, professional              |
| Accent (strictly limited) | `#D41F21` | Total row and Due Date label/value only — nowhere else |
| Logo (light pages)        | —         | Use `img/sharp_logo.svg`                               |

Red is used on exactly two elements: the Total row in the totals block, and the Due Date label and its value in the metadata grid. Any other use of red on an invoice is a production error. Do not use any additional red shades — the brand primary is `#D41F21` only. See `docs/brand/foundations.md §2` for deprecated values.

### Typography

| Role                      | Font    | Weight / size       | Notes                                                    |
| ------------------------- | ------- | ------------------- | -------------------------------------------------------- |
| "INVOICE" wordmark        | Manrope | Weight 300, 32pt    | Top-left; the document's primary identifying label       |
| Section labels / headings | Manrope | Weight 400, 14pt    | From / To headers, Metadata labels, table column headers |
| Body / table content      | Inter   | Regular (400), 10pt | Line items, amounts, addresses, footer bank details      |
| Footnotes / metadata      | Inter   | Regular (400), 9pt  | Footer company info, page number                         |

Manrope and Inter are both available via Google Fonts. All fonts must be embedded in the exported PDF.

### Logo

- **All pages** (white background): use `img/sharp_logo.svg`, top-right of header band, 80px wide.
- Never recolour, rotate, skew, or stretch the logo.

→ See [`brand/foundations.md`](foundations.md) for full visual rules.

---

## 3. Verbal specs (inlined subset)

### Tone for invoices

Invoices use the **formal-transactional** register — the most stripped-back mode #sharp employs. There is no narrative, no persuasion, and no relationship-building copy. The document's entire verbal function is to state what is owed, when it is due, and how to pay. Accounts payable teams do not read cover letters on invoices; they process fields.

### Label vocabulary

Use these exact label strings. Do not abbreviate, rephrase, or vary them:

| Field label     | Use exactly as written — no substitution   |
| --------------- | ------------------------------------------ |
| Invoice number  | Not "Inv #", "Invoice No.", or "INV"       |
| Issue date      | Not "Invoice date" or "Date"               |
| Due date        | Not "Payment due" or "Pay by"              |
| Bill to         | Not "Client" or "Payable by"               |
| Description     | Not "Item" or "Service"                    |
| Quantity        | Not "Qty" or "Units"                       |
| Rate            | Not "Price" or "Cost"                      |
| Subtotal        | Not "Sub-total" or "Net total"             |
| VAT             | Full word; not "Tax" or "Sales tax"        |
| Total           | Not "Amount due" or "Balance due"          |
| Payment terms   | Not "Terms" or "Conditions"                |
| Payment details | Not "Bank details" or "Wire transfer info" |

### Verbal constraints

- UK English throughout. "Authorise" not "authorize". Dates in `DD MMM YYYY` format.
- `#sharp` is always lowercase with hash prefix; it never starts a sentence. Write "The team at #sharp…" not "#sharp invoices…".
- No marketing copy, thank-you messages, or relationship language on the invoice body. The invoice is a legal and financial document.
- No emoji, no exclamation marks, no informal phrasing.
- If a payment terms clarification is needed, state it precisely: "Net 14 days from issue date" — not "please pay promptly".

→ See [`brand/voice.md`](voice.md) for full verbal rules.

---

## 4. Format & dimensions

### Page dimensions

- **Size:** A4 portrait — 210 × 297 mm.
- **Margins:** 20 mm on all sides.
- **Layout:** Single-column document with internal two-column regions for the From / To billing block and metadata grid.

### Typography scale

| Element                   | Font    | Size | Weight | Notes                              |
| ------------------------- | ------- | ---- | ------ | ---------------------------------- |
| "INVOICE" wordmark        | Manrope | 32pt | 300    | Top-left of header band            |
| Section labels / headings | Manrope | 14pt | 400    | Column headers, block labels       |
| Body / table content      | Inter   | 10pt | 400    | Line items, amounts, addresses     |
| Footer metadata           | Inter   | 9pt  | 400    | Bank details, company registration |
| Page number               | Inter   | 9pt  | 400    | Footer, right-aligned              |

### Footer

- **Footer left:** Bank details and registered company information (Inter 9pt, `#333333`).
- **Footer right:** Page number — only shown if the invoice spans more than one page (e.g., `Page 1 of 2`).
- Single-page invoices may omit the page number; the footer still carries company information.

### Output format

- **Delivery format:** PDF, embedded fonts, no form fields, no tracking pixels.
- **Document metadata:** PDF Title field set to `[Client] · Invoice [Number]` (e.g., `Meridian Retail Group · Invoice 2026-0001`).
- **Source file:** The editable source is kept in the team's accounting tool or Google Drive; the PDF is the client-facing artefact.

---

## 5. Layout & composition

The invoice follows a fixed vertical flow. Elements appear in this order on the page, top to bottom.

### Page anatomy

```
┌──────────────────────────────────────────────────┐  ← 20mm top margin
│  INVOICE                    [sharp_logo.svg]     │  ← Header band
│  (Manrope 32pt, w300)       (80px wide, top-right│
├──────────────────────────────────────────────────┤
│  From:                  │  Bill to:              │  ← Two-column billing block
│  #sharp                 │  [Client name]         │
│  [Registered address]   │  [Client address]      │
│  [City, Postcode]       │  [City, Postcode]      │
│  {{company_reg_number}} │                        │
│  VAT: {{vat_number}}    │                        │
├──────────────────────────────────────────────────┤
│  Invoice number   Issue date      Due date       │  ← Metadata grid
│  2026-0001        04 May 2026     18 May 2026    │  ← Due date label+value in red
├──────────────────────────────────────────────────┤
│  Description           Quantity   Rate   Total   │  ← Line-items table header
│  [Item description]         1  £5,000  £5,000   │  ← Line item rows
├──────────────────────────────────────────────────┤
│                               Subtotal  £5,000   │  ← Totals block (right-aligned)
│                               VAT (20%) £1,000   │
│                               ─────────────────  │
│                               Total    £6,000    │  ← Total in red (#D41F21)
│                               ─────────────────  │
├──────────────────────────────────────────────────┤
│  Payment terms: Net 14 days from issue date.     │  ← Payment terms paragraph
│  Late payments may incur statutory interest…     │
├──────────────────────────────────────────────────┤
│  Bank details: Sort code {{sort_code}}           │  ← Footer / bank details
│  Account {{bank_account}} · Ref: [Invoice no.]  │
│  Registered in England & Wales ·                 │
│  Company {{company_reg_number}}                  │  ← Page number (if multi-page)
└──────────────────────────────────────────────────┘  ← 20mm bottom margin
```

### Alignment

- All numeric columns (Quantity, Rate, line Total, Subtotal, VAT, Total) are **right-aligned**.
- The Description column is left-aligned.
- The From / To billing block uses two equal-width columns.
- The metadata grid (Invoice number, Issue date, Due date) uses a three-column grid, all values left-aligned within their cell.

### Red accent rules

The primary `#D41F21` appears on exactly two elements:

1. The **Total** label and amount in the totals block (with a thin rule above and below).
2. The **Due date** label and its value in the metadata grid.

Red must never appear on any other element of the invoice — not on the "INVOICE" wordmark, not on line-item text, not in the footer.

---

## 6. Component / element library

Named elements that function as primitives when assembling an invoice. Every invoice is built from these components.

**Header band**
Full-width strip at the top. "INVOICE" wordmark in Manrope 32pt weight 300, charcoal `#333333`, left-aligned. The #sharp logo (`img/sharp_logo.svg`) sits right-aligned, 80px wide. No decorative rules or background colour on the header band — white page flows through.

**From / To block**
Two equal-width columns below the header band. Left column: #sharp's registered trading name, registered address, company registration number (`{{company_reg_number}}`), and VAT number (`{{vat_number}}`). Right column: client's billing name and full billing address as provided at engagement start. Label "From:" above left column, "Bill to:" above right column — both in Manrope 14pt weight 400. All address text in Inter 10pt charcoal.

**Metadata grid**
A three-column row below the From / To block. Columns: Invoice number, Issue date, Due date. Each column has a label above (Manrope 14pt weight 400, charcoal) and its value below (Inter 10pt, charcoal for Invoice number and Issue date; `#D41F21` for Due date label and value). Invoice number format: `YYYY-NNNN`. Dates in `DD MMM YYYY` format.

**Line item row**
A table row within the line-items table. Columns: Description (left-aligned, Inter 10pt), Quantity (right-aligned, Inter 10pt), Rate (right-aligned, Inter 10pt, £ prefixed), Line total (right-aligned, Inter 10pt, £ prefixed). Column headers in Manrope 14pt weight 400. Horizontal rules separate the header row from data rows; no vertical lines. Each row represents a single billable item.

**Totals block**
Right-aligned block below the line-items table. Three rows: Subtotal, VAT (with rate noted, e.g., "VAT at `{{vat_rate}}`"), Total. Subtotal and VAT rows in Inter 10pt charcoal. Total row in Inter 10pt (or Manrope 11pt weight 500 for added emphasis), set in `#D41F21`. A thin horizontal rule (0.5pt charcoal) above and below the Total row. All amounts right-aligned.

**Payment terms paragraph**
A short paragraph below the totals block. States the payment terms explicitly (e.g., "Payment terms: Net 14 days from issue date.") and includes a brief late payment statement (e.g., "Late payments may incur statutory interest in accordance with the Late Payment of Commercial Debts (Interest) Act 1998."). Inter 10pt charcoal.

**Bank details footer**
Final element before the page footer. Contains: bank sort code (`{{sort_code}}`), account number (`{{bank_account}}`), payment reference format (typically the invoice number). Also includes the registered company name and number and any required legal identifiers. Inter 9pt charcoal.

---

## 7. Templates / starters

Two named invoice structures. Select based on the nature of the engagement.

### Single-line-item invoice

Used for fixed-fee deliverables where the entire engagement fee is described in a single row (e.g., a discovery engagement billed as a fixed fee, or a monthly retainer).

Structure:

1. Header band — "INVOICE" wordmark + logo.
2. From / To block — #sharp details left, client billing details right.
3. Metadata grid — invoice number, issue date, due date.
4. Line-items table — one row: Description (e.g., "Digital transformation discovery — fixed fee"), Quantity 1, Rate £[amount], Total £[amount].
5. Totals block — Subtotal, VAT at `{{vat_rate}}`, Total (in red).
6. Payment terms paragraph — terms + late payment statement.
7. Bank details footer — `{{sort_code}}`, `{{bank_account}}`, reference format.

### Itemised invoice

Used for day-rate engagements, mixed-fee engagements, or where disbursements (expenses, third-party costs) are billed separately from professional fees.

Structure:

1. Header band — "INVOICE" wordmark + logo.
2. From / To block — #sharp details left, client billing details right.
3. Metadata grid — invoice number, issue date, due date.
4. Line-items table — multiple rows. Examples:
   - "AI transformation programme — senior consultant" | Quantity [days] | Rate £[day rate] | Total
   - "AI transformation programme — delivery lead" | Quantity [days] | Rate £[day rate] | Total
   - "Disbursements — travel and subsistence" | Quantity 1 | Rate £[amount] | Total
5. Totals block — Subtotal (sum of all line totals), VAT at `{{vat_rate}}`, Total (in red).
6. Payment terms paragraph — terms + late payment statement.
7. Bank details footer — `{{sort_code}}`, `{{bank_account}}`, reference format.

**Note on placeholders:** All templates use `{{double_brace}}` syntax for fields that resolve from a non-versioned configuration at invoice-generation time. Never substitute literal values for these placeholders in a stored template. See §10.

---

## 8. Worked examples

### Example: Single-line-item invoice (visual layout)

The following describes a complete invoice with illustrative figures. Sensitive fields use placeholders.

```
INVOICE                                     [sharp_logo.svg — 80px]

From:                           Bill to:
#sharp                          Meridian Retail Group
123 Example Street              456 Client House
London, EC1A 1BB                Manchester, M1 2AB
Company: {{company_reg_number}}
VAT: {{vat_number}}

Invoice number    Issue date       Due date
2026-0001         04 May 2026      18 May 2026    ← "Due date" label and value in #D41F21

─────────────────────────────────────────────────────────────
Description                         Quantity    Rate       Total
─────────────────────────────────────────────────────────────
Digital transformation discovery       1      £5,000.00  £5,000.00
— fixed fee
─────────────────────────────────────────────────────────────

                                    Subtotal            £5,000.00
                                    VAT at {{vat_rate}} £1,000.00
                                    ─────────────────────────────
                                    Total               £6,000.00  ← in #D41F21
                                    ─────────────────────────────

Payment terms: Net 14 days from issue date.
Late payments may incur statutory interest in accordance with the
Late Payment of Commercial Debts (Interest) Act 1998.

Sort code: {{sort_code}}  ·  Account: {{bank_account}}
Payment reference: 2026-0001
Registered in England & Wales · Company no. {{company_reg_number}}
```

**Placeholder resolution:** `{{vat_rate}}`, `{{vat_number}}`, `{{company_reg_number}}`, `{{sort_code}}`, and `{{bank_account}}` are populated from a non-versioned configuration file at invoice-generation time — never hardcoded in the template or in version-controlled files. See §10 for the constraint.

**Illustrative figures used above:** £5,000.00 fixed fee; VAT calculated at an illustrative 20% rate (£1,000.00) for display purposes only. The actual VAT rate and amount must be drawn from `{{vat_rate}}` at generation time.

**PDF metadata:** The exported PDF Title field must be set to `Meridian Retail Group · Invoice 2026-0001`.

---

## 9. Do / Don't

**Don't** hardcode VAT number, bank account, sort code, or company registration number in any template file.
**Do** use `{{double_brace}}` placeholders that resolve from a non-versioned configuration at invoice-generation time. Hardcoded sensitive values in version-controlled files create a security and compliance risk. See the follow-up issue for the config file specification.

---

**Don't** use red anywhere except the Total row and the Due date label and value.
**Do** keep red strictly reserved for those two elements. Red on any other part of the invoice — the "INVOICE" wordmark, line items, addresses, payment terms — is a production error.

---

**Don't** include marketing copy, thank-you messages, or relationship language on the invoice.
**Do** keep the document strictly transactional. The accounts payable team is not the right audience for brand narrative. A sentence like "Thank you for your continued partnership with the team at #sharp" does not belong on an invoice.

---

**Don't** abbreviate field labels — do not write "Inv #", "Inv No.", "Qty", or "VAT no.".
**Do** use the full label text as specified in §3: "Invoice number", "Quantity", "VAT". Abbreviated labels introduce ambiguity in automated payment processing.

---

**Don't** left-align numeric columns or place the totals block anywhere other than the right side of the page.
**Do** right-align all Quantity, Rate, and Total columns throughout the line-items table, and right-align the entire totals block. This is standard accounting document convention and aids at-a-glance verification.

---

## 10. Hard constraints

Non-negotiable rules. An invoice that violates any item here must be corrected before it is issued.

- **Invoice number format:** All invoice numbers follow the format `YYYY-NNNN` (e.g., `2026-0001`). The sequence increments globally across all clients — not per-client. The next available number must be drawn from the team's accounting tool or invoice register before issuing.
- **Date format:** Both Issue date and Due date must be written in `DD MMM YYYY` format (e.g., `04 May 2026`). Never use `DD/MM/YYYY`, `YYYY-MM-DD`, or any abbreviated month format.
- **No hardcoded sensitive values:** VAT number, bank account number, sort code, and company registration number must never be hardcoded in any template or version-controlled file. They are populated from a non-versioned configuration at invoice-generation time. This constraint is tracked as a follow-up implementation issue.
- **Payment terms must be explicit:** The payment terms statement must use full, unambiguous language: e.g., "Net 14 days from issue date". The specific terms (14 days, 30 days, etc.) must match the terms agreed in the signed proposal or engagement letter. "Payment on receipt" is not acceptable — state the number of days.
- **Total in primary red:** The Total label and amount must be set in `#D41F21`. All other numeric values on the invoice — line totals, subtotal, VAT amount — must be in charcoal `#333333`. No exceptions.
- **Due date in primary red:** The Due date label and its value must be set in `#D41F21`. This is the only metadata field that receives red treatment.
- **PDF document metadata:** The PDF Title field must be set to `[Client] · Invoice [Number]` (e.g., `Meridian Retail Group · Invoice 2026-0001`). Empty or generic metadata is not acceptable.
- **No tracking pixels or embedded scripts:** The PDF is a static document. No form fields, no tracking pixels, no JavaScript. The recipient must be able to open and read the document offline with no network calls.
- **Brand primary only:** The accent colour is `#D41F21` — the single, versioned brand primary. No other red shades are permitted. See `docs/brand/foundations.md §2`.
- **Line items must match the signed proposal:** The descriptions, quantities, rates, and totals on an invoice must correspond exactly to the pricing section of the accepted proposal. Any deviation requires a change-of-scope document before invoicing.

---

## 11. Asset references

All paths are relative to the repository root.

| Asset                   | Path                        | Use in invoices                                  |
| ----------------------- | --------------------------- | ------------------------------------------------ |
| Primary logo (light bg) | `img/sharp_logo.svg`        | Header band, top-right, 80px wide                |
| Inverted logo (dark bg) | `img/sharp_logo_invert.svg` | Not used in standard invoices (white pages only) |

**Note on generated invoices:** Completed invoice PDFs are stored according to the team's accounting tool convention or Google Drive folder structure — a folder per client, organised by financial year. The file storage convention is out of scope for this document.

---

## 12. Related docs

- [`brand/foundations.md`](foundations.md) — full visual reference: colours, typography, logo, spacing, imagery, composition, accessibility, and token reference. Invoice visual values must not diverge from foundations.
- [`brand/voice.md`](voice.md) — full verbal reference: voice attributes, tone spectrum, writing principles, vocabulary, and label conventions.
- [`brand/proposal.md`](proposal.md) — invoice line items must align with the pricing section of the accepted proposal. Rates, quantities, and VAT treatment on an invoice must match the proposal that was signed. See `proposal.md §8 (Worked examples)` and `proposal.md §10 (Hard constraints)` for the VAT placeholder convention, which mirrors the approach used here.

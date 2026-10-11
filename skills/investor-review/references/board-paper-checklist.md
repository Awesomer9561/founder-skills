# Board Paper Checklist Reference

How to present a new initiative to a corporate board or investment committee (IC): the structure of the paper, the financial case, risks, governance, and the decision being asked for. Boards read dozens of papers; the ones that get approved make the decision easy to take and easy to defend later.

---

## Principles

- **Lead with the ask.** The first page states the decision, the amount and the recommendation. Directors should know what they're voting on before they read the background.
- **One paper, one decision.** If you need two decisions, write two resolutions or two papers.
- **Short body, deep appendices.** Body 4–8 pages; models, research and detailed plans go in appendices.
- **Options, not a single path.** Always include "do nothing" and at least one real alternative.
- **Incremental, honest numbers.** Only cash flows caused by the decision; every key assumption sourced.
- **Make it easy to stop.** Stage gates and kill criteria show the board it isn't writing a blank cheque.
- **No surprises.** Pre-brief the chair, the CFO and any director with a known concern before the meeting.

---

## Structure of a Board Paper

### 1. Cover Sheet (half a page)
| Field | Content |
|-------|---------|
| Title | Short, specific: "Launch of [Product] in [Market]: capital approval" |
| Purpose | **For decision** / For discussion / For noting |
| Sponsor | Named executive accountable for the outcome |
| Author | Who prepared it |
| Date and meeting | Board / IC meeting date |
| The ask | One sentence: amount, scope, timing |
| Recommendation | Approve / approve with conditions |
| Previous board consideration | Dates and outcomes of earlier discussions, if any |
| Confidentiality | Classification; any director conflicts of interest declared |

### 2. Executive Summary (one page, max)
- The opportunity in 2 sentences
- The recommendation and the resolution sought
- Headline financials: investment, NPV at hurdle rate, IRR, payback
- The top 3 risks and how they're mitigated
- What happens next if approved (first milestone and date)

### 3. Strategic Rationale
- How this supports the approved group strategy (cite the strategic pillar)
- Why the group is advantaged (customers, distribution, data, brand, capabilities)
- Why now: cost of delay quantified where possible

### 4. Options Considered
Compare on the same basis (NPV, risk, time-to-market, strategic fit):

| Option | Investment | NPV | Time to market | Key risk | Recommendation |
|--------|-----------|-----|----------------|----------|----------------|
| A. Do nothing | $0 | Baseline (often negative: share loss) | n/a | Competitor captures segment | Not recommended |
| B. Build in-house | | | | | **Recommended** |
| C. Partner / license | | | | | |
| D. Acquire | | | | | |

### 5. Financial Case
See the detailed section below. Body shows the summary table and sensitivity; the model goes in the appendix.

### 6. Risks and Mitigations
See the risk register format below.

### 7. Implementation Plan
- Phases with dates, milestones and the spend released at each
- Resources: headcount (new vs redeployed), key hires, dependencies on other units
- Stage gates: what must be true to release the next tranche

### 8. Governance and Reporting
- Decision rights: who can approve what within the envelope
- Reporting cadence to the board and the KPIs reported
- Kill criteria agreed now
- Post-investment review date (typically 12–24 months after launch)

### 9. Stakeholders and Consultation
- Who has reviewed it: finance, legal, risk, HR, affected business units
- Any dissent and how it was resolved
- Customer, regulator, union or partner implications

### 10. Resolution
The exact wording the board will minute (see "The Decision Being Asked For").

### Appendices
Financial model and assumptions book · market research · customer evidence · technical assessment · legal/regulatory opinion · detailed project plan.

---

## The Financial Case

### Core Rules
- **Incremental cash flows only.** Include only revenue and costs that change because of the decision. Exclude revenue the group would earn anyway.
- **Exclude sunk costs.** Money already spent is irrelevant to the decision.
- **Include opportunity cost.** Redeployed staff, factory capacity or shelf space have a value elsewhere.
- **Include cannibalisation.** Lost margin on existing products is a cost of the initiative.
- **Include working capital.** Inventory and receivables tie up cash; release it at the end.
- **Capex and opex both count.** The board judges cash, not accounting treatment.
- **Horizon:** 5 years for most initiatives; up to 10 for infrastructure. Be cautious with terminal value: if NPV is only positive because of terminal value, say so explicitly.
- **Discount rate:** the group's hurdle rate (WACC plus a risk premium for new markets or products, often +2–5 points). State which rate and why.

### The Four Numbers

**Net Present Value (NPV)**
```
NPV = Σ [ CF_t / (1 + r)^t ]  − Initial investment      (t = 1 … n)
```
Value created in today's money at the hurdle rate `r`. **Decision rule:** approve only if NPV > 0. The primary measure because it is in dollars and accounts for scale.

**Internal Rate of Return (IRR)**
The discount rate at which NPV = 0. **Decision rule:** IRR must exceed the hurdle rate. Useful for comparing projects of different sizes, but misleading for unconventional cash flows (multiple sign changes) and when comparing mutually exclusive projects of different scale; use NPV to break ties.

**Payback Period**
Years until cumulative cash flows recover the initial investment. **Discounted payback** does the same with discounted cash flows and is always longer. Boards often have a policy limit (commonly 2–4 years for commercial initiatives). Payback ignores everything after it, so never use it alone.

**Sensitivity and Scenarios**
- **One-variable sensitivity:** flex each key driver (volume, price, cost, timing) and show the NPV impact. A tornado chart ranks drivers by impact.
- **Scenarios:** base, downside, upside, each with a coherent story (not just ±20% on everything).
- **Breakeven:** how far the key driver can fall before NPV = 0. This is the single most useful number for the board.

### Worked Example

Initiative: $2.0M investment; incremental cash flows (net of cannibalisation) of $0.3M, $0.7M, $1.0M, $1.2M, $1.2M in years 1–5. Hurdle rate 12%. No terminal value.

| Year | Cash flow ($M) | Discount factor @12% | Present value ($M) | Cumulative cash ($M) | Cumulative PV ($M) |
|------|---------------|----------------------|--------------------|----------------------|--------------------|
| 0 | (2.00) | 1.000 | (2.000) | (2.00) | (2.000) |
| 1 | 0.30 | 0.893 | 0.268 | (1.70) | (1.732) |
| 2 | 0.70 | 0.797 | 0.558 | (1.00) | (1.174) |
| 3 | 1.00 | 0.712 | 0.712 | 0.00 | (0.462) |
| 4 | 1.20 | 0.636 | 0.763 | 1.20 | 0.301 |
| 5 | 1.20 | 0.567 | 0.681 | 2.40 | 0.981 |

- **NPV @12%:** +$0.98M
- **IRR:** ≈ 26.7%
- **Payback:** 3.0 years · **Discounted payback:** ≈ 3.6 years

**Sensitivity:**

| Scenario | NPV ($M) | Clears hurdle? |
|----------|----------|----------------|
| Base | +0.98 | Yes |
| Cash inflows −20% | +0.39 | Yes |
| One-year delay (all inflows shift a year) | +0.66 | Yes |
| −20% and one-year delay | +0.13 | Barely |
| Breakeven | Inflows can fall 33% before NPV = 0 | |

How to read this for the board: "The case survives a 20% shortfall or a one-year delay, but not much more than both together. The assumption to watch is year-3 volume."

### Financial Case Checklist
- [ ] NPV stated at the group hurdle rate, with the rate named
- [ ] IRR, simple payback and discounted payback stated
- [ ] Cash flows are incremental; sunk costs excluded; cannibalisation included
- [ ] Every key assumption has a source (customer data, pilot, market research, comparable)
- [ ] Sensitivity on the top 3–4 drivers and a downside scenario
- [ ] Breakeven value of the most important driver
- [ ] Terminal value shown separately (or excluded) and its share of NPV disclosed
- [ ] Funding phased by stage gate, with spend at each gate
- [ ] Impact on group P&L, cash and key ratios (EPS, margin, leverage) for the next 2–3 years

---

## Risks

### Risk Register Format

| Risk | Category | Likelihood (L/M/H) | Impact (L/M/H) | Mitigation | Early-warning indicator | Owner |
|------|----------|--------------------|----------------|------------|-------------------------|-------|
| Adoption slower than plan | Commercial | M | H | Pilot with 3 customers before full launch; tranche 2 gated on pilot results | Pilot conversion < 40% by month 4 | Sponsor |

### Categories to Cover
- **Commercial:** demand, pricing, competition, channel conflict
- **Execution:** delivery timeline, key-person dependency, integration with existing systems
- **Financial:** cost overrun, FX, working capital, funding availability
- **Core-business risk:** cannibalisation, brand damage, distraction of management, customer confusion
- **Regulatory and legal:** licences, data protection, product liability, competition law
- **Technology:** build risk, security, vendor dependency
- **People:** hiring the key roles, retention, cultural fit with the group
- **Reputational / ESG:** environmental, social and governance exposure

### What Boards Look For in Risks
- The top 3 risks named honestly, not 20 generic ones
- The risk that would kill the initiative identified, with its early-warning metric
- Mitigations that cost money are already in the budget
- Residual risk after mitigation is stated and within the group's risk appetite

---

## Governance

- **Delegated authority:** confirm the amount is within (or requires) board approval under the group's delegation-of-authority policy.
- **Accountability:** one named executive sponsor; a dedicated lead; a steering group if the initiative spans units.
- **Stage gates:** funding released in tranches. Each gate has measurable criteria and a decision owner. Example: Gate 1 ($0.5M) build MVP → Gate 2 ($0.8M) released if pilot conversion ≥ 40% → Gate 3 ($0.7M) released if 50 paying customers by month 12.
- **Kill criteria:** agreed now, before emotions and sunk costs build up. "If fewer than 20 paying customers by month 9, stop and return to the board."
- **Reporting:** quarterly to the board with 3–5 KPIs against plan; exceptions reported immediately if a kill criterion is approached.
- **Conflicts of interest:** any director or executive interest declared and recorded.
- **Post-investment review:** formal look-back 12–24 months after launch comparing actuals to the approved case.

---

## The Decision Being Asked For

Write the resolution so it can be minuted word for word. It must state: what is approved, the amount, the phasing, conditions, delegated authority and the next review.

**Template:**
> The Board is asked to:
> 1. **Approve** capital expenditure of up to **$[X]M** for **[initiative]**, to be released in [N] tranches against the stage gates in Section 7;
> 2. **Approve** release of Tranche 1 of **$[Y]M** immediately;
> 3. **Delegate** authority to the [CEO/CFO] to release subsequent tranches when the gate criteria are met, reporting each release to the Board;
> 4. **Note** the kill criteria in Section 8 and that the initiative will return to the Board if any is triggered; and
> 5. **Note** that a post-investment review will be presented in [month year].

**Decision options to offer the board:**
- **Approve** as recommended
- **Approve with conditions** (e.g. smaller first tranche, extra gate)
- **Defer** pending specific further work (name it and the date)
- **Reject**

---

## Why Board Papers Get Sent Back

- The ask is buried or ambiguous (no clear amount or resolution)
- Only one option presented; no "do nothing" baseline
- Cash flows not incremental, or sunk costs used as justification
- No sensitivity analysis, or NPV relies entirely on terminal value
- Risks generic, unranked, or missing the risk to the core business
- No named accountable owner
- No stage gates or kill criteria: an all-or-nothing request
- Key stakeholders (finance, legal, the affected business unit) not consulted
- Numbers inconsistent between summary and appendix
- Too long: the decision-relevant content isn't in the first two pages

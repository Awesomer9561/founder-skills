# Churn Diagnosis Reference

How to find out why customers leave, design a health score that warns you before they do, and compare against benchmarks without mistaking a benchmark for a target.

**Rule:** Diagnosis comes from the customer's data and conversations. Benchmarks only tell you whether a number is unusual. Never present a benchmark as the customer's own figure.

---

## Part 1: Measure Churn Correctly

### Core Formulas

| Metric | Formula | Notes |
|--------|---------|-------|
| **Logo churn (monthly)** | Customers lost in month / customers at start of month | Exclude customers who joined during the month from the denominator |
| **Gross revenue churn (GRR loss)** | (Churned MRR + contraction MRR) / MRR at start of period | Ignores expansion; shows the leak |
| **Gross revenue retention (GRR)** | 1 − gross revenue churn | Can never exceed 100% |
| **Net revenue retention (NRR)** | (Start MRR − churn − contraction + expansion) / start MRR, for the same cohort | Above 100% means the base grows on its own |
| **Annualised churn from monthly** | 1 − (1 − monthly churn)^12 | 3% monthly ≈ 31% annual, not 36% |
| **Activation rate** | Customers meeting the activation event in window / new customers in cohort | Define the event first (see onboarding-audit.md) |

### Common Measurement Mistakes
- Averaging churn across all customers: early churn hides behind a large, stable older base. Use cohorts.
- Counting free users or trials as churn: measure trial conversion separately.
- Mixing monthly and annual plans: annual customers can only churn at renewal. Report them separately.
- Counting downgrades as retained: track contraction as part of revenue churn.
- Small numbers: with fewer than ~30 customers, a percentage is noise. List the customers who left and why instead.

---

## Part 2: Cohort Analysis

Group customers by the month (or week) they started and track what share is still active at month 1, 2, 3, 6 and 12.

### How to Read a Retention Curve

| Shape | What it means | Where to look |
|-------|---------------|---------------|
| **Steep drop, then flattens** | Healthy core; early churn is an activation or fit problem | Onboarding, acquisition channel, fit gate |
| **Steady decline, never flattens** | No product-market fit for this segment, or value decays over time | Habit, value delivered, segment fit |
| **Flattens, then drops at month 12** | Annual renewal cliff | Value proof before renewal, champion risk |
| **Newer cohorts worse than older** | Acquisition quality dropped (new channel, new segment, discounting) | Channel and segment mix of recent cohorts |
| **Newer cohorts better than older** | Recent onboarding or product changes are working | Keep going; confirm with the next cohort |
| **Curve rises after flattening ("smile")** | Reactivation or expansion; customers come back | Win-back and expansion levers |

### Slice Cohorts By
- Acquisition channel (organic, paid, outbound, referral, partner)
- Plan and price point
- Company size or customer type (ICP vs non-ICP)
- Activated vs not activated in the first window
- Onboarding path (self-serve vs assisted)
- Discount or promo used at signup

The slice where retention differs most is usually the diagnosis.

---

## Part 3: Voluntary vs Involuntary Churn

| Type | Cause | Typical share | Fix |
|------|-------|---------------|-----|
| **Voluntary** | Customer decides to cancel | Majority in B2B; often 60 to 80% in B2C | Product, onboarding, fit, value, price |
| **Involuntary** | Payment fails (expired card, insufficient funds, bank decline) | Often 20 to 40% of churn in card-billed B2C and SMB SaaS (**benchmark**) | Dunning, retries, card updater, pre-expiry emails |

**Always split these first.** Involuntary churn is the cheapest churn to fix and needs no product work. If it isn't measured, measuring it is an action item.

---

## Part 4: Churn Reasons Taxonomy

Classify every churned customer into one primary reason. Use cancel-survey answers, exit interviews, support history and usage data together; survey answers alone are unreliable ("too expensive" often means "not enough value").

| Category | Sub-reasons | Evidence that confirms it | Typical lever |
|----------|-------------|---------------------------|---------------|
| **Never activated** | Setup too hard, didn't reach aha, didn't understand product | Low or no usage after week 1; setup steps incomplete | Activation levers, onboarding fixes |
| **Poor fit** | Wrong company size, wrong use case, sold a promise the product doesn't keep | Churn concentrated in non-ICP segment or one channel | Fit gate, change targeting, adjust sales messaging |
| **Value not realised** | Used it but didn't see results; "not using it enough" | Usage present but shallow (1 feature, 1 user); no outcome metric moved | Habit levers, show value delivered |
| **Price / budget** | Too expensive, budget cut, cheaper alternative | Downgrades before cancel; reason cites price; churn spikes after price change | Right-size plan, annual discount, show ROI, pause |
| **Product gap** | Missing feature, bugs, performance, integrations | Support tickets and feature requests from churned accounts | Roadmap, workaround guides, win-back when shipped |
| **Competitor** | Switched to named competitor | Cancel reason names them; data exports before cancel | Competitive positioning, switching-cost through value |
| **Service failure** | Slow support, outages, bad experience | Ticket volume, CSAT drop, escalations before churn | Support SLAs, incident communication |
| **Champion loss (B2B)** | Main user left or changed role | Champion's last login long ago; email bounces | Multi-user adoption, executive sponsor |
| **Business change** | Customer's company closed, acquired, pivoted, seasonal | Company news, reason cites it | Mostly unavoidable; pause option for seasonal |
| **Involuntary** | Payment failure | Billing logs | Payment recovery |

### Ranking Likely Causes Without Full Data
When the founder has little data, rank hypotheses by:
1. **Fit with stated symptoms:** when do customers leave, and what do they say?
2. **Base rate for this business type:** early-stage self-serve churn is most often activation and fit; established B2B churn is most often value realisation and champion loss.
3. **Cost of confirming:** list the cheapest piece of evidence that would confirm or kill each hypothesis.

Every ranked cause must state the evidence needed to confirm it. A cause without a test is a guess.

---

## Part 5: Leading Indicators

Signals that show up weeks before a cancel. Track the change, not just the level: a customer whose usage halves is at more risk than one whose usage has always been low.

| Signal | Why it predicts churn | Lead time (typical) |
|--------|----------------------|---------------------|
| Login / session frequency drops 30%+ vs their own 4-week average | Disengagement | 2 to 8 weeks |
| Core feature usage drops or stops | Value no longer delivered | 2 to 8 weeks |
| Active seats decline | Team abandoning product | 4 to 12 weeks |
| Champion inactive or leaves company | Nobody defends the renewal | 1 to 3 months |
| Activation not reached by end of window | Never got value | Immediate |
| Support tickets spike, or go to zero after being active | Frustration, or giving up | 2 to 6 weeks |
| Low CSAT / NPS detractor response | Stated dissatisfaction | 1 to 3 months |
| Downgrade or plan change | Value or budget doubt | 1 to 3 months |
| Data export, integration disconnected | Preparing to switch | Days to weeks |
| Failed payment | Involuntary churn risk | Days |
| No response to renewal outreach / skipped QBR | Disengaged buyer | 1 to 2 months |

---

## Part 6: Health Score Design

A health score combines a few signals into one number so the team knows which accounts need attention. Keep it simple enough that everyone understands why an account is red.

### Design Rules
1. **4 to 6 signals.** More is rarely better and makes the score opaque.
2. **Mix signal types:** usage (what they do), outcome (what they get), relationship (how they feel), commercial (what they pay).
3. **Weight by predictive power,** not importance by opinion. Start with judgment weights, then compare against who actually churned after 1 to 2 quarters and re-weight.
4. **Score each signal 0 to 100** against clear thresholds, then take the weighted sum.
5. **Three bands:** Healthy (70 to 100), At risk (40 to 69), Critical (0 to 39). Each band has a defined action.
6. **Use change over time** where you can (trend beats snapshot).
7. **Back-test:** what share of churned accounts were red 30 to 60 days before they left? If it's low, the score is wrong.

### Signal Menu

| Signal | Type | Example threshold for 100 / 50 / 0 |
|--------|------|------------------------------------|
| Activation reached | Usage | Yes = 100; partial = 50; no = 0 |
| Usage frequency vs own baseline | Usage | ≥ baseline = 100; −30% = 50; −60% = 0 |
| Core feature breadth | Usage | 3+ core features = 100; 2 = 50; 1 = 0 |
| Active seats / licensed seats | Usage (B2B) | ≥ 70% = 100; 40% = 50; < 20% = 0 |
| Outcome metric moved | Outcome | Customer's goal hit = 100; progress = 50; none = 0 |
| Champion engaged | Relationship (B2B) | Active this week = 100; this month = 50; gone = 0 |
| NPS / CSAT | Relationship | Promoter = 100; passive = 50; detractor = 0 |
| Support sentiment | Relationship | No open escalations = 100; one = 50; multiple = 0 |
| Payment status | Commercial | Current = 100; one failure = 50; past due = 0 |
| Plan trajectory | Commercial | Expanded = 100; flat = 50; downgraded = 0 |

### Starting Weights by Segment
These are starting points to adjust, not rules.

| Segment | Suggested signals and weights |
|---------|-------------------------------|
| **B2C / prosumer self-serve** | Usage frequency 35%, activation 25%, feature breadth 20%, payment status 20% |
| **SMB SaaS (self-serve or light-touch)** | Usage frequency 30%, activation 20%, feature breadth 20%, seat utilisation 15%, payment status 15% |
| **Mid-market / enterprise B2B** | Seat utilisation 25%, champion engaged 20%, outcome moved 20%, usage frequency 15%, support sentiment 10%, NPS 10% |

---

## Part 7: Benchmarks by Segment

**These are benchmarks: broad industry ranges for orientation.** They vary by source, year, price point and definition. Label them as benchmarks every time they appear in output, and never present them as the customer's numbers.

### Churn and Retention

| Segment | Monthly logo churn (benchmark) | Annual GRR (benchmark) | NRR (benchmark) |
|---------|-------------------------------|------------------------|-----------------|
| B2C subscription apps | 5 to 15%+ | Low; most users gone within year 1 | Usually < 100% |
| Prosumer / SMB SaaS, low ACV (< $1k/yr) | 3 to 7% | 60 to 80% | 80 to 100% |
| SMB SaaS ($1k to $10k ACV) | 2 to 4% | 75 to 85% | 90 to 105% |
| Mid-market SaaS ($10k to $50k ACV) | 1 to 2% | 85 to 92% | 100 to 115% |
| Enterprise SaaS ($50k+ ACV) | < 1% | 90 to 95%+ | 110 to 130% |

### Activation and Onboarding

| Metric | Benchmark range |
|--------|-----------------|
| Self-serve SaaS activation rate (signup to activated) | 20 to 40% typical; 40%+ strong |
| Free trial to paid (opt-in, no card) | 10 to 25% |
| Free trial to paid (card required) | 40 to 60% |
| Share of churn in first 90 days (SMB SaaS) | Often 40%+ of all churn |
| Involuntary share of churn (card-billed) | 20 to 40% |

### Using Benchmarks Correctly
- Compare to the right segment (ACV, B2B/B2C, self-serve/sales-led).
- A benchmark tells you whether a number is unusual, not what to do about it.
- The customer's own trend over time matters more than any benchmark.
- If the customer has no data, say "benchmark for [segment]" and make measuring their own number a first action.

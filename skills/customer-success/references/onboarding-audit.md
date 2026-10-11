# Onboarding Audit Checklist

A systematic checklist for auditing how new customers get from signup (or contract signature) to retained. Work through every section. For each item, record **Pass / Fail / Unknown** and the evidence. "Unknown" is a finding too: it tells the founder what to measure.

---

## Key Definitions

Agree on these before auditing anything else. Most onboarding problems trace back to one of them being undefined.

| Term | Definition | Example |
|------|-----------|---------|
| **Aha moment** | The moment the customer first experiences the core value, emotionally ("oh, this works"). | Seeing their first automated report populate with their own data |
| **Activation event** | A measurable behaviour, done within a time window, that predicts retention. Usually includes the aha moment plus a sign of repeat intent. | "Connected a data source AND viewed 2 reports within 7 days" |
| **Time-to-value (TTV)** | Elapsed time from signup (or contract) to the aha moment. | Median 18 minutes self-serve; 9 days sales-led |
| **Setup moment** | The one-time configuration needed before value is possible. | Connecting Stripe, importing contacts |
| **Habit moment** | The repeated behaviour that marks a retained customer. | Opening the weekly digest 3 weeks in a row |

### How to Find the Activation Event
1. List 5 to 10 candidate behaviours from the first 7 to 30 days (created X, invited Y, connected Z, used feature N times).
2. For each, compare retention at day 60 or 90 between customers who did it and those who didn't.
3. Pick the behaviour with the largest retention gap that a large share of retained customers actually did. A behaviour only 5% of retained users did is too narrow.
4. Add a threshold and time window: "did X at least N times within D days".
5. Re-check the definition quarterly.

**If there's no data yet:** interview your 5 to 10 best customers. Ask "When did you first know this was going to work for you?" and "What would you miss most if it disappeared?" The common answer is your first draft of the aha moment. Mark it as a hypothesis.

---

## Section 1: Time-to-Value

- [ ] TTV is measured (median, not mean), and someone looks at it at least monthly
- [ ] Self-serve: aha moment is reachable in the first session
- [ ] Sales-led: first visible win lands within 14 days of contract signature
- [ ] Every step between signup and aha has been listed, and each is marked "required for first value" or "not"
- [ ] Steps not required for first value are deferred until after the aha moment
- [ ] Customers can see value before they finish setup (sample data, preview, demo project)

**Red flags:** TTV unknown; mandatory profile or settings screens before any value; "book a call to get started" for low-ACV self-serve.

---

## Section 2: Aha Moment

- [ ] The aha moment is written down in one sentence
- [ ] The onboarding flow is designed to reach it (not to tour every feature)
- [ ] The aha moment uses the customer's own data, not a generic demo, wherever possible
- [ ] Marketing promise and aha moment match (the thing they signed up for is the thing they see first)
- [ ] Share of new customers who reach the aha moment is measured

**Red flags:** product tour that lists features; different teams naming different aha moments; marketing sells outcome A, onboarding delivers feature B.

---

## Section 3: Empty States

- [ ] Every screen a new user can land on has a designed empty state
- [ ] Each empty state explains what will appear here and why it matters
- [ ] Each empty state has one clear action to fill it
- [ ] Sample data or templates are offered where the product is meaningless without data
- [ ] Empty states for invited teammates differ from those for the account creator

**Red flags:** blank tables with "No data"; a dashboard full of zeros; teammates landing in an empty workspace with no context.

---

## Section 4: Setup Friction

- [ ] Signup form has the minimum fields (email + password or SSO; everything else later)
- [ ] SSO / social login offered where the audience expects it
- [ ] Integrations needed for first value are 1-click (OAuth), not API keys and docs
- [ ] Data import has a guided path (CSV template, migration from named competitors)
- [ ] Credit card not required to reach the aha moment (unless deliberately chosen as a fit gate)
- [ ] Drop-off is measured at each setup step
- [ ] The step with the biggest drop-off is known and owned by someone

**Red flags:** 8+ field signup; required technical setup for a non-technical buyer; no funnel data on setup steps.

---

## Section 5: Onboarding Emails and In-App Messaging

- [ ] Emails are triggered by behaviour (did / didn't do X), not only by day count
- [ ] Each email has one goal and one CTA that deep-links to the exact step
- [ ] Sequence stops or changes once the customer activates
- [ ] Welcome email arrives within minutes and states the one next action
- [ ] Sender is a person (founder or CSM), not "noreply"
- [ ] Replies go to a monitored inbox
- [ ] In-app prompts appear at the moment of need, not all on first login
- [ ] Open, click and step-completion rates are tracked per email

**Red flags:** a 10-day drip of feature announcements; the same emails to activated and unactivated users; nobody reads replies.

---

## Section 6: Human Touchpoints

- [ ] There is a defined point where a human steps in (and it is tied to a milestone or risk signal, not the calendar)
- [ ] Bootstrapped/early: the founder personally contacts every new customer in the first week
- [ ] B2B: a kickoff call with success criteria agreed in writing ("in 30 days we'll know this works if…")
- [ ] Customers who stall at setup get a human nudge within 48 hours
- [ ] High-value accounts have a named owner from day 1
- [ ] What customers say in these touchpoints is logged and reviewed

**Red flags:** humans only appear at renewal; nobody owns stalled accounts; insights from calls never reach product.

---

## Section 7: Milestones and Targets

- [ ] Onboarding is broken into 3 to 6 milestones from signup to habit
- [ ] Each milestone has a time target and a completion-rate target
- [ ] Each milestone has an owner (product, CS, founder)
- [ ] Customers who miss a milestone trigger an action (email, in-app, human)

### Milestone Template

| # | Milestone | Definition | Target time | Target completion |
|---|-----------|-----------|-------------|-------------------|
| 1 | Signed up / Kickoff | Account created or kickoff call held | Day 0 | 100% |
| 2 | Setup complete | Required integration connected / data imported | Day 0 to 1 (self-serve), Day 7 (B2B) | 70%+ |
| 3 | Aha moment | First value with own data | Session 1 (self-serve), Day 14 (B2B) | 50%+ |
| 4 | Activated | Activation event met | Day 7 (self-serve), Day 30 (B2B) | 40%+ |
| 5 | Habit | Repeat usage on the job's natural cadence | Day 30 to 60 | 30%+ |
| 6 | Expanded (B2B) | Second user, team or use case | Day 60 to 90 | 20%+ |

The completion targets above are starting **benchmarks**, not norms. Replace them with the customer's own baseline as soon as it's measured.

---

## Section 8: Measurement Readiness

- [ ] Signup, setup, aha and activation events are tracked as product events
- [ ] Cohorts by signup week or month can be pulled
- [ ] Activation rate is reported weekly
- [ ] Onboarding data can be segmented by plan, channel and company size

**If most items fail:** the first retention play is instrumentation. You cannot improve onboarding you can't see.

---

## Scoring the Audit

Count Fails per section. The section with the most Fails on the path to the aha moment (Sections 1 to 4) is the priority; later sections only matter once customers get to value.

| Result | Meaning | Priority |
|--------|---------|----------|
| Most Fails in Sections 1 to 4 | Customers never reach value | Fix activation before anything else |
| Most Fails in Sections 5 to 6 | Customers reach value but aren't guided or rescued | Add triggers and human touchpoints |
| Most Fails in Sections 7 to 8 | Flow may be fine but nobody can tell | Instrument and set targets |
| Mostly Unknown | Founder doesn't have visibility | Instrument first, then audit again in 30 days |

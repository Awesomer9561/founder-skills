# Retention Levers Reference

Proven levers for keeping customers, grouped by the stage of the lifecycle they act on: **activation**, **habit**, **expansion** and **win-back**. Each lever lists when to use it, when not to, how to run it, and how it differs for B2B and B2C.

Pick levers by diagnosis, not by taste. A lever that fixes an activation problem does nothing for a value-decay problem, and vice versa. Use `churn-diagnosis.md` to find where customers leak, then choose from the matching stage below.

---

## How to Choose a Lever

| Where customers leak | Symptom | Stage to work on |
|----------------------|---------|------------------|
| Never reach first value | Most churn happens in the first 7 to 30 days; low setup completion | Activation |
| Reach value once, then fade | Week-4 usage falls well below week-1; logins drop before cancel | Habit |
| Stay but stay small | Retained logos, flat revenue; NRR at or below 100% | Expansion |
| Leave, and some would come back | Cancel reasons are timing, budget or "not now"; reactivations happen unprompted | Win-back |
| Leave because of card failure | Large share of churn is failed payments | Involuntary churn (see Payment Recovery) |

**Rule:** Fix the earliest leaking stage first. Expansion plays on a base that never activated only accelerate churn.

---

## Stage 1: Activation

Goal: get a new customer to the aha moment (first real value) as fast as possible, and then to the activation event (the behaviour that predicts retention).

### Lever 1.1: Shorten Time-to-Value
**What:** Remove every step between signup and first value that isn't required for that value. Defer profile setup, team invites, integrations and settings until after the first win.
**When to use:** Time-to-value is longer than one session for self-serve, or longer than 14 days for sales-led. Setup completion is below 60%.
**When not to use:** Value genuinely depends on setup (e.g. data import for an analytics tool). Then use Lever 1.2 instead.
**How:** Map every step from signup to aha. Mark each step "required for first value" or "not". Move every "not" after the aha moment.
- **B2C:** Aim for value in the first session, ideally under 5 minutes. Every extra screen costs signups.
- **B2B:** The champion gets value first, then brings the team. A 14 to 30 day onboarding for enterprise is normal; the first visible win should still land in week 1.

### Lever 1.2: Done-for-You Setup
**What:** Do the setup for the customer: import their data, configure the integration, build the first project or template.
**When to use:** Setup is the main drop-off point and you can't remove it. Early stage, where founder time is cheaper than lost customers.
**When not to use:** Self-serve B2C at scale, or when the setup teaches the customer how the product works.
- **B2C:** Templates, sample data and pre-filled states do the same job without a human.
- **B2B:** Concierge onboarding call, white-glove migration, or a CSM-led kickoff. For accounts above roughly $10k ACV, assume it's expected.

### Lever 1.3: Sample Data and Templates
**What:** Show the product working before the customer has put anything in. Pre-populated workspace, template gallery, demo project.
**When to use:** Empty states are the first thing a new user sees. The product's value is only visible with data.
- **B2C:** Default content and starter templates.
- **B2B:** Industry-specific templates ("SaaS sales pipeline", "agency client portal").

### Lever 1.4: Behaviour-Triggered Onboarding Emails
**What:** Emails sent on what the user did or didn't do, not on a fixed day schedule. "You created a project but haven't invited anyone" beats "Day 3: Did you know…"
**When to use:** Always, once you have more than a handful of signups a week.
**How:** One email per missed milestone, each with a single CTA that deep-links to the exact step. Stop the sequence once the user activates.
- **B2C:** Push and in-app often outperform email. Keep it to the next action.
- **B2B:** Send to the champion, and give them something to forward to their manager (a summary of results, a ROI snapshot).

### Lever 1.5: Human Touchpoint at the Drop-Off
**What:** A real person reaches out at the moment users most often stall: a 15-minute call, a personal email from the founder, a Loom walkthrough.
**When to use:** Fewer than ~500 new customers a month, or any account large enough that losing it hurts. It is the best diagnostic tool you have, not just a retention play.
- **B2C:** Rarely viable beyond the first hundred users; use it to learn, then automate what you learn.
- **B2B:** Standard. Tie it to the activation milestone, not to the calendar.

### Lever 1.6: Fit Gate at Signup or Sale
**What:** Stop acquiring customers who won't succeed. Qualifying questions at signup, disqualification criteria in sales, honest "who this isn't for" copy.
**When to use:** Churn concentrates in a segment that never activates (wrong company size, wrong use case, wrong channel).
**Trade-off:** Fewer signups now, much less churn later. Sales and growth will push back; show them the cohort data.

---

## Stage 2: Habit

Goal: turn one-time value into repeated value, so the product becomes part of how the customer works or lives.

### Lever 2.1: Usage Trigger Loops
**What:** Give the customer a reason to come back on the natural cadence of the job: a weekly digest, an alert when something changes, a scheduled report.
**When to use:** The product's job recurs (weekly reporting, daily tasks) but usage is sporadic.
**When not to use:** The job is genuinely infrequent (tax filing, annual planning). Then retention depends on being remembered, not on habit; lean on Lever 2.4.
- **B2C:** Streaks, daily reminders, content feeds. Watch notification fatigue: measure opt-out rate.
- **B2B:** Slack or email digests with the customer's own numbers. Make the digest useful on its own, with a link back.

### Lever 2.2: Deepen Adoption (Feature Breadth)
**What:** Move customers from one feature to the two or three that, together, correlate with retention. Customers using more core features churn less in almost every product.
**When to use:** Retained customers use 3+ core features; churned customers used 1.
**How:** Find the feature combination that best predicts retention in your data. Prompt the next feature in context, at the moment it's useful.

### Lever 2.3: Multi-User Adoption (Seat Depth)
**What:** Get more people inside the customer account using the product. One user is a single point of failure.
**When to use:** B2B. Accounts with one active user churn far more than accounts with three or more.
- **B2C:** The equivalent is social or shared use (shared lists, family plans, collaboration).
- **B2B:** Invite flows tied to real work ("assign this task to a teammate"), not a generic "invite your team" banner.

### Lever 2.4: Store Value in the Product (Switching Cost)
**What:** The more of the customer's data, history, configuration and integrations live in the product, the more it costs to leave. Earn this by being useful, not by locking data in.
**When to use:** Mid-term retention is weak and competitors are easy to switch to.
**Warning:** Hostile lock-in (hard exports, hidden cancel flows) damages trust and invites regulation. Make switching cost come from accumulated value.

### Lever 2.5: Show the Value Delivered
**What:** Tell customers, in numbers, what the product did for them: hours saved, revenue influenced, tasks completed. People forget value they don't see.
**When to use:** Customers use the product but cancel saying "not getting enough value" or "too expensive".
- **B2C:** Monthly recap, year-in-review.
- **B2B:** Quarterly business review (QBR) or a self-serve value report the champion can show their boss before renewal.

---

## Stage 3: Expansion

Goal: grow revenue from existing customers so net revenue retention (NRR) exceeds 100%, which offsets logo churn.

### Lever 3.1: Usage-Based Expansion
**What:** Pricing that grows with value: seats, usage volume, projects, contacts.
**When to use:** Value scales with usage and customers grow over time.
**Trade-off:** Unpredictable bills create churn. Add alerts before limits and caps customers can set.

### Lever 3.2: Tier Upgrade Prompts
**What:** Show higher-tier features at the moment the customer hits the limit or the need, not in a generic upsell email.
**When to use:** Clear feature gaps between tiers, and customers hit them in normal use.

### Lever 3.3: Land and Expand (B2B)
**What:** Win one team, prove value, use that team as the reference to win the next team in the same company.
**When to use:** B2B with multiple potential buying teams per customer. Needs a champion who will make an internal introduction.

### Lever 3.4: Annual Plans and Prepay
**What:** Offer annual billing (commonly at a discount equal to 1 to 2 months). Annual customers churn at renewal points only, giving you 12 months to deliver value.
**When to use:** Monthly churn is meaningful and activated customers would commit.
**When not to use:** Customers haven't activated yet. Pushing annual on unactivated customers buys refunds and bad reviews.

---

## Stage 4: Win-Back

Goal: recover customers who left, and stop some from leaving at the moment they try.

### Lever 4.1: Cancellation Flow with Save Offers
**What:** Ask why at cancel and match the offer to the reason: pause for "not using it right now", downgrade for "too expensive", help for "too hard", nothing for "switched to competitor X" (just learn).
**When to use:** Self-serve subscription. Keep the flow to 1 or 2 screens; obstructive flows break consumer protection rules in several markets and damage the brand.
- **B2C:** Pause is often the strongest single save option.
- **B2B:** Route accounts above a value threshold to a human before the cancel completes.

### Lever 4.2: Pause Instead of Cancel
**What:** Let customers pause billing for 1 to 3 months.
**When to use:** Seasonal businesses, B2C subscriptions, "not using it right now" reasons.

### Lever 4.3: Win-Back Campaign
**What:** Contact churned customers at 30, 60 and 90 days with what has changed: the feature they asked for shipped, the bug is fixed, a returning offer.
**When to use:** You have shipped something that addresses a common cancel reason. Without a real change, win-back emails are noise.
- **B2C:** Discounted return offer, time-limited.
- **B2B:** Personal note from the founder or CSM referencing their specific reason.

### Lever 4.4: Payment Recovery (Involuntary Churn)
**What:** Recover failed payments: card updater services, smart retry schedules, dunning emails, in-app banners, pre-expiry reminders.
**When to use:** Always for card-billed subscriptions. Involuntary churn is often a large share of total churn in B2C and SMB SaaS and is the cheapest churn to fix.
**How:** Retries spread over 1 to 3 weeks, 3 to 4 dunning emails, an in-app banner, and a pre-dunning email before the card expires.

---

## B2B vs B2C at a Glance

| Dimension | B2B | B2C |
|-----------|-----|-----|
| Who decides to stay | Buyer and champion (often different people) | The user |
| Main churn moment | Renewal date, champion leaving, budget review | Any month, often silently |
| Best activation lever | Done-for-you setup, human kickoff | Shorter time-to-value, templates |
| Best habit lever | Multi-user adoption, integrations | Triggers, streaks, content |
| Expansion | Seats, usage, land and expand | Tier upgrades, add-ons, family plans |
| Human touch | Scales with ACV | Only for learning, early on |
| Leading risk signal | Champion change, seat decline, missed QBR | Session frequency drop |
| Involuntary churn share | Lower (invoices, ACH) | Higher (cards) |

---

## Scaling CS Without Headcount Explosion

Use these when the number of accounts grows faster than the team:

1. **Segment by value:** high-touch (named CSM) for the top accounts, low-touch (pooled CSMs, webinars) for the middle, tech-touch (automated) for the long tail.
2. **Automate the predictable:** onboarding emails, health alerts, renewal reminders, QBR data packs.
3. **Self-serve help:** a help centre built from the top 20 support tickets, in-app guides at the points where tickets come from.
4. **Community:** customers answering each other, user groups, office hours instead of one-to-one calls.
5. **Fix the product, not the ticket:** route repeat issues to product; every recurring onboarding question is a design bug.

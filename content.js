/* ==========================================================================
   Longhorn Software — Single Source of Truth for Copy
   --------------------------------------------------------------------------
   All editable copy lives here. Edit any string and reload.
   When porting to Next.js this file becomes content.ts with the same shape.
   ========================================================================== */

window.LH_CONTENT = {
  meta: {
    title: "Longhorn Software | Modern Software Engineering, Powered by AI",
    description:
      "Modern software engineering, powered by AI, based in Dallas, Texas. We build and modernize systems, automate workflows, and deliver practical software without the bloat of legacy delivery.",
  },

  brand: {
    name: "Longhorn Software",
    legal: "Longhorn Software LLC",
    location: "Dallas, Texas",
    email: "",
  },

  
nav: [
  { label: "Who we are", href: "#about" },
  { label: "What we build", href: "#services" },
  { label: "Why domestic", href: "#why-domestic" },
  { label: "Half-day review", href: "#training" },
  { label: "Contact", href: "#contact" },
  { label: "About the Founder", href: "about.html" },
],

// Founder page header (about.html). Prose lives in about.html itself.
founder: {
  name: "Cameron Howard",
  role: "Founder & Lead Engineer",
  eyebrow: "Founder",
},

  hero: {
    eyebrow: "Software engineering · Dallas, TX",
    // Headline options. Default = index 0. Switch via Tweaks.
    // accentLine = which line is rendered in italic brass.
    headlineOptions: [
      {
        id: "american-ai",
        label: "American + AI (default)",
        lines: ["American software, AI-accelerated.", "Skip the offshoring tax."],
        accentLine: 1,
      },
      {
        id: "practice",
        label: "Practice (restrained)",
        lines: ["A software engineering", "practice in Dallas, Texas."],
        accentLine: 1,
      },
      {
        id: "verbs",
        label: "Verbs",
        lines: ["Build.", "Modernize.", "Automate."],
        accentLine: 2,
      },
      {
        id: "modern",
        label: "Modern / America",
        lines: ["Modern software,", "engineered in America."],
        accentLine: 1,
      },
      {
        id: "works",
        label: "Outcome",
        lines: ["Software that works.", "Without the bloat."],
        accentLine: 1,
      },
    ],
    tagline:
      "Modern software engineering, powered by AI, based in Dallas, Texas. We build and modernize systems, automate workflows, and deliver practical software without the bloat of legacy delivery.",
    ctaPrimary: { label: "Start a conversation", href: "#contact" },
    ctaSecondary: { label: "What we build", href: "#services" },
  },

about: {
  eyebrow: "Who we are",
  headline: "Who we are",
  body:
    "We're an AI-enabled engineering consultancy working with small to mid-size American businesses. Everything runs domestically, which makes us a fit when the work involves sensitive data, regulated industries, or IP that shouldn't leave the country. You'll work with Longhorn Software directly, not through a chain of account managers and project leads.",
},

services: {
  eyebrow: "What we build",
  headline: "What we build",
  lede:
    "Custom software, modernization work, performance projects, and integrations, handled by the same engineer who scopes the project. Start to finish, no hand-offs.",
  items: [
    {
      n: "01",
      title: "Custom software development",
      body: "New systems built from scratch, including web applications, internal tools, data platforms, and the integrations that hold them together.",
    },
    {
      n: "02",
      title: "Legacy system modernization",
      body: "Aging codebases, unsupported runtimes, and brittle deployments brought into a state your team can confidently operate and extend.",
    },
    {
      n: "03",
      title: "Performance optimization",
      body: "Slow queries, runaway cloud bills, and degraded user experience, diagnosed, fixed, and instrumented so the same problems don't return six months later.",
    },
    {
      n: "04",
      title: "Workflow automation & integration",
      body: "Manual hand-offs, spreadsheet glue, and disconnected SaaS replaced with reliable, observable automation between the systems you already run.",
    },
    {
      n: "05",
      title: "AI systems in production",
      feature: true,
      body: "AI capability built into real systems, new or existing, with the same engineering standards as everything else we ship: failures visible and recoverable, humans approving where it counts, and your team able to run it without us.",
    },
  ],
},

  hiddenCosts: {
    eyebrow: "Why domestic",
    // Default = index 0. Switch via Tweaks.
    headlineOptions: [
      "Hidden costs that don't show up on the invoice.",
      "The line items offshoring leaves off.",
      "What 'cheap' actually costs.",
    ],
    lede:
      "Offshore engineering looks cheap when you're comparing hourly rates on a spreadsheet. The real cost shows up later, paid out in rework, attrition, security exposure, and all the coordination required to keep a distant team productive. These are worth thinking about before you sign a statement of work.",
    points: [
      {
        title: "The communication tax",
        body:
          "Time-zone gaps stretch out clarification cycles across the lifetime of a project. A single ambiguous requirement can cost a full day before anyone notices it was misread, and across a multi-month build those quiet days quietly add up to weeks.",
      },
      {
        title: "The rework tax",
        body:
          "Engineers working without close peer review tend to produce code that needs rework later. The savings on hourly rate disappear the first time a critical path has to be rebuilt, and they keep disappearing every time the next person tries to extend it.",
      },
      {
        title: "The security tax",
        body:
          "When sensitive business data and source code cross international borders, you take on risk you can't fully audit. The pattern is well documented. Video streaming platforms, financial services firms, and healthcare vendors have all disclosed breaches and even data ransoms that traced back to outsourced development environments. The breach is what makes the news, but the decision to send the code abroad in the first place is usually what made it possible.",
      },
      {
        title: "The turnover tax",
        body:
          "Large offshore development firms routinely report annual attrition of 12–15%, and the industry peaked above 20% during the last hiring surge. The engineer who built your system is rarely the one maintaining it a year later, and the institutional knowledge walks out the door.",
      },
      {
        title: "The coordination tax",
        body:
          "With larger offshore engagements, you\'re not just paying for engineering hours. Project managers, account managers, QA layers, and translation overhead get built into the rate or billed separately. The line item that wins the pitch is rarely the line item that defines the invoice.",
      },
    ],
  },

  training: {
    eyebrow: "Half-day review",
    headline: "Start with a working session.",
    body:
      "Whether you have a project already scoped or a problem you're still circling, spend half a day with us before committing to a build. We sit down with your team, on your stack and inside your actual workflows, and work the problem: what's worth building, where we'd start, and what it would actually take. You leave with straight answers and a clear sense of what we're like to work with.",
    bullets: [
      "Hands-on with your real systems, not a simple demo",
      "Built for decision-makers and their teams, technical or not",
      "Everything we work through stays with you",
    ],
    cta: { label: "Book a session", href: "#contact" },
  },

  intake: {
    eyebrow: "Contact",
    headline: "Start a conversation.",
    body:
      "Tell us a little about what you're working on. We read every inquiry and respond personally, usually within one business day.",
    fields: {
      name: "Name",
      email: "Email",
      projectType: "Project type",
      description: "Tell us about your project",
    },
    projectTypes: [
      "Half-day working session",
      "New software build",
      "AI systems",
      "Legacy modernization",
      "Performance optimization",
      "Workflow automation",
      "Something else",
    ],
    submit: "Send",
    success:
      "Thanks. Your note is in. We'll be in touch within one business day.",
  },

  // ----------------------------------------------------------------
  // Tweakable design tokens — exposed in the Tweaks panel.
  // ----------------------------------------------------------------
  tweaks: {
    accentOptions: [
      { id: "brass",     label: "Brass",      value: "oklch(0.78 0.09 80)"  },
      { id: "champagne", label: "Champagne",  value: "oklch(0.86 0.045 95)" },
      { id: "sage",      label: "Sage",       value: "oklch(0.74 0.04 145)" },
      { id: "slate",     label: "Slate blue", value: "oklch(0.74 0.04 230)" },
    ],
  },

  footer: {
    blurb:
      "Modern software engineering, powered by AI. Domestic operations from Dallas, Texas.",
    links: [],
  },
};

/** Shared editorial content, reused across the homepage and sub-pages. */

export const knowledgeLayers = [
  {
    label: "Public knowledge",
    title: "What the world knows",
    blurb: "Web pages, books, papers, code, and public conversations.",
  },
  {
    label: "Organizational knowledge",
    title: "How work actually happens",
    blurb:
      "Support histories, project decisions, workflows, approvals, exceptions, and operational records.",
  },
  {
    label: "Agent experience",
    title: "What acting in the world teaches",
    blurb: "Tasks, actions, tool usage, failures, corrections, and outcomes.",
  },
] as const;

export const dataTypes = [
  {
    title: "Customer support histories",
    systems: "Zendesk · Intercom · Salesforce · Slack",
    blurb: "Conversation → investigation → escalation → resolution.",
  },
  {
    title: "Sales & CRM workflows",
    systems: "Salesforce · HubSpot",
    blurb: "Qualification, negotiation, onboarding, and account expansion.",
  },
  {
    title: "Engineering tickets & resolutions",
    systems: "Jira · GitHub · Linear",
    blurb: "Incident, investigation, fix, and post-mortem trajectories.",
  },
  {
    title: "Project & collaboration history",
    systems: "Slack · Teams · Confluence",
    blurb: "Decisions, hand-offs, and the reasoning between them.",
  },
  {
    title: "Internal knowledge & SOPs",
    systems: "SharePoint · Notion · Drive",
    blurb: "Procedures, playbooks, and the exceptions that shape them.",
  },
  {
    title: "Decision & escalation records",
    systems: "Email · ServiceNow · ERP",
    blurb: "Who decided what, on what evidence, with what outcome.",
  },
  {
    title: "Workflow / action trajectories",
    systems: "Cross-system",
    blurb: "Multi-step tasks reconstructed as ordered action sequences.",
  },
  {
    title: "Agent evaluation environments",
    systems: "Derived assets",
    blurb: "Tasks, rubrics, and trajectories for measuring agent behavior.",
  },
] as const;

export const process = [
  {
    n: "01",
    title: "Discover",
    blurb:
      "We understand what data exists and what can be considered for licensing.",
  },
  {
    n: "02",
    title: "Permission",
    blurb:
      "Rights, ownership, privacy, security, and commercial constraints are reviewed.",
  },
  {
    n: "03",
    title: "Transform",
    blurb:
      "Selected data can be de-identified, structured, and transformed into AI-ready datasets.",
  },
  {
    n: "04",
    title: "License",
    blurb: "Qualified AI buyers receive access under defined licensing terms.",
  },
] as const;

export const principles = [
  {
    title: "Signal",
    blurb: "Meaningful workflows and decisions over raw volume.",
  },
  {
    title: "Context",
    blurb: "Preserve relationships, chronology, and workflow structure.",
  },
  {
    title: "Provenance",
    blurb: "Know where data came from and what permissions govern its use.",
  },
  {
    title: "Privacy",
    blurb:
      "De-identification, access control, and legal/security review are part of the pipeline.",
  },
] as const;

export const demandExamples = [
  "Customer-support resolution trajectories",
  "Procurement workflows",
  "Enterprise software actions",
  "Engineering incident resolution",
  "Sales & onboarding workflows",
] as const;

export const licensingModels = [
  {
    title: "One-time dataset",
    blurb: "A fixed historical dataset, scoped and delivered once.",
  },
  {
    title: "Subscription",
    blurb: "Recurring, refreshed data on a defined cadence.",
  },
  {
    title: "Custom dataset",
    blurb: "Built around a specific AI capability or evaluation.",
  },
  {
    title: "Exclusive license",
    blurb: "Defined buyer-exclusive access to a dataset.",
  },
  {
    title: "Data feed",
    blurb: "Ongoing structured delivery into a buyer pipeline.",
  },
  {
    title: "Evaluation / benchmark",
    blurb: "Tasks, trajectories, rubrics, and evaluation assets.",
  },
] as const;

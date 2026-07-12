const riskDrivers = [
  { driver_id: "decision_authority", name: "Decision Authority", options: ["to_be_determined", "informational_only", "drafting_support", "recommendation_support", "final_decision"], high_risk_values: ["recommendation_support", "final_decision"] },
  { driver_id: "affected_party", name: "Affected Party", options: ["to_be_determined", "internal_user_only", "employee", "customer", "applicant", "public"], high_risk_values: ["employee", "customer", "applicant", "public"] },
  { driver_id: "data_category", name: "Data Category", options: ["to_be_determined", "public", "approved_internal", "confidential", "regulated", "customer_personal", "employee_personal"], high_risk_values: ["regulated", "customer_personal", "employee_personal"] },
  { driver_id: "external_data_transfer", name: "External Data Transfer", options: ["to_be_determined", "none", "metadata_only", "approved_content", "confidential_content", "regulated_content"], high_risk_values: ["confidential_content", "regulated_content"] },
  { driver_id: "vendor_retention_training_use", name: "Vendor Retention or Training Use", options: ["to_be_determined", "not_applicable", "contractually_excluded", "limited_retention", "unclear", "permitted_for_training"], high_risk_values: ["unclear", "permitted_for_training"] },
  { driver_id: "citation_grounding", name: "Citation and Grounding", options: ["to_be_determined", "required_and_testable", "required_not_tested", "optional", "not_available"], high_risk_values: ["optional", "not_available"] },
  { driver_id: "access_control_inheritance", name: "Access-Control Inheritance", options: ["to_be_determined", "tested", "designed_not_tested", "manual_control", "not_available"], high_risk_values: ["manual_control", "not_available"] },
  { driver_id: "adversarial_exposure", name: "Adversarial Exposure", options: ["to_be_determined", "low_internal", "internal_with_untrusted_content", "external_user_input", "public_access"], high_risk_values: ["external_user_input", "public_access"] },
  { driver_id: "monitoring_feasibility", name: "Monitoring Feasibility", options: ["to_be_determined", "strong", "moderate", "weak", "not_feasible"], high_risk_values: ["weak", "not_feasible"] },
  { driver_id: "vendor_change_visibility", name: "Vendor Change Visibility", options: ["to_be_determined", "not_applicable", "advance_notice_and_release_notes", "release_notes_only", "limited_visibility", "none"], high_risk_values: ["limited_visibility", "none"] }
];

const evaluationAreas = [
  "use_case_scope",
  "vendor_third_party_evidence",
  "data_boundary",
  "retrieval_citation_quality",
  "output_reliability",
  "human_reliance",
  "access_control",
  "adversarial_resistance",
  "monitoring_incident_response",
  "change_management",
  "approval_residual_risk"
];

const areaNames = {
  use_case_scope: "Use-Case Scope",
  vendor_third_party_evidence: "Vendor and Third-Party Evidence",
  data_boundary: "Data Boundary and Confidentiality",
  retrieval_citation_quality: "Retrieval and Citation Quality",
  output_reliability: "Output Reliability and Grounding",
  human_reliance: "Human Reliance and Decision Influence",
  access_control: "Access Control",
  adversarial_resistance: "Adversarial and Misuse Resistance",
  monitoring_incident_response: "Monitoring and Incident Response",
  change_management: "Change Management",
  approval_residual_risk: "Decision Posture and Residual Risk"
};

const tierNames = {
  tier_0_unacceptable: "Unacceptable Pending Redesign",
  tier_1_low: "Low",
  tier_2_moderate: "Moderate",
  tier_3_high: "High"
};

const statuses = ["accepted", "partial", "weak", "stale", "not_applicable", "rejected", "pending"];
const recommendations = ["to_be_determined", "approve", "approve_with_conditions", "defer", "reject"];
const caseStatuses = ["draft", "in_review", "approved", "approved_with_conditions", "rejected", "retired"];
const testDispositionOptions = ["not_started", "planned", "passed", "failed", "formally_deferred"];
const evidenceSources = ["vendor", "user", "independent_test", "system_generated", "policy"];
const appVersion = "1.1.5";
const recommendationLabels = {
  to_be_determined: "TBD",
  approve: "Supportable for Review",
  approve_with_conditions: "Supportable with Conditions",
  defer: "Defer",
  reject: "Reject"
};
const caseStatusLabels = {
  draft: "Draft",
  in_review: "In Review",
  approved: "Reviewed as Supportable",
  approved_with_conditions: "Reviewed with Conditions",
  rejected: "Rejected",
  retired: "Retired"
};
const artifactBoundaryNotice = "Draft artifact only. This output is generated for review and discussion. The prototype checks documentation completeness and unresolved review work; it does not verify evidence quality, certify a system, or approve use. Source claims, vendor evidence, local test results, and policy conclusions must be independently verified before reliance.";
const deploymentStages = ["idea", "vendor_selection", "pilot_planning", "pilot", "production_review", "production", "retired"];
const startingPointOptions = [
  { value: "blank_new_case", label: "Blank New Case" },
  { value: "custom_case_library", label: "Using Custom Case in Library" }
];
const baselineIntendedUserOptions = [
  "internal operational users",
  "business managers or process owners",
  "risk, compliance, legal, or audit reviewers",
  "technical administrators or model owners",
  "external customers, applicants, or end users",
  "third-party service providers or vendors"
];
const baselineProhibitedUseOptions = [
  "final decisions without required human review",
  "uses outside the approved business purpose",
  "use with unapproved confidential, regulated, or personal data",
  "bypassing access controls or role-based permissions",
  "legal, compliance, employment, credit, or customer-impacting determinations unless specifically approved",
  "production deployment before required evidence, tests, monitoring, and approval are complete"
];

const frameworkAnchors = {
  case_intake: {
    title: "Use-case definition and scope boundary",
    role: "Defines the concrete AI use case, business purpose, intended users, and prohibited uses before risk judgment begins."
  },
  risk_drivers: {
    title: "Risk-driver intake and tiering logic",
    role: "Connects decision influence, affected parties, data boundary, adversarial exposure, monitoring feasibility, and change visibility to the recommended review tier."
  },
  evidence_matrix: {
    title: "Evidence sufficiency matrix",
    role: "Separates vendor or third-party evidence from user-side evaluation evidence and records gaps that must be resolved or accepted."
  },
  required_tests: {
    title: "Test obligations by use-case risk",
    role: "Translates risk drivers and template focus into concrete evaluation work before pilot or deployment review."
  },
  monitoring_plan: {
    title: "Post-approval monitoring and change control",
    role: "Defines the metrics, review cadence, incident triggers, and reapproval triggers needed after launch."
  },
  approval_recommendation: {
    title: "Residual-risk decision posture",
    role: "Frames the decision posture as a documented recommendation with conditions and an explicit residual-risk statement."
  },
  generated_artifacts: {
    title: "Portable evaluation artifacts",
    role: "Packages the case matrix, gaps, tests, monitoring plan, draft decision posture, and readiness review for local project records."
  }
};

const useCaseTemplates = [
  {
    template_id: "other_blank_evaluation",
    name: "Other",
    description: "A baseline evaluation workspace for cases that do not match a predefined scenario. Users define the use case, scope, risk drivers, evidence, tests, monitoring, and approval posture from scratch.",
    default_tier: "tier_2_moderate",
    typical_users: baselineIntendedUserOptions,
    typical_prohibited_uses: baselineProhibitedUseOptions,
    core_evaluation_focus: ["Other (please specify)"],
    kickoff_questions: [
      "What is the AI-enabled model, system, process, or workflow being evaluated for this evaluation?",
      "What business purpose, decision, task, or operational activity should the evaluation cover?",
      "Who are the intended users, affected parties, and accountable owners?",
      "What data, content, prompts, outputs, records, or system integrations are in scope?",
      "What decisions or actions may users take based on the AI output, and where is human review required?",
      "What regulatory, policy, contractual, or other special evaluation expectations apply to this use case?",
      "What uses, users, data, channels, or deployment settings should be excluded from this evaluation?",
      "What evidence, testing, monitoring, and decision-posture questions must be resolved before pilot or production use?"
    ],
    evidence_starters: [],
    framework_anchors: [],
    default_answers: {
      decision_authority: "to_be_determined",
      affected_party: "to_be_determined",
      data_category: "to_be_determined",
      external_data_transfer: "to_be_determined",
      vendor_retention_training_use: "to_be_determined",
      citation_grounding: "to_be_determined",
      access_control_inheritance: "to_be_determined",
      adversarial_exposure: "to_be_determined",
      monitoring_feasibility: "to_be_determined",
      vendor_change_visibility: "to_be_determined"
    },
    draft_tests: []
  },
  {
    template_id: "vendor_llm_internal_knowledge_search",
    name: "Vendor LLM for Internal Knowledge Search",
    description: "A vendor-hosted LLM or assistant used by internal staff to search, summarize, and retrieve approved internal documents.",
    default_tier: "tier_2_moderate",
    typical_users: ["operations", "risk", "compliance", "research", "customer_support_internal"],
    typical_prohibited_uses: [
      "final credit, employment, legal, compliance, or customer-impacting decisions",
      "uploading non-approved confidential or regulated data",
      "using uncited answers as authoritative records",
      "bypassing source-system access controls"
    ],
    core_evaluation_focus: [
      "scope discipline",
      "vendor evidence sufficiency",
      "data boundary and retention controls",
      "retrieval grounding and citation quality",
      "access-control inheritance",
      "prompt injection and retrieval contamination resistance",
      "monitoring and incident response"
    ],
    kickoff_questions: [
      "What document repositories or knowledge bases are in scope for this evaluation?",
      "Which user groups need access during pilot, and what source-system permissions should constrain retrieval?",
      "What answer types require citations or source links before users may rely on them?",
      "What vendor logs, prompts, retrieved snippets, and usage events are retained?",
      "Who owns corpus updates, access-control changes, and suspension decisions during pilot?"
    ],
    evidence_starters: [
      {
        title: "Use-Case Scope Statement",
        source: "user",
        status: "accepted",
        evaluation_area: "use_case_scope",
        summary: "Demo sample: pilot purpose, internal users, approved policy/procedure repositories, prohibited final-decision uses, and accountable owners are defined for the review package.",
        gap: ""
      },
      { title: "Vendor Security and Privacy Documentation", source: "vendor", evaluation_area: "vendor_third_party_evidence", gap: "Attach vendor documentation for security, privacy, retention, subprocessors, incident notification, and enterprise data handling." },
      { title: "Data Boundary and Retention Terms", source: "vendor", evaluation_area: "data_boundary", gap: "Confirm whether prompts, retrieved content, logs, and diagnostic data are retained or used for training." },
      {
        title: "Approved Corpus Inventory",
        source: "user",
        status: "partial",
        evaluation_area: "data_boundary",
        summary: "Demo sample: policy and procedure repositories are identified as the intended pilot corpus; owner and update cadence are drafted but not yet reconciled against exclusion rules.",
        gap: "Confirm corpus owner, update cadence, stale-document handling, and exclusion rules before pilot review."
      },
      { title: "Access-Control Inheritance Evidence", source: "independent_test", evaluation_area: "access_control", gap: "Test whether users can retrieve or infer only content allowed by source-system permissions." },
      { title: "Retrieval Grounding and Citation Evidence", source: "independent_test", evaluation_area: "retrieval_citation_quality", gap: "Benchmark citation accuracy, unsupported-answer rate, and source specificity." },
      { title: "Pilot Monitoring and Incident Plan", source: "user", evaluation_area: "monitoring_incident_response", gap: "Define usage metrics, incident triggers, review cadence, owner, and stop-use criteria." }
    ],
    framework_anchors: ["case_intake", "risk_drivers", "evidence_matrix", "required_tests", "monitoring_plan", "approval_recommendation"],
    default_answers: {
      decision_authority: "drafting_support",
      affected_party: "internal_user_only",
      data_category: "approved_internal",
      external_data_transfer: "approved_content",
      vendor_retention_training_use: "contractually_excluded",
      citation_grounding: "required_and_testable",
      access_control_inheritance: "designed_not_tested",
      adversarial_exposure: "internal_with_untrusted_content",
      monitoring_feasibility: "moderate",
      vendor_change_visibility: "release_notes_only"
    },
    draft_tests: ["scope_boundary_review", "vendor_evidence_review", "data_boundary_review", "retrieval_grounding_test", "access_control_test", "prompt_injection_test"],
    open_questions: [
      "Which repositories, document classes, and source systems should be included or excluded from retrieval testing?",
      "What citation, source-specificity, and unsupported-answer thresholds should be met before pilot use?",
      "How will access-control inheritance be tested across user roles, restricted documents, and edge cases?",
      "What vendor evidence is still needed for retention, logging, training-use exclusion, subprocessors, incident notice, and model-change visibility?",
      "Who owns corpus updates, retrieval failures, suspension decisions, and post-change regression testing?"
    ],
    monitoring_starters: {
      review_cadence: "Weekly during pilot; after material vendor, corpus, prompt, access-control, or monitoring changes",
      metrics: [
        { name: "missing or weak citation rate", definition: "Share of answers that require citations but omit, misstate, or cite sources that are not specific enough for reviewer reliance." },
        { name: "unsupported answer rate", definition: "Share of answers with material claims not supported by approved retrieved documents." },
        { name: "access-control exception rate", definition: "Count and severity of attempts or incidents where users retrieve, infer, or are shown content outside their source-system permissions." },
        { name: "prompt-injection or policy-bypass attempt rate", definition: "Frequency and severity of direct or indirect attempts to override instructions, expose restricted content, or bypass approved use boundaries." }
      ],
      incident_triggers: [
        { name: "restricted document exposure", definition: "Suspend or escalate if a user can retrieve or infer restricted content outside approved permissions." },
        { name: "material unsupported-answer pattern", definition: "Escalate when unsupported or stale answers recur above the pilot tolerance or affect important policy interpretation." },
        { name: "vendor retention or model-change ambiguity", definition: "Pause expansion if vendor retention, training-use, logging, subprocessors, or model-change visibility becomes unclear." },
        { name: "scope creep into final decision support", definition: "Require reapproval if users attempt legal, HR, compliance, credit, customer, employment, or other final decision use." }
      ]
    }
  },
  {
    template_id: "customer_service_response_drafting",
    name: "Customer-Service Response Drafting Assistant",
    description: "An AI assistant used by internal customer-service staff to draft responses that must be reviewed before being sent to customers.",
    default_tier: "tier_3_high",
    typical_users: ["customer_service_agents", "team_leads", "quality_assurance_reviewers"],
    typical_prohibited_uses: [
      "sending AI-drafted responses without human review",
      "making final eligibility, pricing, complaint, credit, or legal determinations",
      "using the assistant for customers or products outside approved scope",
      "including sensitive personal data unless approved controls are in place"
    ],
    core_evaluation_focus: [
      "customer-impact boundary",
      "human review and reliance controls",
      "response accuracy and tone",
      "policy grounding and escalation",
      "privacy and sensitive-data handling",
      "fairness and consistency",
      "monitoring, complaint, and incident response"
    ],
    kickoff_questions: [
      "Which customer journeys, products, channels, or complaint types are in scope for this evaluation?",
      "What customer data may be used by the assistant, and what data should be excluded or redacted?",
      "What must a human reviewer check before a drafted response can be sent?",
      "What policy sources, escalation paths, and refusal rules should constrain responses?",
      "What customer-harm, complaint, privacy, or fairness signals should trigger review or suspension?"
    ],
    evidence_starters: [
      { title: "Customer-Service Use-Case Scope Statement", source: "user", evaluation_area: "use_case_scope", gap: "Describe channels, customer journeys, products, languages, exclusions, and human-review requirements." },
      { title: "Vendor Security and Privacy Documentation", source: "vendor", evaluation_area: "vendor_third_party_evidence", gap: "Attach vendor documentation for data handling, retention, subprocessors, logging, and incident notification." },
      { title: "Customer Data Boundary Review", source: "user", evaluation_area: "data_boundary", gap: "Document allowed customer data, redaction requirements, sensitive-data exclusions, and retention controls." },
      { title: "Response Quality and Policy Grounding Evidence", source: "independent_test", evaluation_area: "output_reliability", gap: "Test accuracy, tone, policy grounding, hallucination controls, and escalation behavior across representative scenarios." },
      { title: "Human Review Workflow Evidence", source: "user", evaluation_area: "human_reliance", gap: "Show reviewer obligations, approval steps, auditability, and controls preventing unsupervised sending." },
      { title: "Privacy and Sensitive-Data Handling Evidence", source: "independent_test", evaluation_area: "data_boundary", gap: "Test whether the workflow prevents unnecessary sensitive-data exposure and inappropriate disclosure." },
      { title: "Fairness and Consistency Evidence", source: "independent_test", evaluation_area: "output_reliability", gap: "Compare materially similar customer scenarios for consistency and justified differences." },
      { title: "Complaint and Incident Monitoring Plan", source: "user", evaluation_area: "monitoring_incident_response", gap: "Define customer-harm signals, complaint review, escalation triggers, and suspension criteria." }
    ],
    framework_anchors: ["case_intake", "risk_drivers", "evidence_matrix", "required_tests", "monitoring_plan", "approval_recommendation"],
    default_answers: {
      decision_authority: "drafting_support",
      affected_party: "customer",
      data_category: "customer_personal",
      external_data_transfer: "metadata_only",
      vendor_retention_training_use: "contractually_excluded",
      citation_grounding: "required_not_tested",
      access_control_inheritance: "manual_control",
      adversarial_exposure: "external_user_input",
      monitoring_feasibility: "moderate",
      vendor_change_visibility: "release_notes_only"
    },
    draft_tests: ["scope_boundary_review", "vendor_evidence_review", "data_boundary_review", "response_quality_test", "human_reliance_review", "privacy_redaction_test", "fairness_consistency_review", "prompt_injection_test"],
    open_questions: [
      "Which customer journeys, products, languages, complaint types, and response channels should be included in the test set?",
      "What human-review checks must be completed before a draft response can be sent to a customer?",
      "What policy sources, escalation rules, tone standards, and prohibited response types should the response-quality test enforce?",
      "Which customer data elements must be excluded, redacted, minimized, or separately approved before testing?",
      "What customer-harm, complaint, privacy, fairness, or escalation signals should trigger suspension or reapproval?"
    ]
  },
  {
    template_id: "internal_credit_decisioning_tool",
    name: "Credit Decisioning Tool Developed Internally",
    description: "An internally developed model, rules engine, or AI-assisted workflow that supports credit eligibility, pricing, line assignment, limit management, or similar credit decisions.",
    default_tier: "tier_3_high",
    typical_users: ["credit_risk_analysts", "underwriters", "model_risk_management", "compliance_reviewers", "business_approvers"],
    typical_prohibited_uses: [
      "final adverse action or credit decision without required accountable review",
      "using variables, proxies, or data sources not approved for credit decisioning",
      "deployment outside the approved product, channel, population, or geography",
      "changing thresholds, policy rules, model versions, or data feeds without review",
      "using outputs without required explainability, adverse-action, fairness, and monitoring controls"
    ],
    core_evaluation_focus: [
      "credit decision authority and human accountability",
      "model performance and cutoff justification",
      "fair lending and protected-class proxy review",
      "data lineage, permissible purpose, and feature governance",
      "explainability and adverse-action reason support",
      "override, exception, and human reliance controls",
      "production monitoring, drift, and change management"
    ],
    kickoff_questions: [
      "Which credit product, decision point, channel, population, and geography are in scope for this evaluation?",
      "What role does the tool play in eligibility, pricing, line assignment, limit management, or adverse action?",
      "What data sources, features, labels, and historical decision records are used, and which are prohibited?",
      "What explainability, adverse-action, fair lending, model-risk, or regulatory expectations apply?",
      "Who may override, approve, suspend, or change the model, rules, thresholds, or data feeds?",
      "What performance, fairness, drift, override, complaint, and exception metrics should be monitored after approval?"
    ],
    evidence_starters: [
      { title: "Credit Use-Case and Decision Authority Statement", source: "user", evaluation_area: "use_case_scope", gap: "Define product, decision point, affected applicants or customers, human accountability, and prohibited uses." },
      { title: "Data Lineage and Feature Inventory", source: "user", evaluation_area: "data_boundary", gap: "Document source systems, feature definitions, permissible-purpose basis, exclusions, protected-class proxy review, and data quality controls." },
      { title: "Model Development and Validation Evidence", source: "user", evaluation_area: "output_reliability", gap: "Attach model methodology, training and validation samples, performance results, stability analysis, limitations, and independent validation findings." },
      { title: "Policy Rule and Threshold Justification", source: "user", evaluation_area: "human_reliance", gap: "Document cutoffs, score bands, policy overlays, override paths, and business justification for decision thresholds." },
      { title: "Fair Lending and Disparate Impact Review", source: "independent_test", evaluation_area: "output_reliability", gap: "Evaluate protected-class or proxy impacts, adverse selection patterns, reject inference limits, and mitigation decisions." },
      { title: "Explainability and Adverse-Action Reason Evidence", source: "independent_test", evaluation_area: "approval_residual_risk", gap: "Test whether reason codes or explanations are accurate, specific, stable, and suitable for notices, reviews, or appeals. Source/professional-boundary verification required before public reliance." },
      { title: "Human Review, Override, and Exception Workflow Evidence", source: "user", evaluation_area: "human_reliance", gap: "Show review obligations, override authority, exception logging, second-line review, and auditability." },
      { title: "Credit Monitoring and Change-Control Plan", source: "user", evaluation_area: "monitoring_incident_response", gap: "Define performance, fairness, drift, override, complaint, and reapproval triggers for pilot and production." }
    ],
    framework_anchors: ["case_intake", "risk_drivers", "evidence_matrix", "required_tests", "monitoring_plan", "approval_recommendation"],
    default_answers: {
      decision_authority: "recommendation_support",
      affected_party: "applicant",
      data_category: "regulated",
      external_data_transfer: "none",
      vendor_retention_training_use: "not_applicable",
      citation_grounding: "not_available",
      access_control_inheritance: "tested",
      adversarial_exposure: "low_internal",
      monitoring_feasibility: "strong",
      vendor_change_visibility: "not_applicable"
    },
    draft_tests: ["scope_boundary_review", "data_boundary_review", "model_performance_validation", "policy_cutoff_review", "fair_lending_review", "explainability_adverse_action_review", "human_reliance_review", "drift_monitoring_review"],
    open_questions: [
      "Which credit product, decision point, population, channel, geography, and policy version define the approved evaluation scope?",
      "What validation data, performance thresholds, cutoff justifications, and error-materiality standards should be used?",
      "How will fair lending, proxy, segment-level, override, and exception analyses be performed and governed?",
      "What explanation, reason-code, notice, appeal, or adverse-action requirements must the tool satisfy?",
      "What model, data, threshold, policy, drift, complaint, or disparity events should require escalation, suspension, or reapproval?"
    ],
    monitoring_starters: {
      review_cadence: "Monthly during pilot; at least quarterly after production approval; immediate review after material model, policy, data, or threshold changes.",
      metrics: [
        { name: "approval, decline, and counteroffer rate by segment", definition: "Track credit outcomes by relevant product, channel, geography, score band, and protected-class proxy or monitored segment where legally and methodologically appropriate." },
        { name: "model performance and calibration drift", definition: "Monitor whether score distribution, rank ordering, calibration, default rate, approval quality, or expected loss materially departs from validation assumptions." },
        { name: "override and exception rate", definition: "Track manual overrides, policy exceptions, and second-review outcomes by reason, user group, product, channel, and segment." },
        { name: "adverse-action reason stability", definition: "Track whether generated reason codes or explanations remain accurate, specific, and consistent with model drivers and policy basis." },
        { name: "complaint, appeal, and reconsideration rate", definition: "Track credit-related complaints, disputes, appeals, reconsideration requests, and substantiated error patterns tied to the tool." }
      ],
      incident_triggers: [
        { name: "material disparity or unexplained segment shift", definition: "Escalate when outcome, error, override, or approval patterns indicate potential fair lending, proxy, or segment-level concern." },
        { name: "performance or calibration outside approved tolerance", definition: "Escalate when model performance, stability, calibration, or score distribution breaches approved monitoring thresholds." },
        { name: "unapproved model, policy, threshold, or data change", definition: "Escalate when a material model version, feature, rule, cutoff, population, or data-feed change occurs without required review." },
        { name: "adverse-action reason failure", definition: "Escalate when reason codes or explanations are inaccurate, unstable, incomplete, or unsuitable for required notice or review obligations." }
      ]
    }
  }
];

const testLibrary = {
  scope_boundary_review: { test_id: "scope_boundary_review", title: "Scope Boundary Review", priority: "high", acceptance_signal: "Approved and prohibited uses are specific enough to support training, monitoring, and enforcement." },
  vendor_evidence_review: { test_id: "vendor_evidence_review", title: "Vendor Evidence Review", priority: "high", acceptance_signal: "Vendor documentation addresses security, privacy, retention, model changes, and incident notification for the proposed use." },
  data_boundary_review: { test_id: "data_boundary_review", title: "Data Boundary and Retention Review", priority: "blocking", acceptance_signal: "Data transferred to the system is approved for that deployment pattern and vendor retention or training use is acceptable." },
  retrieval_grounding_test: { test_id: "retrieval_grounding_test", title: "Retrieval Grounding and Citation Test", priority: "high", acceptance_signal: "Answers are traceable to approved sources and material unsupported claims are identified or suppressed." },
  access_control_test: { test_id: "access_control_test", title: "Access-Control Inheritance Test", priority: "blocking", acceptance_signal: "Users cannot retrieve or infer content beyond their source-system permissions." },
  prompt_injection_test: { test_id: "prompt_injection_test", title: "Prompt Injection and Retrieval Contamination Test", priority: "high", acceptance_signal: "The system resists instruction hierarchy attacks and malicious retrieved content within defined tolerance." },
  response_quality_test: { test_id: "response_quality_test", title: "Response Quality and Policy Grounding Test", priority: "high", acceptance_signal: "Draft responses are accurate, policy-grounded, appropriately caveated, and suitable for human review." },
  privacy_redaction_test: { test_id: "privacy_redaction_test", title: "Privacy and Sensitive-Data Handling Test", priority: "blocking", acceptance_signal: "The workflow prevents unnecessary sensitive-data exposure and handles personal data according to approved controls." },
  fairness_consistency_review: { test_id: "fairness_consistency_review", title: "Fairness and Consistency Review", priority: "high", acceptance_signal: "Comparable customer scenarios receive materially consistent treatment unless differences are justified by policy." },
  human_reliance_review: { test_id: "human_reliance_review", title: "Human Reliance Review", priority: "medium", acceptance_signal: "Workflow design and user guidance make clear that outputs are drafts and require accountable human review." },
  model_performance_validation: { test_id: "model_performance_validation", title: "Model Performance Validation", priority: "blocking", acceptance_signal: "Performance is validated on representative data with documented thresholds, limitations, and error-materiality review." },
  policy_cutoff_review: { test_id: "policy_cutoff_review", title: "Policy Rule and Cutoff Review", priority: "blocking", acceptance_signal: "Decision thresholds, score bands, policy overlays, and override rules are justified and approved for the scoped credit use." },
  fair_lending_review: { test_id: "fair_lending_review", title: "Fair Lending and Disparate Impact Review", priority: "blocking", acceptance_signal: "Protected-class, proxy, and segment-level outcome patterns are reviewed, mitigated, or accepted through documented governance." },
  explainability_adverse_action_review: { test_id: "explainability_adverse_action_review", title: "Explainability and Adverse-Action Reason Review", priority: "blocking", acceptance_signal: "Explanations or reason codes are accurate, specific, stable, and suitable for required review, notice, or appeal processes." },
  drift_monitoring_review: { test_id: "drift_monitoring_review", title: "Drift and Change-Control Review", priority: "high", acceptance_signal: "Monitoring detects performance, population, data, policy, and threshold changes that require escalation or reapproval." }
};

const definedMonitoringItem = (name, definition) => ({ name, definition });

const workbenchLibrary = [
  {
    library_id: "case_vendor_internal_search",
    type: "case_pattern",
    title: "Vendor LLM for Internal Knowledge Search",
    summary: "Starts a structured evaluation pattern for a vendor-hosted internal search or summarization assistant.",
    template_id: "vendor_llm_internal_knowledge_search",
    tags: ["flagship demo", "vendor", "retrieval", "knowledge search"]
  },
  {
    library_id: "case_customer_service_drafting",
    type: "case_pattern",
    title: "Customer-Service Response Drafting Assistant",
    summary: "Advanced scaffold under source and boundary review; not public-ready guidance for customer-impacting use.",
    template_id: "customer_service_response_drafting",
    locked: true,
    review_boundary: "Advanced scaffold; source and public-boundary review required before reliance.",
    tags: ["advanced scaffold", "source review required", "customer impact", "drafting", "human review"]
  },
  {
    library_id: "case_internal_credit_decisioning",
    type: "case_pattern",
    title: "Credit Decisioning Tool Developed Internally",
    summary: "Advanced high-risk scaffold under source and professional-boundary review; not compliance or credit guidance.",
    template_id: "internal_credit_decisioning_tool",
    locked: true,
    review_boundary: "Advanced scaffold; source and professional-boundary review required before reliance.",
    tags: ["advanced scaffold", "source review required", "credit", "fair lending", "model validation"]
  },
  {
    library_id: "module_explainability_review",
    type: "evaluation_module",
    title: "Explainability Review",
    summary: "Adds evidence and testing prompts for whether model outputs can be explained to reviewers or affected stakeholders.",
    evidence: [{ title: "Explainability and Reason-Code Evidence", source: "user", evaluation_area: "output_reliability", gap: "Document what explanation, reason-code, feature-attribution, or rationale is available and how reviewers should use it." }],
    tests: [{ test_id: "explainability_review", title: "Explainability Review", priority: "high", acceptance_signal: "Explanations are understandable, stable enough for the use case, and do not create misleading confidence." }],
    open_questions: ["What explanation is needed for evaluators, users, reviewers, affected parties, or auditors?"],
    tags: ["explainability", "reason codes"]
  },
  {
    library_id: "module_retrieval_quality",
    type: "evaluation_module",
    title: "Retrieval Groundedness and Citation Quality",
    summary: "Adds retrieval, citation, groundedness, and unsupported-answer checks.",
    evidence: [{ title: "Groundedness and Citation Benchmark", source: "independent_test", evaluation_area: "retrieval_citation_quality", gap: "Create benchmark prompts, expected sources, scoring rules, unsupported-answer tolerance, and citation-quality thresholds." }],
    tests: [testLibrary.retrieval_grounding_test],
    open_questions: ["What source-grounding standard must an answer meet before a user may rely on it?"],
    tags: ["retrieval", "groundedness", "citations"]
  },
  {
    library_id: "module_privacy_redaction",
    type: "evaluation_module",
    title: "Privacy and Redaction Test",
    summary: "Adds privacy, sensitive-data handling, and redaction checks.",
    evidence: [{ title: "Privacy, Data Minimization, and Redaction Evidence", source: "independent_test", evaluation_area: "data_boundary", gap: "Test whether the workflow excludes, masks, or safely handles personal, confidential, regulated, or otherwise sensitive data." }],
    tests: [testLibrary.privacy_redaction_test],
    open_questions: ["Which sensitive data elements are prohibited, minimized, masked, or separately approved?"],
    tags: ["privacy", "redaction", "data boundary"]
  },
  {
    library_id: "module_prompt_injection",
    type: "evaluation_module",
    title: "Prompt-Injection and Misuse Resistance",
    summary: "Adds adversarial misuse, prompt-injection, and policy-bypass testing.",
    evidence: [{ title: "Adversarial Misuse and Prompt-Injection Test Results", source: "independent_test", evaluation_area: "adversarial_resistance", gap: "Test malicious instructions, hidden instructions, tool misuse, unsafe requests, and policy-bypass attempts relevant to the use case." }],
    tests: [testLibrary.prompt_injection_test],
    incident_triggers: ["material prompt-injection, policy-bypass, or misuse event"],
    tags: ["adversarial", "misuse", "prompt injection"]
  },
  {
    library_id: "tool_confusion_matrix",
    type: "metric_tool",
    title: "Confusion Matrix",
    summary: "Adds a scoring structure for classification outcomes and error review.",
    evidence: [{ title: "Confusion Matrix and Error Review", source: "independent_test", evaluation_area: "output_reliability", gap: "Record true positives, false positives, true negatives, false negatives, error classes, and materiality of errors." }],
    tests: [{ test_id: "confusion_matrix_review", title: "Confusion Matrix Review", priority: "high", acceptance_signal: "Classification outcomes are scored against a labeled reference set and reviewed for material false positives and false negatives." }],
    open_questions: ["What labels, ground truth source, and error-materiality thresholds should be used for the confusion matrix?"],
    tags: ["classification", "error analysis"]
  },
  {
    library_id: "tool_precision_recall_f1",
    type: "metric_tool",
    title: "Precision, Recall, and F1 Score",
    summary: "Adds precision, recall, F1, and threshold-analysis prompts for retrieval or classification tasks.",
    evidence: [{ title: "Precision Recall F1 Scorecard", source: "independent_test", evaluation_area: "output_reliability", gap: "Define positive class, reference labels, threshold, precision, recall, F1 score, and the business cost of false positives and false negatives." }],
    tests: [{ test_id: "precision_recall_f1_review", title: "Precision, Recall, and F1 Review", priority: "high", acceptance_signal: "Precision, recall, and F1 are calculated on a representative labeled set with thresholds matched to the use case." }],
    open_questions: ["Which metric matters most for this use case: precision, recall, F1, or a threshold-specific tradeoff?"],
    tags: ["precision", "recall", "f1"]
  },
  {
    library_id: "tool_inter_rater_agreement",
    type: "metric_tool",
    title: "Inter-Rater Agreement",
    summary: "Adds reviewer consistency checks for human-labeled evaluation sets.",
    evidence: [{ title: "Inter-Rater Agreement Review", source: "independent_test", evaluation_area: "output_reliability", gap: "Compare reviewer labels, disagreement patterns, adjudication rules, and whether label definitions need refinement." }],
    tests: [{ test_id: "inter_rater_agreement_review", title: "Inter-Rater Agreement Review", priority: "medium", acceptance_signal: "Reviewer agreement is sufficient for the evaluation purpose or disagreements are adjudicated under documented rules." }],
    open_questions: ["What agreement threshold or adjudication process is needed before evaluation labels can be trusted?"],
    tags: ["labeling", "reviewer agreement"]
  },
  {
    library_id: "monitor_output_quality",
    type: "monitoring_metric",
    title: "Output Quality Metrics",
    summary: "Adds common production metrics for answer quality, defect tracking, and user feedback.",
    metrics: [
      definedMonitoringItem("accepted output rate", "Share of reviewed AI outputs accepted without material correction during the monitoring period."),
      definedMonitoringItem("user correction or rewrite rate", "Share of AI outputs that users materially edit, rewrite, or reject before use."),
      definedMonitoringItem("material error rate", "Rate of outputs with errors that could affect a business decision, customer communication, record, or control."),
      definedMonitoringItem("unsupported or ungrounded output rate", "Rate of outputs that lack required support from approved sources, evidence, or policy."),
      definedMonitoringItem("user escalation or complaint rate", "Rate of user escalations, complaints, or quality concerns related to AI output.")
    ],
    incident_triggers: [
      definedMonitoringItem("material error rate above approved tolerance", "Escalate when material errors exceed the case-specific tolerance or show a repeated pattern."),
      definedMonitoringItem("repeated unsupported or ungrounded outputs", "Escalate when unsupported outputs recur after correction, retraining, prompt changes, or corpus fixes."),
      definedMonitoringItem("pattern of user complaints or escalations", "Escalate when complaints or quality concerns cluster by product, user group, channel, or output type.")
    ],
    tags: ["quality", "errors", "feedback"]
  },
  {
    library_id: "monitor_retrieval_quality",
    type: "monitoring_metric",
    title: "Retrieval and Grounding Metrics",
    summary: "Adds retrieval-specific metrics for source quality, citation behavior, and corpus coverage.",
    metrics: [
      definedMonitoringItem("citation failure rate", "Share of responses that require citations but omit, misstate, or link to unsuitable sources."),
      definedMonitoringItem("source specificity score", "Assessment of whether citations point to sufficiently specific documents, passages, sections, or records."),
      definedMonitoringItem("unsupported answer rate", "Share of answers whose claims are not supported by approved retrieved material."),
      definedMonitoringItem("no-answer or refusal rate for answerable prompts", "Rate of answerable prompts where the system incorrectly refuses, fails, or says no source exists."),
      definedMonitoringItem("stale or missing corpus item rate", "Rate of failures caused by outdated, excluded, missing, or incorrectly indexed source material.")
    ],
    incident_triggers: [
      definedMonitoringItem("citation failure rate above approved threshold", "Escalate when citation failures exceed the approved tolerance for the evaluation case."),
      definedMonitoringItem("retrieval from excluded or stale source material", "Escalate when the system retrieves content that is excluded, obsolete, or outside approved scope."),
      definedMonitoringItem("unsupported answer rate above approved tolerance", "Escalate when unsupported answers exceed the threshold defined in the monitoring plan.")
    ],
    tags: ["retrieval", "citations", "grounding"]
  },
  {
    library_id: "monitor_operational_reliability",
    type: "monitoring_metric",
    title: "Operational Reliability Metrics",
    summary: "Adds service health and workflow reliability metrics for deployed AI systems.",
    metrics: [
      definedMonitoringItem("request volume and active user count", "Volume and active-use trend compared with expected pilot or production operating assumptions."),
      definedMonitoringItem("latency and timeout rate", "Share of requests exceeding latency thresholds or ending in timeout."),
      definedMonitoringItem("system error rate", "Rate of failed requests, unavailable services, tool errors, or unexpected system responses."),
      definedMonitoringItem("fallback or manual-workaround rate", "Rate at which users bypass the AI workflow or revert to manual processes due to system issues."),
      definedMonitoringItem("case completion or abandonment rate", "Share of started workflows completed successfully versus abandoned or rerouted.")
    ],
    incident_triggers: [
      definedMonitoringItem("sustained outage, timeout spike, or service degradation", "Escalate when reliability issues persist beyond the service threshold defined for the case."),
      definedMonitoringItem("manual-workaround rate above approved tolerance", "Escalate when users regularly bypass the workflow because the AI system is unusable or unreliable."),
      definedMonitoringItem("unexpected usage surge outside approved operating assumptions", "Escalate when usage materially exceeds the approved population, volume, or scope.")
    ],
    tags: ["operations", "latency", "reliability"]
  },
  {
    library_id: "monitor_safety_misuse",
    type: "monitoring_metric",
    title: "Safety and Misuse Metrics",
    summary: "Adds monitoring prompts for adversarial use, policy bypass, and unsafe outputs.",
    metrics: [
      definedMonitoringItem("policy violation rate", "Rate of outputs, inputs, or workflows that violate approved policy, scope, or guardrails."),
      definedMonitoringItem("prompt-injection or jailbreak attempt count", "Count and pattern of detected attempts to override instructions, tools, policies, or system constraints."),
      definedMonitoringItem("unsafe output rate", "Share of outputs that create safety, privacy, compliance, security, or customer-harm concerns."),
      definedMonitoringItem("blocked or refused request rate", "Rate and pattern of requests blocked or refused by the system or reviewer."),
      definedMonitoringItem("confirmed misuse or out-of-scope use count", "Count of verified uses outside approved purpose, user group, data boundary, or deployment setting.")
    ],
    incident_triggers: [
      definedMonitoringItem("verified policy-bypass or unsafe-output event", "Escalate any verified event that bypasses a required control or produces materially unsafe output."),
      definedMonitoringItem("material increase in jailbreak or prompt-injection attempts", "Escalate when adversarial attempts rise above expected baseline or target sensitive workflows."),
      definedMonitoringItem("confirmed use outside approved purpose", "Escalate when actual usage departs from approved purpose, data, users, or deployment conditions.")
    ],
    tags: ["safety", "misuse", "policy"]
  },
  {
    library_id: "monitor_human_review",
    type: "monitoring_metric",
    title: "Human Review and Override Metrics",
    summary: "Adds metrics for whether human reviewers are catching, correcting, or over-relying on AI outputs.",
    metrics: [
      definedMonitoringItem("human override rate", "Share of AI outputs materially changed, rejected, or overridden by accountable reviewers."),
      definedMonitoringItem("reviewer acceptance rate", "Share of AI outputs accepted as-is by reviewers, tracked for possible over-reliance."),
      definedMonitoringItem("reviewer disagreement rate", "Rate of disagreement between reviewers, quality assurance, adjudicators, or downstream reviewers."),
      definedMonitoringItem("missed review or skipped approval count", "Count of cases where required human review or approval was bypassed or not documented."),
      definedMonitoringItem("time-to-review and escalation turnaround", "Time required for review, escalation, remediation, and closure of AI-related issues.")
    ],
    incident_triggers: [
      definedMonitoringItem("human review bypass or skipped required approval", "Escalate when a required reviewer step is missed, bypassed, or undocumented."),
      definedMonitoringItem("override or disagreement rate above approved tolerance", "Escalate when reviewer corrections or disagreements indicate unstable output quality."),
      definedMonitoringItem("review backlog threatens timely decisioning", "Escalate when review delays create operational, customer, compliance, or safety risk.")
    ],
    tags: ["human review", "override", "workflow"]
  },
  {
    library_id: "monitor_drift_change",
    type: "monitoring_metric",
    title: "Drift and Change-Control Metrics",
    summary: "Adds monitoring for data drift, model changes, configuration changes, and reapproval triggers.",
    metrics: [
      definedMonitoringItem("input distribution drift", "Material change in input population, data fields, prompts, channels, or case mix compared with approved assumptions."),
      definedMonitoringItem("output distribution drift", "Material change in output categories, scores, recommendations, refusals, errors, or escalation patterns."),
      definedMonitoringItem("model, prompt, policy, or configuration change count", "Count and description of changes to model, prompt, policy, workflow, corpus, thresholds, or configuration."),
      definedMonitoringItem("vendor release or model-change notices", "Vendor notices or release notes that may affect behavior, retention, security, quality, or evaluation assumptions."),
      definedMonitoringItem("post-change regression test pass rate", "Share of required regression checks passed after model, prompt, corpus, workflow, or policy changes.")
    ],
    incident_triggers: [
      definedMonitoringItem("material data or output drift", "Escalate when drift changes risk assumptions, performance, affected population, or control effectiveness."),
      definedMonitoringItem("model, prompt, corpus, or policy change without review", "Escalate when material changes occur without documented review or reapproval decision."),
      definedMonitoringItem("failed post-change regression test", "Escalate when required regression checks fail after a change.")
    ],
    tags: ["drift", "change control", "reapproval"]
  },
  {
    library_id: "monitor_credit_decisioning",
    type: "monitoring_metric",
    title: "Credit Decisioning Monitoring Metrics",
    summary: "Adds monitoring for credit outcomes, fair lending signals, model performance, overrides, adverse-action reasons, and reapproval triggers.",
    metrics: [
      definedMonitoringItem("approval, decline, and counteroffer rate by segment", "Track credit outcomes by relevant product, channel, geography, score band, and protected-class proxy or monitored segment where legally and methodologically appropriate."),
      definedMonitoringItem("model performance and calibration drift", "Monitor whether score distribution, rank ordering, calibration, default rate, approval quality, or expected loss materially departs from validation assumptions."),
      definedMonitoringItem("override and exception rate", "Track manual overrides, policy exceptions, and second-review outcomes by reason, user group, product, channel, and segment."),
      definedMonitoringItem("adverse-action reason stability", "Track whether generated reason codes or explanations remain accurate, specific, and consistent with model drivers and policy basis."),
      definedMonitoringItem("complaint, appeal, and reconsideration rate", "Track credit-related complaints, disputes, appeals, reconsideration requests, and substantiated error patterns tied to the tool.")
    ],
    incident_triggers: [
      definedMonitoringItem("material disparity or unexplained segment shift", "Escalate when outcome, error, override, or approval patterns indicate potential fair lending, proxy, or segment-level concern."),
      definedMonitoringItem("performance or calibration outside approved tolerance", "Escalate when model performance, stability, calibration, or score distribution breaches approved monitoring thresholds."),
      definedMonitoringItem("unapproved model, policy, threshold, or data change", "Escalate when a material model version, feature, rule, cutoff, population, or data-feed change occurs without required review."),
      definedMonitoringItem("adverse-action reason failure", "Escalate when reason codes or explanations are inaccurate, unstable, incomplete, or unsuitable for required notice or review obligations.")
    ],
    tags: ["credit", "fair lending", "drift", "adverse action"]
  }
];

const defaultCase = {
  case_id: "case_001",
  case_name: "",
  version: "0.1",
  status: "draft",
  project_setup: {
    evaluation_owner: "",
    business_unit: "",
    deployment_stage: "pilot",
    target_decision_date: ""
  },
  use_case: {
    template_id: "other_blank_evaluation",
    framework_anchors: [],
    business_purpose: "",
    kickoff_questions: [
      { question: "What is the AI-enabled model, system, process, or workflow being evaluated for this evaluation?", response: "" },
      { question: "What business purpose, decision, task, or operational activity should the evaluation cover?", response: "" },
      { question: "Who are the intended users, affected parties, and accountable owners?", response: "" },
      { question: "What data, content, prompts, outputs, records, or system integrations are in scope?", response: "" },
      { question: "What decisions or actions may users take based on the AI output, and where is human review required?", response: "" },
      { question: "What regulatory, policy, contractual, or other special evaluation expectations apply to this use case?", response: "" },
      { question: "What uses, users, data, channels, or deployment settings should be excluded from this evaluation?", response: "" },
      { question: "What evidence, testing, monitoring, and accountable-review questions must be resolved before pilot or production use?", response: "" }
    ],
    intended_users: [],
    intended_user_options: [...baselineIntendedUserOptions],
    prohibited_uses: [],
    prohibited_use_options: [...baselineProhibitedUseOptions]
  },
  system_profile: {
    model_source: "internal",
    deployment_pattern: "downloaded_package",
    vendor_name: "",
    model_or_system_type: "model",
    model_or_service_name: "",
    retrieval_augmented: false,
    human_review_required: false
  },
  intake: {
    answers: {
      decision_authority: "to_be_determined",
      affected_party: "to_be_determined",
      data_category: "to_be_determined",
      external_data_transfer: "to_be_determined",
      vendor_retention_training_use: "to_be_determined",
      citation_grounding: "to_be_determined",
      access_control_inheritance: "to_be_determined",
      adversarial_exposure: "to_be_determined",
      monitoring_feasibility: "to_be_determined",
      vendor_change_visibility: "to_be_determined"
    }
  },
  risk_assessment: {
    initial_tier: "tier_2_moderate",
    recommended_tier: "tier_2_moderate",
    tier_rationale: "TBD",
    risk_flags: ["blank_evaluation", "manual_scoping_required"]
  },
  evidence: [],
  evaluation_plan: {
    required_tests: [],
    open_questions: ["TBD"]
  },
  monitoring_plan: {
    metrics: ["TBD"],
    review_cadence: "TBD",
    incident_triggers: ["TBD"]
  },
  approval_recommendation: {
    recommendation: "to_be_determined",
    conditions: ["TBD"],
    residual_risk_statement: "TBD"
  }
};

let state = structuredClone(defaultCase);
let activeArtifact = "matrix";
let selectedTemplateId = "other_blank_evaluation";
let selectedStartingPoint = "blank_new_case";
let workspaceStarted = false;

const el = (id) => document.getElementById(id);
const slug = (text) => String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "artifact";
const titleCase = (value) => {
  if (value === "to_be_determined") return "TBD";
  if (value === "not_applicable") return "N/A";
  return String(value).replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
};
const displayLabel = (value) => recommendationLabels[value] || caseStatusLabels[value] || titleCase(value);
const postureLabel = (value = state.approval_recommendation.recommendation) => recommendationLabels[value] || titleCase(value);
const exportStamp = () => new Date().toISOString().slice(0, 19).replace(/[-:T]/g, "");

function optionList(values, selected) {
  return values.map((value) => `<option value="${value}" ${value === selected ? "selected" : ""}>${displayLabel(value)}</option>`).join("");
}

function startingPointOptionList() {
  return startingPointOptions.map((item) => `<option value="${item.value}">${item.label}</option>`).join("");
}

function bindStaticControls() {
  el("caseStatus").innerHTML = optionList(caseStatuses, state.status);
  el("deploymentStage").innerHTML = optionList(deploymentStages, state.project_setup.deployment_stage);
  el("recommendation").innerHTML = optionList(recommendations, state.approval_recommendation.recommendation);
  const startingPointOptionsHtml = startingPointOptionList();
  el("templateSelector").innerHTML = startingPointOptionsHtml;
  el("startTemplateSelector").innerHTML = startingPointOptionsHtml;
  syncStartingPointControls();

  document.querySelectorAll(".setup-link").forEach((link) => {
    link.addEventListener("click", showSetup);
  });
  document.querySelectorAll(".header-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".header-nav a").forEach((item) => item.classList.toggle("active", item === link));
    });
  });
  el("startFlagshipDemo").addEventListener("click", () => {
    startCaseFromTemplate("vendor_llm_internal_knowledge_search");
    scrollToPageTop();
  });
  el("startBlankCase").addEventListener("click", () => {
    resetSetupFieldsForOther();
    startCaseFromTemplate("other_blank_evaluation");
    scrollToPageTop();
  });
  el("startLoadedCase").addEventListener("click", () => el("caseFileInput").click());
  el("startSelectedCase").addEventListener("click", () => {
    startFromStartingPoint(el("startTemplateSelector").value);
    scrollToPageTop();
  });
  document.querySelectorAll("[data-start-template]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.startTemplate === "other_blank_evaluation") resetSetupFieldsForOther();
      startCaseFromTemplate(button.dataset.startTemplate);
      scrollToPageTop();
    });
  });
  el("startTemplateSelector").addEventListener("change", (event) => {
    selectedStartingPoint = event.target.value;
    if (selectedStartingPoint === "blank_new_case") resetSetupFieldsForOther();
    syncStartingPointControls();
  });
  el("templateSelector").addEventListener("change", (event) => {
    selectedStartingPoint = event.target.value;
    syncStartingPointControls();
    if (selectedStartingPoint === "blank_new_case") {
      resetSetupFieldsForOther();
      startCaseFromTemplate("other_blank_evaluation", "howto");
      return;
    }
    setTab("library");
  });
  el("caseFileInput").addEventListener("change", loadCaseFile);
  el("caseName").addEventListener("input", (event) => {
    state.case_name = event.target.value;
    updateAll(false);
  });
  el("caseStatus").addEventListener("change", (event) => {
    state.status = event.target.value;
    updateAll(false);
  });
  el("evaluationOwner").addEventListener("input", (event) => {
    state.project_setup.evaluation_owner = event.target.value;
    updateAll(false);
  });
  el("businessUnit").addEventListener("input", (event) => {
    state.project_setup.business_unit = event.target.value;
    updateAll(false);
  });
  el("deploymentStage").addEventListener("change", (event) => {
    state.project_setup.deployment_stage = event.target.value;
    updateAll(false);
  });
  el("targetDecisionDate").addEventListener("input", (event) => {
    state.project_setup.target_decision_date = event.target.value;
    updateAll(false);
  });
  el("businessPurpose").addEventListener("input", (event) => {
    state.use_case.business_purpose = event.target.value;
    updateAll(false);
  });
  el("vendorName").addEventListener("input", (event) => {
    state.system_profile.vendor_name = event.target.value;
    applyVendorDependency();
    updateAll(false);
  });
  el("modelSystemType").addEventListener("change", (event) => {
    state.system_profile.model_or_system_type = event.target.value;
    updateAll(false);
  });
  el("serviceName").addEventListener("input", (event) => {
    state.system_profile.model_or_service_name = event.target.value;
    updateAll(false);
  });
  el("recommendation").addEventListener("change", (event) => {
    state.approval_recommendation.recommendation = event.target.value;
    updateAll(false);
  });
  el("residualRisk").addEventListener("input", (event) => {
    state.approval_recommendation.residual_risk_statement = event.target.value;
    updateAll(false);
  });
  el("downloadCase").addEventListener("click", () => downloadText(caseFilename("case", "json"), JSON.stringify(buildCaseExport(), null, 2), "application/json"));
  el("downloadBundle").addEventListener("click", () => downloadText(caseFilename("artifact-bundle", "md"), buildBundle(), "text/markdown"));
  el("addEvidence").addEventListener("click", addEvidence);
  el("addQuestion").addEventListener("click", () => {
    state.evaluation_plan.open_questions.push("New open question");
    updateAll(false);
  });
  el("addCondition").addEventListener("click", () => {
    state.approval_recommendation.conditions.push("New review condition");
    updateAll(false);
  });
  el("copyArtifact").addEventListener("click", copyArtifact);
  el("downloadArtifact").addEventListener("click", () => downloadText(caseFilename(activeArtifact, "md"), artifactText(activeArtifact), "text/markdown"));

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => setTab(button.dataset.tab));
  });
  document.querySelectorAll(".artifact-select").forEach((button) => {
    button.addEventListener("click", () => {
      activeArtifact = button.dataset.artifact;
      document.querySelectorAll(".artifact-select").forEach((item) => item.classList.toggle("active", item === button));
      renderArtifact();
    });
  });
  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => addListItem(button.dataset.add));
  });
}

function startFromStartingPoint(startingPoint) {
  selectedStartingPoint = startingPoint || "blank_new_case";
  syncStartingPointControls();
  if (selectedStartingPoint === "custom_case_library") {
    startCaseFromTemplate("other_blank_evaluation", "library");
    return;
  }
  resetSetupFieldsForOther();
  startCaseFromTemplate("other_blank_evaluation", "howto");
}

function startCaseFromTemplate(templateId, targetTab = "howto") {
  selectedTemplateId = templateId || "other_blank_evaluation";
  selectedStartingPoint = selectedTemplateId === "other_blank_evaluation" ? "blank_new_case" : "custom_case_library";
  state = createCaseFromTemplate(selectedTemplateId);
  applySetupDraft();
  workspaceStarted = true;
  showWorkspace();
  setTab(targetTab);
  updateAll(true);
}

function resetSetupFieldsForOther() {
  el("startCaseName").value = "";
  el("startOwner").value = "";
  el("startBusinessUnit").value = "";
}

function syncStartingPointControls() {
  el("templateSelector").value = selectedStartingPoint;
  el("startTemplateSelector").value = selectedStartingPoint;
}

function applySetupDraft() {
  const setupCaseName = el("startCaseName").value.trim();
  const setupOwner = el("startOwner").value.trim();
  const setupBusinessUnit = el("startBusinessUnit").value.trim();
  if (setupCaseName) state.case_name = setupCaseName;
  if (setupOwner) state.project_setup.evaluation_owner = setupOwner;
  if (setupBusinessUnit) state.project_setup.business_unit = setupBusinessUnit;
}

function showWorkspace() {
  el("caseSetup").classList.add("is-hidden");
  el("workspaceView").classList.remove("is-hidden");
  el("downloadCase").disabled = false;
  el("downloadBundle").disabled = false;
}

function showSetup() {
  el("caseSetup").classList.remove("is-hidden");
  el("workspaceView").classList.add("is-hidden");
  el("downloadCase").disabled = !workspaceStarted;
  el("downloadBundle").disabled = !workspaceStarted;
}

function scrollToPageTop() {
  const previousHtmlScroll = document.documentElement.style.scrollBehavior;
  const previousBodyScroll = document.body.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  document.body.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.setTimeout(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.documentElement.style.scrollBehavior = previousHtmlScroll;
    document.body.style.scrollBehavior = previousBodyScroll;
  }, 0);
}

function setTab(tabId) {
  document.querySelectorAll(".tab").forEach((button) => button.classList.toggle("active", button.dataset.tab === tabId));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === tabId));
}

function loadCaseFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      state = normalizeCase(parsed);
      workspaceStarted = true;
      showWorkspace();
      setTab("howto");
      updateAll(true);
    } catch (error) {
      alert(`This file could not be loaded as a Workbench case.\n\n${error.message}`);
    } finally {
      event.target.value = "";
    }
  };
  reader.onerror = () => {
    alert("The selected case file could not be read.");
    event.target.value = "";
  };
  reader.readAsText(file);
}

function normalizeCase(candidate) {
  if (!candidate || typeof candidate !== "object") throw new Error("The file does not contain a JSON object.");
  const required = ["case_id", "case_name", "version", "use_case", "system_profile", "intake", "evidence", "evaluation_plan", "monitoring_plan", "approval_recommendation"];
  const missing = required.filter((key) => !(key in candidate));
  if (missing.length) throw new Error(`Missing required field(s): ${missing.join(", ")}`);

  const normalized = structuredClone(defaultCase);
  deepMerge(normalized, candidate);
  normalized.project_setup = normalized.project_setup && typeof normalized.project_setup === "object" ? normalized.project_setup : structuredClone(defaultCase.project_setup);
  normalized.project_setup.evaluation_owner = normalized.project_setup.evaluation_owner || "";
  normalized.project_setup.business_unit = normalized.project_setup.business_unit || "";
  normalized.project_setup.deployment_stage = deploymentStages.includes(normalized.project_setup.deployment_stage) ? normalized.project_setup.deployment_stage : "pilot";
  normalized.project_setup.target_decision_date = normalized.project_setup.target_decision_date || "";
  normalized.system_profile.model_or_system_type = normalized.system_profile.model_or_system_type || "model";
  normalized.status = caseStatuses.includes(normalized.status) ? normalized.status : "draft";
  normalized.approval_recommendation.recommendation = recommendations.includes(normalized.approval_recommendation.recommendation) ? normalized.approval_recommendation.recommendation : "to_be_determined";
  normalized.evidence = Array.isArray(normalized.evidence) ? normalized.evidence : [];
  normalized.use_case.intended_users = Array.isArray(normalized.use_case.intended_users) ? normalized.use_case.intended_users : [];
  normalized.use_case.prohibited_uses = Array.isArray(normalized.use_case.prohibited_uses) ? normalized.use_case.prohibited_uses : [];
  normalized.use_case.intended_user_options = Array.isArray(normalized.use_case.intended_user_options) ? normalized.use_case.intended_user_options : [...normalized.use_case.intended_users];
  normalized.use_case.prohibited_use_options = Array.isArray(normalized.use_case.prohibited_use_options) ? normalized.use_case.prohibited_use_options : [...normalized.use_case.prohibited_uses];
  normalized.use_case.kickoff_questions = normalizeKickoffQuestions(normalized.use_case.kickoff_questions, normalized.use_case.template_id);
  normalized.evaluation_plan.required_tests = normalizeTests(normalized.evaluation_plan.required_tests);
  normalized.evaluation_plan.open_questions = Array.isArray(normalized.evaluation_plan.open_questions) ? normalized.evaluation_plan.open_questions : [];
  normalized.monitoring_plan.metrics = normalizeDefinedItems(normalized.monitoring_plan.metrics);
  normalized.monitoring_plan.incident_triggers = normalizeDefinedItems(normalized.monitoring_plan.incident_triggers);
  normalized.approval_recommendation.conditions = Array.isArray(normalized.approval_recommendation.conditions) ? normalized.approval_recommendation.conditions : [];
  selectedTemplateId = normalized.use_case.template_id || selectedTemplateId;
  selectedStartingPoint = selectedTemplateId === "other_blank_evaluation" ? "blank_new_case" : "custom_case_library";
  const template = useCaseTemplates.find((item) => item.template_id === selectedTemplateId);
  normalized.use_case.framework_anchors = Array.isArray(normalized.use_case.framework_anchors) ? normalized.use_case.framework_anchors : [...(template?.framework_anchors || [])];
  return normalized;
}

function deepMerge(target, source) {
  Object.entries(source).forEach(([key, value]) => {
    if (value && typeof value === "object" && !Array.isArray(value) && target[key] && typeof target[key] === "object" && !Array.isArray(target[key])) {
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  });
  return target;
}

function updateAll(resetFields) {
  recalcRisk();
  if (resetFields) renderFormValues();
  renderTemplateProfile();
  renderLibrary();
  renderKickoffQuestions();
  renderRiskDrivers();
  renderLists();
  renderEvidence();
  renderTests();
  renderMonitoring();
  renderApproval();
  renderReadiness();
  renderSummary();
  renderArtifact();
}

function createCaseFromTemplate(templateId) {
  const template = useCaseTemplates.find((item) => item.template_id === templateId) || useCaseTemplates[0];
  const now = new Date().toISOString();
  const isBlank = template.template_id === "other_blank_evaluation";
  const draft = structuredClone(defaultCase);
  draft.case_id = `case_${exportStamp()}`;
  draft.case_name = isBlank ? "" : `New Evaluation - ${template.name}`;
  draft.version = "0.1";
  draft.status = "draft";
  draft.project_setup = {
    evaluation_owner: "",
    business_unit: "",
    deployment_stage: "pilot",
    target_decision_date: ""
  };
  draft.use_case.template_id = template.template_id;
  draft.use_case.framework_anchors = [...(template.framework_anchors || [])];
  draft.use_case.business_purpose = "";
  draft.use_case.kickoff_questions = createKickoffQuestions(template);
  draft.use_case.intended_users = isBlank ? [] : [...template.typical_users];
  draft.use_case.intended_user_options = [...template.typical_users];
  draft.use_case.prohibited_uses = isBlank ? [] : [...template.typical_prohibited_uses];
  draft.use_case.prohibited_use_options = [...template.typical_prohibited_uses];
  draft.intake.answers = { ...template.default_answers };
  draft.system_profile.vendor_name = "";
  draft.system_profile.model_or_system_type = "model";
  draft.system_profile.model_or_service_name = "";
  draft.system_profile.retrieval_augmented = !isBlank && template.template_id === "vendor_llm_internal_knowledge_search";
  draft.system_profile.human_review_required = !isBlank;
  draft.risk_assessment.initial_tier = template.default_tier;
  draft.risk_assessment.recommended_tier = template.default_tier;
  draft.risk_assessment.tier_rationale = isBlank
    ? "Blank draft created without a predefined scenario. Complete all intake, risk-driver, evidence, testing, monitoring, and decision-posture fields before relying on this evaluation package."
    : "Draft case created from template. Complete intake, evidence, tests, monitoring, and accountable review before relying on this evaluation package.";
  draft.risk_assessment.risk_flags = isBlank
    ? ["blank_evaluation", "manual_scoping_required"]
    : template.template_id === "vendor_llm_internal_knowledge_search"
    ? ["template_draft", "vendor_hosted_llm", "retrieval_augmented_generation"]
    : template.template_id === "internal_credit_decisioning_tool"
    ? ["template_draft", "credit_decisioning", "regulated_decision_support", "fair_lending_review_required"]
    : ["template_draft", "customer_impact", "human_review_required"];
  draft.evidence = createEvidenceStarters(template);
  draft.evaluation_plan.required_tests = normalizeTests(template.draft_tests.map((testId) => structuredClone(testLibrary[testId])).filter(Boolean));
  draft.evaluation_plan.open_questions = isBlank ? ["TBD"] : [...(template.open_questions || [
    "What system documentation is available for this deployment pattern?",
    "What data, content, or scenarios are approved for this use case?",
    "What evidence is needed before accountable pilot review?"
  ])];
  draft.monitoring_plan.metrics = isBlank ? ["TBD"] : normalizeDefinedItems(template.monitoring_starters?.metrics || []);
  draft.monitoring_plan.review_cadence = template.monitoring_starters?.review_cadence || "TBD";
  draft.monitoring_plan.incident_triggers = isBlank ? ["TBD"] : normalizeDefinedItems(template.monitoring_starters?.incident_triggers || []);
  draft.approval_recommendation.recommendation = isBlank ? "to_be_determined" : "defer";
  draft.approval_recommendation.conditions = isBlank ? ["TBD"] : [];
  draft.approval_recommendation.residual_risk_statement = isBlank ? "TBD" : "";
  if (template.template_id === "vendor_llm_internal_knowledge_search") {
    draft.project_setup.evaluation_owner = "Sample reviewer";
    draft.project_setup.business_unit = "Internal knowledge operations";
    draft.use_case.business_purpose = "Evaluate a controlled internal pilot of a vendor-hosted LLM assistant that helps employees search, summarize, and retrieve approved internal policy and procedure documents with citations.";
    draft.system_profile.model_source = "vendor";
    draft.system_profile.deployment_pattern = "vendor_hosted_assistant";
    draft.system_profile.vendor_name = "Vendor platform TBD";
    draft.system_profile.model_or_system_type = "system";
    draft.system_profile.model_or_service_name = "Internal knowledge-search assistant";
    draft.approval_recommendation.conditions = [
      "Pilot remains internal and limited to approved, versioned policy and procedure repositories.",
      "Access-control inheritance, retrieval grounding, data-retention terms, and prompt-injection testing are completed or explicitly dispositioned before pilot use.",
      "Expansion to customer-facing, regulated, individual-level, legal, HR, credit, or final-decision use requires reapproval."
    ];
    draft.approval_recommendation.residual_risk_statement = "Residual risks include unsupported or stale answers, employee overreliance, vendor or retrieval changes, prompt-injection attempts, access-control defects, and incomplete monitoring. These risks are not accepted for production use until unresolved evidence gaps and blocking tests are completed or explicitly dispositioned by accountable reviewers.";
  }
  draft.workbench_created_at = now;
  return draft;
}

function isResolvedText(value) {
  const text = String(value || "").trim().toLowerCase();
  return Boolean(text && text !== "tbd" && text !== "to be determined");
}

function normalizeDefinedItem(item) {
  if (item && typeof item === "object" && !Array.isArray(item)) {
    return {
      name: String(item.name || item.title || ""),
      definition: String(item.definition || "")
    };
  }
  return {
    name: String(item || ""),
    definition: ""
  };
}

function normalizeDefinedItems(items) {
  return Array.isArray(items) ? items.map(normalizeDefinedItem) : [];
}

function definedName(item) {
  return normalizeDefinedItem(item).name;
}

function definedDefinition(item) {
  return normalizeDefinedItem(item).definition;
}

function hasDefinedItem(item) {
  const normalized = normalizeDefinedItem(item);
  return isResolvedText(normalized.name) && isResolvedText(normalized.definition);
}

function applyVendorDependency() {
  if (state.system_profile.vendor_name.trim().toLowerCase() !== "n/a") return;
  state.intake.answers.vendor_retention_training_use = "not_applicable";
  state.intake.answers.vendor_change_visibility = "not_applicable";
}

function createKickoffQuestions(template) {
  return (template.kickoff_questions || []).map((question) => ({ question, response: "" }));
}

function createEvidenceStarters(template) {
  return (template.evidence_starters || []).map((item, index) => ({
    evidence_id: `ev_${String(index + 1).padStart(3, "0")}`,
    title: item.title,
    source: item.source,
    status: statuses.includes(item.status) ? item.status : "pending",
    evaluation_area: item.evaluation_area,
    summary: item.summary || "",
    gap: item.gap
  }));
}

function normalizeTest(test) {
  const item = test && typeof test === "object" ? structuredClone(test) : {};
  item.test_id = String(item.test_id || `test_${exportStamp()}`);
  item.title = String(item.title || "Untitled test");
  item.priority = String(item.priority || "high");
  item.acceptance_signal = String(item.acceptance_signal || "");
  item.definition = String(item.definition || "");
  item.disposition = testDispositionOptions.includes(item.disposition) ? item.disposition : "not_started";
  item.evidence_reference = String(item.evidence_reference || "");
  item.owner_condition = String(item.owner_condition || "");
  return item;
}

function normalizeTests(tests) {
  return Array.isArray(tests) ? tests.map(normalizeTest) : [];
}

function normalizeKickoffQuestions(candidate, templateId) {
  const template = useCaseTemplates.find((item) => item.template_id === templateId) || useCaseTemplates[0];
  if (!Array.isArray(candidate) || !candidate.length) return createKickoffQuestions(template);
  return candidate.map((item) => {
    if (typeof item === "string") return { question: item, response: "" };
    return {
      question: String(item.question || ""),
      response: String(item.response || "")
    };
  }).filter((item) => item.question);
}

function renderFormValues() {
  el("caseName").value = state.case_name;
  el("caseStatus").value = state.status;
  el("evaluationOwner").value = state.project_setup.evaluation_owner;
  el("businessUnit").value = state.project_setup.business_unit;
  el("deploymentStage").value = state.project_setup.deployment_stage;
  el("targetDecisionDate").value = state.project_setup.target_decision_date;
  el("businessPurpose").value = state.use_case.business_purpose;
  el("vendorName").value = state.system_profile.vendor_name;
  el("modelSystemType").value = state.system_profile.model_or_system_type || "model";
  el("serviceName").value = state.system_profile.model_or_service_name;
  el("recommendation").value = state.approval_recommendation.recommendation;
  el("residualRisk").value = state.approval_recommendation.residual_risk_statement;
}

function renderSummary() {
  el("summaryCaseName").textContent = state.case_name || "Untitled evaluation";
  el("summaryStatus").textContent = displayLabel(state.status);
  el("summaryTier").textContent = tierNames[state.risk_assessment.recommended_tier] || titleCase(state.risk_assessment.recommended_tier);
  el("summaryRecommendation").textContent = postureLabel();
  el("summaryRecommendation").style.color = state.approval_recommendation.recommendation === "reject" ? "var(--danger)" : "inherit";
  el("summaryTier").style.color = state.risk_assessment.recommended_tier === "tier_3_high" ? "var(--warning)" : "inherit";
  el("riskFlags").innerHTML = state.risk_assessment.risk_flags.map((flag) => `<li>${titleCase(flag)}</li>`).join("");
  renderEvidenceBars();
}

function renderTemplateProfile() {
  const template = useCaseTemplates.find((item) => item.template_id === selectedTemplateId) || useCaseTemplates[0];
  const isBlank = template.template_id === "other_blank_evaluation";
  const displayName = isBlank ? "Blank New Case" : template.name;
  syncStartingPointControls();
  el("templateName").textContent = displayName;
  el("templateProfileName").textContent = displayName;
  el("templateDescription").textContent = isBlank
    ? "A baseline blank evaluation. Define the use case, scope, risk drivers, evidence, tests, monitoring, and decision posture without inherited scenario assumptions."
    : template.description;
  el("templateDefaultTier").textContent = tierNames[template.default_tier] || titleCase(template.default_tier);
  const focusItems = isBlank ? ["User-defined evaluation scope"] : template.core_evaluation_focus;
  el("templateFocus").innerHTML = focusItems.map((item) => `<li>${escapeText(item)}</li>`).join("");
  if (el("frameworkAnchors")) {
    el("frameworkAnchors").innerHTML = activeFrameworkAnchors().map((anchor) => `
      <li>
        <strong>${escapeText(anchor.title)}</strong>
        <span>${escapeText(anchor.role)}</span>
      </li>
    `).join("");
  }
}

function renderLibrary() {
  renderLibraryGroup("libraryCasePatterns", "case_pattern");
  renderLibraryGroup("libraryModules", "evaluation_module");
  renderLibraryGroup("libraryMetricTools", "metric_tool");
  renderLibraryGroup("libraryMonitoringMetrics", "monitoring_metric");
}

function renderLibraryGroup(containerId, type) {
  const container = el(containerId);
  container.innerHTML = workbenchLibrary.filter((item) => item.type === type).map((item) => {
    const locked = Boolean(item.locked);
    const actionLabel = locked ? "Under Review" : item.type === "case_pattern" ? "Start Case" : "Add";
    const boundary = item.review_boundary ? `<p class="library-boundary">${escapeText(item.review_boundary)}</p>` : "";
    const cardClass = [item.review_boundary ? "library-card has-boundary" : "library-card", locked ? "is-locked" : ""].filter(Boolean).join(" ");
    const actionAttr = locked ? "disabled aria-disabled=\"true\"" : `data-library-add="${item.library_id}"`;
    return `
      <article class="${cardClass}">
        <div>
          <h4>${escapeText(item.title)}</h4>
          <p>${escapeText(item.summary)}</p>
          ${boundary}
          <div class="tag-row">${(item.tags || []).map((tag) => `<span>${escapeText(tag)}</span>`).join("")}</div>
        </div>
        <button type="button" ${actionAttr}>${actionLabel}</button>
      </article>
    `;
  }).join("");
  container.querySelectorAll(`[data-library-add]`).forEach((button) => {
    button.addEventListener("click", (event) => applyLibraryItem(event.target.dataset.libraryAdd));
  });
}

function applyLibraryItem(libraryId) {
  const item = workbenchLibrary.find((candidate) => candidate.library_id === libraryId);
  if (!item) return;
  if (item.type === "case_pattern") {
    state = createCaseFromTemplate(item.template_id);
    selectedTemplateId = item.template_id;
    selectedStartingPoint = "custom_case_library";
    syncStartingPointControls();
    setTab("intake");
    updateAll(true);
    return;
  }
  addLibraryEvidence(item.evidence || []);
  addLibraryTests(item.tests || []);
  addLibraryStrings(state.evaluation_plan.open_questions, item.open_questions || []);
  addLibraryDefinedItems(state.monitoring_plan.metrics, item.metrics || []);
  addLibraryDefinedItems(state.monitoring_plan.incident_triggers, item.incident_triggers || []);
  addLibraryStrings(state.approval_recommendation.conditions, item.conditions || []);
  setTab(item.type === "monitoring_metric" ? "monitoring" : item.type === "metric_tool" ? "tests" : "evidence");
  updateAll(false);
}

function addLibraryEvidence(items) {
  items.forEach((item) => {
    if (state.evidence.some((existing) => existing.title === item.title)) return;
    const next = String(state.evidence.length + 1).padStart(3, "0");
    state.evidence.push({
      evidence_id: `ev_${next}`,
      title: item.title,
      source: item.source || "user",
      status: "pending",
      evaluation_area: item.evaluation_area || "use_case_scope",
      summary: "",
      gap: item.gap || ""
    });
  });
}

function addLibraryTests(items) {
  items.filter(Boolean).forEach((item) => {
    if (state.evaluation_plan.required_tests.some((existing) => existing.test_id === item.test_id)) return;
    state.evaluation_plan.required_tests.push(structuredClone(item));
  });
}

function addLibraryStrings(target, items) {
  const tbdIndex = target.findIndex((item) => !isResolvedText(item));
  if (tbdIndex >= 0 && items.length) target.splice(tbdIndex, 1);
  items.forEach((item) => {
    if (!target.includes(item)) target.push(item);
  });
}

function addLibraryDefinedItems(target, items) {
  const tbdIndex = target.findIndex((item) => !isResolvedText(definedName(item)));
  if (tbdIndex >= 0 && items.length) target.splice(tbdIndex, 1);
  items.map(normalizeDefinedItem).forEach((item) => {
    if (!target.some((existing) => definedName(existing) === item.name)) target.push(item);
  });
}

function activeTemplate() {
  return useCaseTemplates.find((item) => item.template_id === selectedTemplateId) || useCaseTemplates[0];
}

function activeFrameworkAnchors() {
  const templateAnchors = activeTemplate().framework_anchors || [];
  const caseAnchors = state.use_case?.framework_anchors || [];
  const ids = caseAnchors.length ? caseAnchors : templateAnchors;
  return ids.map((anchor_id) => ({ anchor_id, ...frameworkAnchors[anchor_id] })).filter((anchor) => anchor.title);
}

function renderKickoffQuestions() {
  el("kickoffQuestions").innerHTML = state.use_case.kickoff_questions.map((item, index) => `
    <article class="kickoff-item">
      <label>
        ${escapeText(item.question)}
        <textarea rows="3" data-kickoff-response="${index}">${escapeText(item.response)}</textarea>
      </label>
    </article>
  `).join("");
  document.querySelectorAll("[data-kickoff-response]").forEach((textarea) => {
    textarea.addEventListener("input", (event) => {
      state.use_case.kickoff_questions[Number(event.target.dataset.kickoffResponse)].response = event.target.value;
      updateAll(false);
    });
  });
}

function renderRiskDrivers() {
  const answers = state.intake.answers;
  el("riskDriverGrid").innerHTML = riskDrivers.map((driver) => {
    const value = answers[driver.driver_id];
    const flagged = driver.high_risk_values.includes(value);
    return `
      <label class="driver-card ${flagged ? "flagged" : ""}">
        ${driver.name}
        <select data-driver="${driver.driver_id}">
          ${optionList(driver.options, value)}
        </select>
      </label>
    `;
  }).join("");
  document.querySelectorAll("[data-driver]").forEach((select) => {
    select.addEventListener("change", (event) => {
      state.intake.answers[event.target.dataset.driver] = event.target.value;
      updateAll(false);
    });
  });
  el("matchedRule").textContent = `Rule: ${state.risk_assessment.matched_rule || "manual_review"}`;
}

function renderLists() {
  renderScopeChecklist("intendedUsers", state.use_case.intended_users, state.use_case.intended_user_options || state.use_case.intended_users, "intended");
  renderScopeChecklist("prohibitedUses", state.use_case.prohibited_uses, state.use_case.prohibited_use_options || state.use_case.prohibited_uses, "prohibited");
  el("intendedUsersCount").textContent = `${state.use_case.intended_users.length} selected`;
  el("prohibitedUsesCount").textContent = `${state.use_case.prohibited_uses.length} selected`;
}

function renderScopeChecklist(id, selectedItems, optionItems, type) {
  const options = [...new Set([...(optionItems || []), ...selectedItems])];
  el(id).innerHTML = options.map((item) => {
    const checked = selectedItems.includes(item);
    return `
      <li class="check-list-item ${checked ? "selected" : "unselected"}">
        <label>
          <input type="checkbox" data-scope-type="${type}" data-scope-item="${escapeAttr(item)}" ${checked ? "checked" : ""}>
          <span>${escapeText(item)}</span>
        </label>
      </li>
    `;
  }).join("") || `<li class="empty-list-item">No options added yet.</li>`;
  document.querySelectorAll(`[data-scope-type="${type}"]`).forEach((input) => {
    input.addEventListener("change", (event) => {
      const item = event.target.dataset.scopeItem;
      const target = type === "intended" ? state.use_case.intended_users : state.use_case.prohibited_uses;
      if (event.target.checked && !target.includes(item)) target.push(item);
      if (!event.target.checked) {
        const index = target.indexOf(item);
        if (index >= 0) target.splice(index, 1);
      }
      updateAll(false);
    });
  });
}

function renderEditableArray(id, items) {
  el(id).innerHTML = items.map((item, index) => `
    <li>
      <input type="text" value="${escapeAttr(item)}" data-list="${id}" data-index="${index}">
      <button type="button" data-remove-list="${id}" data-index="${index}">Remove</button>
    </li>
  `).join("");
  document.querySelectorAll(`[data-list="${id}"]`).forEach((input) => {
    input.addEventListener("input", (event) => {
      items[Number(event.target.dataset.index)] = event.target.value;
      updateAll(false);
    });
  });
  document.querySelectorAll(`[data-remove-list="${id}"]`).forEach((button) => {
    button.addEventListener("click", (event) => {
      items.splice(Number(event.target.dataset.index), 1);
      updateAll(false);
    });
  });
}

function renderDefinedArray(id, items, definitionPlaceholder) {
  el(id).innerHTML = items.map((item, index) => {
    const normalized = normalizeDefinedItem(item);
    return `
      <li class="defined-item">
        <div class="defined-fields">
          <label>
            Metric or trigger
            <input type="text" value="${escapeAttr(normalized.name)}" data-defined-list="${id}" data-index="${index}" data-field="name">
          </label>
          <label>
            Definition
            <textarea rows="4" placeholder="${escapeAttr(definitionPlaceholder)}" data-defined-list="${id}" data-index="${index}" data-field="definition">${escapeText(normalized.definition)}</textarea>
          </label>
        </div>
        <button type="button" data-remove-defined="${id}" data-index="${index}">Remove</button>
      </li>
    `;
  }).join("");
  document.querySelectorAll(`[data-defined-list="${id}"]`).forEach((input) => {
    input.addEventListener("input", (event) => {
      const target = id === "monitoringMetrics" ? state.monitoring_plan.metrics : state.monitoring_plan.incident_triggers;
      target[Number(event.target.dataset.index)][event.target.dataset.field] = event.target.value;
      updateAll(false);
    });
  });
  document.querySelectorAll(`[data-remove-defined="${id}"]`).forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = id === "monitoringMetrics" ? state.monitoring_plan.metrics : state.monitoring_plan.incident_triggers;
      target.splice(Number(event.target.dataset.index), 1);
      updateAll(false);
    });
  });
}

function addListItem(type) {
  const map = {
    user: { input: "newUser", target: state.use_case.intended_users, options: "intended_user_options" },
    prohibited: { input: "newProhibitedUse", target: state.use_case.prohibited_uses, options: "prohibited_use_options" },
    metric: { input: "newMetric", target: state.monitoring_plan.metrics },
    trigger: { input: "newTrigger", target: state.monitoring_plan.incident_triggers }
  };
  const config = map[type];
  const value = el(config.input).value.trim();
  if (!value) return;
  if (type === "metric" || type === "trigger") {
    if (!config.target.some((item) => definedName(item) === value)) config.target.push({ name: value, definition: "" });
  } else if (!config.target.includes(value)) {
    config.target.push(value);
  }
  if (config.options) {
    state.use_case[config.options] = state.use_case[config.options] || [];
    if (!state.use_case[config.options].includes(value)) state.use_case[config.options].push(value);
  }
  el(config.input).value = "";
  updateAll(false);
}

function renderEvidence() {
  const rows = state.evidence.map((item, index) => `
    <tr>
      <td><input value="${escapeAttr(item.title)}" data-ev="${index}" data-field="title"></td>
      <td><select data-ev="${index}" data-field="source">${optionList(evidenceSources, item.source)}</select></td>
      <td><select data-ev="${index}" data-field="status">${optionList(statuses, item.status)}</select></td>
      <td><select data-ev="${index}" data-field="evaluation_area">${optionList(evaluationAreas, item.evaluation_area)}</select></td>
      <td><textarea data-ev="${index}" data-field="summary">${escapeText(item.summary)}</textarea></td>
      <td><textarea data-ev="${index}" data-field="gap">${escapeText(item.gap || "")}</textarea></td>
      <td class="row-actions"><button type="button" data-remove-ev="${index}">Remove</button></td>
    </tr>
  `).join("");
  el("evidenceTable").innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Source</th>
          <th>Status</th>
          <th>Area</th>
          <th>Summary</th>
          <th>Gap</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
  document.querySelectorAll("[data-ev]").forEach((input) => {
    input.addEventListener("input", updateEvidenceField);
    input.addEventListener("change", updateEvidenceField);
  });
  document.querySelectorAll("[data-remove-ev]").forEach((button) => {
    button.addEventListener("click", (event) => {
      state.evidence.splice(Number(event.target.dataset.removeEv), 1);
      updateAll(false);
    });
  });
  const gaps = state.evidence.filter((item) => item.gap && item.status !== "accepted" && item.status !== "not_applicable");
  el("gapList").innerHTML = gaps.map((item) => `<li><strong>${escapeText(item.title)}:</strong> ${escapeText(item.gap)}</li>`).join("") || "<li>No active evidence gaps.</li>";
}

function updateEvidenceField(event) {
  const index = Number(event.target.dataset.ev);
  const field = event.target.dataset.field;
  state.evidence[index][field] = event.target.value;
  updateAll(false);
}

function addEvidence() {
  const next = String(state.evidence.length + 1).padStart(3, "0");
  state.evidence.push({
    evidence_id: `ev_${next}`,
    title: "New Evidence Item",
    source: "user",
    status: "pending",
    evaluation_area: "use_case_scope",
    summary: "",
    gap: ""
  });
  updateAll(false);
}

function renderEvidenceBars() {
  const counts = Object.fromEntries(statuses.map((status) => [status, 0]));
  state.evidence.forEach((item) => counts[item.status] = (counts[item.status] || 0) + 1);
  const max = Math.max(1, ...Object.values(counts));
  el("evidenceBars").innerHTML = statuses.filter((status) => counts[status] > 0).map((status) => `
    <div class="status-row">
      <div><span>${titleCase(status)}</span><strong>${counts[status]}</strong></div>
      <div class="bar-track"><div class="bar-fill" style="width: ${(counts[status] / max) * 100}%"></div></div>
    </div>
  `).join("");
}

function renderReadiness() {
  const checks = readinessChecks();
  const passed = checks.filter((check) => check.level === "pass").length;
  const blocking = checks.filter((check) => check.level === "fail").length;
  const score = el("readinessScore");
  score.textContent = gatePosture(checks);
  score.title = `${passed} of ${checks.length} gate checks currently pass.`;
  score.className = "readiness-score";
  if (blocking) score.classList.add("danger");
  else if (passed < checks.length) score.classList.add("warning");
  el("readinessList").innerHTML = checks.map((check) => `<li class="${check.level}">${escapeText(check.label)}</li>`).join("");
}

function gatePosture(checks = readinessChecks()) {
  if (checks.some((check) => check.level === "fail")) return "Not ready";
  if (checks.some((check) => check.level === "warn")) return "Conditional review";
  return "Ready for review";
}

function blockingTestResolved(test) {
  if (test.disposition === "passed") return isResolvedText(test.definition) && isResolvedText(test.evidence_reference);
  if (test.disposition === "formally_deferred") return isResolvedText(test.definition) && isResolvedText(test.owner_condition);
  return false;
}

function readinessChecks() {
  const isBlankScenario = state.use_case.template_id === "other_blank_evaluation";
  const activeGaps = state.evidence.filter((item) => item.gap && !["accepted", "not_applicable"].includes(item.status));
  const blockingTests = state.evaluation_plan.required_tests.filter((test) => test.priority === "blocking");
  const vendorOrThirdParty = state.system_profile.model_source === "vendor" || isResolvedText(state.system_profile.vendor_name);
  const hasVendorEvidence = state.evidence.some((item) => item.source === "vendor" && isResolvedText(item.title));
  const hasUserEvidence = state.evidence.some((item) => ["user", "independent_test", "system_generated", "policy"].includes(item.source) && isResolvedText(item.title));
  const nonLowTier = !["tier_1_low"].includes(state.risk_assessment.recommended_tier);
  const unresolvedEvidenceBlocksGate = nonLowTier && activeGaps.some((item) => ["pending", "weak", "stale", "partial", "rejected"].includes(item.status));
  const blockingTestOpen = blockingTests.some((test) => !blockingTestResolved(test));
  const hasConditions = state.approval_recommendation.conditions.some(isResolvedText);
  const hasResidualRisk = isResolvedText(state.approval_recommendation.residual_risk_statement);
  const hasMonitoring = state.monitoring_plan.metrics.some(hasDefinedItem) && state.monitoring_plan.incident_triggers.some(hasDefinedItem);
  const hasScope = isResolvedText(state.use_case.business_purpose) && state.use_case.prohibited_uses.some(isResolvedText);
  const hasEvidencePlan = state.evidence.length > 0 || !isBlankScenario;
  const hasTestPlan = state.evaluation_plan.required_tests.length > 0 || !isBlankScenario;
  const hasRecommendation = state.approval_recommendation.recommendation !== "to_be_determined";
  const hasProjectSetup = Boolean(isResolvedText(state.project_setup.evaluation_owner) && isResolvedText(state.project_setup.business_unit) && state.project_setup.deployment_stage);
  const kickoffAnswered = state.use_case.kickoff_questions.filter((item) => isResolvedText(item.response)).length;
  const kickoffTotal = state.use_case.kickoff_questions.length;
  const kickoffComplete = kickoffTotal === 0 || kickoffAnswered === kickoffTotal;
  const riskDriversComplete = !Object.values(state.intake.answers).includes("to_be_determined");
  return [
    { label: hasProjectSetup ? "Project owner, business unit, and stage recorded" : "Project owner, business unit, or stage missing", level: hasProjectSetup ? "pass" : "warn" },
    { label: kickoffTotal === 0 ? "No template kickoff questions required" : kickoffComplete ? "Template kickoff questions answered" : `${kickoffTotal - kickoffAnswered} template kickoff question(s) need response`, level: kickoffComplete ? "pass" : "warn" },
    { label: riskDriversComplete ? "Risk-driver answers completed" : "Risk-driver answers need determination", level: riskDriversComplete ? "pass" : "warn" },
    { label: hasScope ? "Scope and prohibited uses defined" : "Scope or prohibited uses need definition", level: hasScope ? "pass" : "fail" },
    { label: vendorOrThirdParty ? hasVendorEvidence && hasUserEvidence ? "Vendor and user-side evidence both represented" : "Vendor or user-side evidence split incomplete" : hasUserEvidence ? "User-side evidence represented" : "User-side evidence needs definition", level: vendorOrThirdParty ? hasVendorEvidence && hasUserEvidence ? "pass" : "warn" : hasUserEvidence ? "pass" : "warn" },
    { label: hasEvidencePlan ? activeGaps.length ? `${activeGaps.length} active evidence gap(s) require disposition` : "No active evidence gaps" : "Evidence plan needs definition", level: hasEvidencePlan ? unresolvedEvidenceBlocksGate ? "fail" : activeGaps.length ? "warn" : "pass" : "warn" },
    { label: hasTestPlan ? blockingTestOpen ? "Blocking tests need passed evidence or formal deferral" : "Blocking tests have documented pass/deferral disposition" : "Test plan needs definition", level: hasTestPlan ? blockingTestOpen ? "fail" : "pass" : "warn" },
    { label: hasMonitoring ? "Monitoring metrics and incident triggers present" : "Monitoring metrics or incident triggers missing", level: hasMonitoring ? "pass" : "fail" },
    { label: hasRecommendation && hasConditions ? "Decision posture and conditions documented" : "Decision posture or conditions need determination", level: hasRecommendation && hasConditions ? "pass" : "warn" },
    { label: hasResidualRisk ? "Residual risk statement present" : "Residual risk statement missing", level: hasResidualRisk ? "pass" : "fail" }
  ];
}

function renderTests() {
  state.evaluation_plan.required_tests = normalizeTests(state.evaluation_plan.required_tests);
  const blocking = state.evaluation_plan.required_tests.filter((test) => test.priority === "blocking").length;
  el("blockingCount").textContent = `${blocking} blocking`;
  el("testList").innerHTML = state.evaluation_plan.required_tests.map((test, index) => `
    <article class="test-item">
      <div>
        <h3>${escapeText(test.title)}</h3>
        <p>${escapeText(test.acceptance_signal)}</p>
        <div class="test-grid">
          <label>
            Disposition
            <select data-test-field="${index}" data-field="disposition">${optionList(testDispositionOptions, test.disposition)}</select>
          </label>
          <label>
            Evidence reference
            <input type="text" value="${escapeAttr(test.evidence_reference || "")}" data-test-field="${index}" data-field="evidence_reference" placeholder="Evidence item, file, result, or source">
          </label>
          <label class="wide">
            Owner / condition for deferral
            <input type="text" value="${escapeAttr(test.owner_condition || "")}" data-test-field="${index}" data-field="owner_condition" placeholder="Required owner, review condition, or deferral rationale">
          </label>
        </div>
        <label class="definition-field">
          Method and result / deferral basis
          <textarea rows="3" data-test-definition="${index}" placeholder="Define test population, method, data source, pass/fail threshold, owner, timing, and result or formal deferral.">${escapeText(test.definition || "")}</textarea>
        </label>
      </div>
      <span class="priority ${test.priority}">${titleCase(test.priority)}</span>
    </article>
  `).join("");
  document.querySelectorAll("[data-test-definition]").forEach((textarea) => {
    textarea.addEventListener("input", (event) => {
      state.evaluation_plan.required_tests[Number(event.target.dataset.testDefinition)].definition = event.target.value;
      updateAll(false);
    });
  });
  document.querySelectorAll("[data-test-field]").forEach((field) => {
    field.addEventListener("input", updateTestField);
    field.addEventListener("change", updateTestField);
  });
  renderQuestionList();
}

function updateTestField(event) {
  const index = Number(event.target.dataset.testField);
  const field = event.target.dataset.field;
  if (!state.evaluation_plan.required_tests[index] || !field) return;
  state.evaluation_plan.required_tests[index][field] = event.target.value;
  updateAll(false);
}

function renderQuestionList() {
  el("openQuestions").innerHTML = state.evaluation_plan.open_questions.map((question, index) => `
    <li>
      <input type="text" value="${escapeAttr(question)}" data-question="${index}">
      <button type="button" data-remove-question="${index}">Remove</button>
    </li>
  `).join("");
  document.querySelectorAll("[data-question]").forEach((input) => {
    input.addEventListener("input", (event) => {
      state.evaluation_plan.open_questions[Number(event.target.dataset.question)] = event.target.value;
      updateAll(false);
    });
  });
  document.querySelectorAll("[data-remove-question]").forEach((button) => {
    button.addEventListener("click", (event) => {
      state.evaluation_plan.open_questions.splice(Number(event.target.dataset.removeQuestion), 1);
      updateAll(false);
    });
  });
}

function renderMonitoring() {
  state.monitoring_plan.metrics = normalizeDefinedItems(state.monitoring_plan.metrics);
  state.monitoring_plan.incident_triggers = normalizeDefinedItems(state.monitoring_plan.incident_triggers);
  el("reviewCadence").textContent = state.monitoring_plan.review_cadence;
  renderDefinedArray("monitoringMetrics", state.monitoring_plan.metrics, "Define numerator/denominator, data source, threshold, cadence, and owner.");
  renderDefinedArray("incidentTriggers", state.monitoring_plan.incident_triggers, "Define trigger condition, threshold, escalation path, response owner, and review timing.");
}

function renderApproval() {
  el("approvalTemplate").textContent = postureLabel();
  el("recommendation").value = state.approval_recommendation.recommendation;
  el("residualRisk").value = state.approval_recommendation.residual_risk_statement;
  el("conditionList").innerHTML = state.approval_recommendation.conditions.map((condition, index) => `
    <li>
      <input type="text" value="${escapeAttr(condition)}" data-condition="${index}">
      <button type="button" data-remove-condition="${index}">Remove</button>
    </li>
  `).join("");
  document.querySelectorAll("[data-condition]").forEach((input) => {
    input.addEventListener("input", (event) => {
      state.approval_recommendation.conditions[Number(event.target.dataset.condition)] = event.target.value;
      updateAll(false);
    });
  });
  document.querySelectorAll("[data-remove-condition]").forEach((button) => {
    button.addEventListener("click", (event) => {
      state.approval_recommendation.conditions.splice(Number(event.target.dataset.removeCondition), 1);
      updateAll(false);
    });
  });
}

function recalcRisk() {
  const answers = state.intake.answers;
  let matched = "r2_vendor_internal_search_default";
  let tier = "tier_2_moderate";
  let rationale = "Internal vendor LLM use can be moderate risk when data, retrieval, access, and monitoring controls are testable.";
  const hasUndetermined = Object.values(answers).includes("to_be_determined");

  if (hasUndetermined) {
    matched = "manual_scoping_required";
    tier = "tier_2_moderate";
    rationale = "Risk tier is provisional because one or more risk-driver answers remain to be determined.";
  } else if (["confidential_content", "regulated_content"].includes(answers.external_data_transfer) && ["unclear", "permitted_for_training"].includes(answers.vendor_retention_training_use)) {
    matched = "r0_sensitive_external_without_controls";
    tier = "tier_0_unacceptable";
    rationale = "Sensitive transfer and unclear or unacceptable vendor reuse terms create a blocking data-boundary issue.";
  } else if (answers.decision_authority === "final_decision" && ["employee", "customer", "applicant", "public"].includes(answers.affected_party)) {
    matched = "r0_unvalidated_final_consequential_decision";
    tier = "tier_0_unacceptable";
    rationale = "Final consequential decisioning requires a separate high-assurance design and evidence package.";
  } else if (
    state.use_case.template_id === "internal_credit_decisioning_tool" ||
    (answers.affected_party === "applicant" && answers.data_category === "regulated" && ["recommendation_support", "final_decision"].includes(answers.decision_authority))
  ) {
    matched = "r3_credit_decisioning_regulated_review";
    tier = "tier_3_high";
    rationale = "Credit decision support for applicants or customers requires high-risk review for model performance, fair lending, explainability, adverse-action support, monitoring, and change control.";
  } else if (["employee", "customer", "applicant", "public"].includes(answers.affected_party)) {
    matched = "r3_customer_or_employee_impact";
    tier = "tier_3_high";
    rationale = "Direct impact on protected or external parties raises governance, fairness, reliance, and monitoring expectations.";
  } else if (["weak", "not_feasible"].includes(answers.monitoring_feasibility) && ["limited_visibility", "none"].includes(answers.vendor_change_visibility)) {
    matched = "r3_weak_monitoring_or_change_visibility";
    tier = "tier_3_high";
    rationale = "Weak post-deployment observability is a high-risk condition for adaptive or vendor-controlled AI systems.";
  } else if (answers.decision_authority === "informational_only" && answers.data_category === "public" && answers.external_data_transfer === "none") {
    matched = "r1_low_internal_public";
    tier = "tier_1_low";
    rationale = "The use case has limited internal scope, public data, and low decision influence.";
  }

  state.risk_assessment.initial_tier = tier;
  state.risk_assessment.recommended_tier = tier;
  state.risk_assessment.tier_rationale = rationale;
  state.risk_assessment.matched_rule = matched;
  state.risk_assessment.risk_flags = deriveRiskFlags(answers, tier);

  if (tier === "tier_0_unacceptable") state.approval_recommendation.recommendation = "reject";
  if (tier === "tier_3_high" && state.approval_recommendation.recommendation === "approve") state.approval_recommendation.recommendation = "defer";
}

function deriveRiskFlags(answers, tier) {
  if (Object.values(answers).includes("to_be_determined")) return ["manual_scoping_required", "risk_driver_answers_pending"];
  const flags = [];
  if (state.use_case.template_id === "vendor_llm_internal_knowledge_search" || state.system_profile.vendor_name || state.system_profile.model_source === "vendor") {
    flags.push("vendor_hosted_llm");
  }
  if (state.system_profile.retrieval_augmented || state.use_case.template_id === "vendor_llm_internal_knowledge_search") {
    flags.push("retrieval_augmented_generation");
  }
  if (state.use_case.template_id === "internal_credit_decisioning_tool") {
    flags.push("credit_decisioning", "regulated_decision_support", "fair_lending_review_required");
  }
  if (tier === "tier_0_unacceptable") flags.push("blocking_redesign_required");
  if (tier === "tier_3_high") flags.push("high_risk_review_required");
  if (answers.external_data_transfer !== "none") flags.push(`${answers.external_data_transfer}_transfer`);
  if (answers.access_control_inheritance !== "tested") flags.push("access_control_testing_required");
  if (answers.adversarial_exposure !== "low_internal") flags.push("prompt_injection_testing_required");
  if (!["advance_notice_and_release_notes", "not_applicable", "to_be_determined"].includes(answers.vendor_change_visibility)) flags.push(`vendor_change_visibility_${answers.vendor_change_visibility}`);
  if (answers.monitoring_feasibility === "weak" || answers.monitoring_feasibility === "not_feasible") flags.push("monitoring_gap");
  return [...new Set(flags)];
}

function renderArtifact() {
  el("artifactPreview").textContent = artifactText(activeArtifact);
}

function artifactText(type) {
  const builders = {
    matrix: buildMatrix,
    gaps: buildGaps,
    tests: buildTests,
    monitoring: buildMonitoring,
    approval: buildApproval,
    brief: buildBrief,
    readiness: buildReadiness
  };
  return builders[type]();
}

function caseFilename(kind, extension) {
  return `${slug(caseDisplayName())}-${kind}-v${state.version || "0.1"}-${exportStamp()}.${extension}`;
}

function caseDisplayName() {
  return state.case_name.trim() || "Untitled evaluation";
}

function valueOrTbd(value) {
  return isResolvedText(value) ? value : "TBD";
}

function listOrTbd(items) {
  const resolved = items.filter(isResolvedText);
  return resolved.length ? resolved.map((item) => `- ${item}`) : ["- TBD"];
}

function definedListOrTbd(items) {
  const resolved = normalizeDefinedItems(items).filter((item) => isResolvedText(item.name));
  return resolved.length
    ? resolved.map((item) => `- ${item.name}: ${valueOrTbd(item.definition)}`)
    : ["- TBD"];
}

function buildCaseExport() {
  return {
    ...state,
    workbench_export: {
      app_version: appVersion,
      exported_at: new Date().toISOString(),
      framework_anchors: activeFrameworkAnchors(),
      artifact_readiness: readinessChecks().map((check) => ({ status: check.level, label: check.label }))
    }
  };
}

function gateQualifiedPosture() {
  const checks = readinessChecks();
  const fail = checks.filter((check) => check.level === "fail").length;
  const warn = checks.filter((check) => check.level === "warn").length;
  const selected = postureLabel();
  if (fail) return `Not ready; selected posture (${selected}) is not decision-ready until failing gate items are resolved or explicitly dispositioned.`;
  if (warn) return `${selected}; conditional review only if warnings are accepted, assigned, or converted into review conditions.`;
  return selected;
}

function artifactHeader(title) {
  return [
    `# ${title}: ${caseDisplayName()}`,
    "",
    `Case ID: ${state.case_id}`,
    `Case version: ${state.version}`,
    `Workbench version: ${appVersion}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    `Artifact boundary: ${artifactBoundaryNotice}`,
    ""
  ];
}

function artifactAnchorSection() {
  const anchors = activeFrameworkAnchors();
  if (!anchors.length) {
    return [
      "## Framework Anchors",
      "",
      "No framework anchors are assigned for this generic baseline case."
    ];
  }
  return [
    "## Framework Anchors",
    "",
    "These anchors identify where the workbench segment connects to the foundational framework paper. Citations remain in that paper, not in this workbook.",
    "",
    ...anchors.map((anchor) => `- ${anchor.anchor_id}: ${anchor.title}`)
  ];
}

function projectSetupSection() {
  return [
    "## Project Setup",
    "",
    `Evaluation owner: ${state.project_setup.evaluation_owner || "Not recorded"}`,
    `Business unit: ${state.project_setup.business_unit || "Not recorded"}`,
    `Deployment stage: ${titleCase(state.project_setup.deployment_stage || "not_recorded")}`,
    `Target decision date: ${state.project_setup.target_decision_date || "Not recorded"}`
  ];
}

function kickoffQuestionSection() {
  const lines = [
    "## Template Kickoff Questions",
    "",
    "| Question | Response |",
    "|---|---|"
  ];
  state.use_case.kickoff_questions.forEach((item) => {
    lines.push(`| ${cleanCell(item.question)} | ${cleanCell(item.response || "Not recorded")} |`);
  });
  return lines;
}

function buildBundle() {
  const lines = [
    `# PAE Workbench Artifact Bundle: ${caseDisplayName()}`,
    "",
    `Case ID: ${state.case_id}`,
    `Case version: ${state.version}`,
    `Workbench version: ${appVersion}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    `Artifact boundary: ${artifactBoundaryNotice}`,
    "",
    ...projectSetupSection(),
    "",
    ...kickoffQuestionSection(),
    "",
    "## Completeness Gate",
    "",
    ...readinessChecks().map((check) => `- ${titleCase(check.level)}: ${check.label}`),
    "",
    ...artifactAnchorSection(),
    "",
    "---",
    ""
  ];
  return lines.join("\n") + [
    buildBrief(),
    buildMatrix(),
    buildGaps(),
    buildTests(),
    buildMonitoring(),
    buildApproval(),
    buildReadiness()
  ].join("\n\n---\n\n");
}

function buildMatrix() {
  const accepted = state.evidence.filter((item) => item.status === "accepted").length;
  const open = state.evidence.filter((item) => !["accepted", "not_applicable"].includes(item.status)).length;
  const lines = [
    ...artifactHeader("Evaluation Matrix"),
    "## Executive Summary",
    "",
    `This draft evaluation package covers ${caseDisplayName()}. The current gate-qualified posture is **${gateQualifiedPosture()}** at **${tierNames[state.risk_assessment.recommended_tier]}** risk tier. The evidence file contains ${state.evidence.length} item(s), including ${accepted} accepted item(s) and ${open} item(s) requiring review, remediation, or decision-owner awareness.`,
    "",
    "## Case Snapshot",
    "",
    `Status: ${displayLabel(state.status)}`,
    `Recommended tier: ${tierNames[state.risk_assessment.recommended_tier]}`,
    `Decision posture: ${gateQualifiedPosture()}`,
    `Vendor: ${valueOrTbd(state.system_profile.vendor_name)}`,
    `Model or system: ${titleCase(state.system_profile.model_or_system_type || "model")} - ${valueOrTbd(state.system_profile.model_or_service_name)}`,
    "",
    ...projectSetupSection(),
    "",
    ...kickoffQuestionSection(),
    "",
    ...artifactAnchorSection(),
    "",
    "## Business Purpose",
    valueOrTbd(state.use_case.business_purpose),
    "",
    "## Intended Users",
    ...listOrTbd(state.use_case.intended_users),
    "",
    "## Prohibited Uses",
    ...listOrTbd(state.use_case.prohibited_uses),
    "",
    "## Risk Rationale",
    state.risk_assessment.tier_rationale,
    "",
    "## Risk Flags",
    ...state.risk_assessment.risk_flags.map((flag) => `- ${titleCase(flag)}`),
    "",
    "## Evidence",
    "",
    "| Area | Evidence | Source | Status | Summary | Gap |",
    "|---|---|---|---|---|---|"
  ];
  state.evidence.forEach((item) => {
    lines.push(`| ${areaNames[item.evaluation_area] || titleCase(item.evaluation_area)} | ${cleanCell(item.title)} | ${titleCase(item.source)} | ${titleCase(item.status)} | ${cleanCell(item.summary)} | ${cleanCell(item.gap || "")} |`);
  });
  if (!state.evidence.length) lines.push("| TBD | TBD | TBD | TBD | TBD | TBD |");
  return lines.join("\n");
}

function buildGaps() {
  const gaps = state.evidence.filter((item) => item.gap && item.status !== "accepted" && item.status !== "not_applicable");
  const lines = [
    ...artifactHeader("Evidence Gap List"),
    "## Executive Summary",
    "",
    gaps.length
      ? `The case has ${gaps.length} active evidence gap(s). These items should be resolved, accepted as explicit residual risk, or converted into decision conditions before broader deployment.`
      : "No active evidence gaps are currently recorded.",
    "",
    `Recommended tier: ${tierNames[state.risk_assessment.recommended_tier]}`,
    "",
    ...projectSetupSection(),
    "",
    ...kickoffQuestionSection(),
    "",
    ...artifactAnchorSection(),
    ""
  ];
  if (!gaps.length) {
    lines.push("No active evidence gaps.");
    return lines.join("\n");
  }
  lines.push("## Gap Register");
  lines.push("");
  lines.push("| Area | Evidence | Status | Gap | Suggested Disposition |");
  lines.push("|---|---|---|---|---|");
  gaps.forEach((item) => {
    lines.push(`| ${areaNames[item.evaluation_area] || titleCase(item.evaluation_area)} | ${cleanCell(item.title)} | ${titleCase(item.status)} | ${cleanCell(item.gap)} | ${gapDisposition(item)} |`);
  });
  return lines.join("\n");
}

function buildTests() {
  const blocking = state.evaluation_plan.required_tests.filter((test) => test.priority === "blocking").length;
  const unresolvedBlocking = state.evaluation_plan.required_tests.filter((test) => test.priority === "blocking" && !blockingTestResolved(test)).length;
  const lines = [
    ...artifactHeader("Test Plan"),
    "## Executive Summary",
    "",
    `The current plan includes ${state.evaluation_plan.required_tests.length} required test(s), including ${blocking} blocking test(s). ${unresolvedBlocking} blocking test(s) still need passed evidence or formal deferral with an owner or decision condition before pilot launch.`,
    "",
    `Recommended tier: ${tierNames[state.risk_assessment.recommended_tier]}`,
    "",
    ...projectSetupSection(),
    "",
    ...kickoffQuestionSection(),
    "",
    ...artifactAnchorSection(),
    "",
    "## Required Tests",
    "",
    "| Test | Priority | Disposition | Evidence Reference | Owner / Condition | Method and Result / Deferral Basis | Acceptance Signal |",
    "|---|---|---|---|---|---|---|"
  ];
  state.evaluation_plan.required_tests.forEach((test) => {
    lines.push(`| ${cleanCell(test.title)} | ${titleCase(test.priority)} | ${titleCase(test.disposition || "not_started")} | ${cleanCell(test.evidence_reference || "TBD")} | ${cleanCell(test.owner_condition || "TBD")} | ${cleanCell(test.definition || "TBD")} | ${cleanCell(test.acceptance_signal)} |`);
  });
  if (!state.evaluation_plan.required_tests.length) lines.push("| TBD | TBD | TBD | TBD | TBD | TBD | TBD |");
  lines.push("");
  lines.push("## Open Questions");
  if (state.evaluation_plan.open_questions.length) {
    state.evaluation_plan.open_questions.forEach((question) => lines.push(`- ${question}`));
  } else {
    lines.push("No open test-plan questions recorded.");
  }
  return lines.join("\n");
}

function buildMonitoring() {
  const lines = [
    ...artifactHeader("Monitoring Plan"),
    "## Executive Summary",
    "",
    "Monitoring is part of the decision package, not a post-launch afterthought. This plan defines what the pilot should watch, when review should occur, and what events should trigger escalation, suspension, or reapproval.",
    "",
    `Review cadence: ${valueOrTbd(state.monitoring_plan.review_cadence)}`,
    "",
    ...projectSetupSection(),
    "",
    ...kickoffQuestionSection(),
    "",
    ...artifactAnchorSection(),
    "",
    "## Metrics"
  ];
  definedListOrTbd(state.monitoring_plan.metrics).forEach((metric) => lines.push(metric));
  lines.push("");
  lines.push("## Incident Triggers");
  definedListOrTbd(state.monitoring_plan.incident_triggers).forEach((trigger) => lines.push(trigger));
  lines.push("");
  lines.push("## Review Expectations");
  lines.push("- Confirm whether observed use remains within approved scope.");
  lines.push("- Review unresolved evidence gaps and new incidents together.");
  lines.push("- Reassess review conditions after vendor, corpus, prompt, access-control, or monitoring changes.");
  return lines.join("\n");
}

function buildApproval() {
  const lines = [
    ...artifactHeader("Draft Residual-Risk Review Package"),
    "## Executive Summary",
    "",
    `The current gate-qualified posture is **${gateQualifiedPosture()}** for **${caseDisplayName()}** at **${tierNames[state.risk_assessment.recommended_tier]}** risk tier. This is a draft residual-risk review package for accountable review, conditional on the scope, evidence, monitoring, and residual-risk posture documented below.`,
    "",
    `Decision posture: ${gateQualifiedPosture()}`,
    `Recommended tier: ${tierNames[state.risk_assessment.recommended_tier]}`,
    "",
    ...projectSetupSection(),
    "",
    ...kickoffQuestionSection(),
    "",
    ...artifactAnchorSection(),
    "",
    "## Basis",
    state.risk_assessment.tier_rationale,
    "",
    "## Conditions"
  ];
  listOrTbd(state.approval_recommendation.conditions).forEach((condition) => lines.push(condition));
  lines.push("");
  lines.push("## Residual Risk Statement");
  lines.push(valueOrTbd(state.approval_recommendation.residual_risk_statement));
  lines.push("");
  lines.push("## Risk Flags");
  state.risk_assessment.risk_flags.forEach((flag) => lines.push(`- ${titleCase(flag)}`));
  lines.push("");
  lines.push("## Completeness Gate");
  readinessChecks().forEach((check) => lines.push(`- ${titleCase(check.level)}: ${check.label}`));
  return lines.join("\n");
}

function evidenceSourceSummary() {
  const counts = state.evidence.reduce((acc, item) => {
    acc[item.source] = (acc[item.source] || 0) + 1;
    return acc;
  }, {});
  return evidenceSources.map((source) => `${titleCase(source)}: ${counts[source] || 0}`).join("; ");
}

function decisionPosture() {
  const checks = readinessChecks();
  const fail = checks.filter((check) => check.level === "fail").length;
  const warn = checks.filter((check) => check.level === "warn").length;
  if (state.risk_assessment.recommended_tier === "tier_0_unacceptable") return "Not supportable without redesign or major control changes.";
  if (fail) return "Not ready for decision review until failing readiness items are resolved or explicitly dispositioned.";
  if (warn) return "Ready for conditional review only if warnings are accepted, assigned, or converted into review conditions.";
  return "Ready for accountable decision review using the generated package.";
}

function buildBrief() {
  const checks = readinessChecks();
  const fail = checks.filter((check) => check.level === "fail");
  const warn = checks.filter((check) => check.level === "warn");
  const gaps = state.evidence.filter((item) => item.gap && !["accepted", "not_applicable"].includes(item.status));
  const blocking = state.evaluation_plan.required_tests.filter((test) => test.priority === "blocking");
  const lines = [
    ...artifactHeader("Decision Brief"),
    "## Decision Posture",
    "",
    decisionPosture(),
    "",
    "## Case Snapshot",
    "",
    `Status: ${displayLabel(state.status)}`,
    `Recommended tier: ${tierNames[state.risk_assessment.recommended_tier]}`,
    `Decision posture: ${gateQualifiedPosture()}`,
    `Evidence source mix: ${evidenceSourceSummary()}`,
    `Active evidence gaps: ${gaps.length}`,
    `Blocking tests: ${blocking.length}`,
    "",
    ...projectSetupSection(),
    "",
    "## Scope Summary",
    "",
    `Business purpose: ${valueOrTbd(state.use_case.business_purpose)}`,
    `Vendor: ${valueOrTbd(state.system_profile.vendor_name)}`,
    `Model or system: ${titleCase(state.system_profile.model_or_system_type || "model")} - ${valueOrTbd(state.system_profile.model_or_service_name)}`,
    "",
    "## Key Conditions",
    ...listOrTbd(state.approval_recommendation.conditions),
    "",
    "## Residual Risk",
    "",
    valueOrTbd(state.approval_recommendation.residual_risk_statement),
    "",
    "## Items Requiring Attention"
  ];
  if (fail.length || warn.length) {
    [...fail, ...warn].forEach((check) => lines.push(`- ${titleCase(check.level)}: ${check.label}`));
  } else {
    lines.push("- No readiness warnings or failures recorded.");
  }
  return lines.join("\n");
}

function buildReadiness() {
  const checks = readinessChecks();
  const pass = checks.filter((check) => check.level === "pass").length;
  const fail = checks.filter((check) => check.level === "fail").length;
  const warn = checks.filter((check) => check.level === "warn").length;
  const posture = gatePosture(checks);
  const lines = [
    ...artifactHeader("Case Readiness Review"),
    "## Executive Summary",
    "",
    `Gate posture: **${posture}**. ${pass} of ${checks.length} gate checks currently pass; ${fail} failing item(s) and ${warn} warning item(s) remain. This review is a documentation-completeness and unresolved-work check, not evidence-quality verification or an automatic approval decision.`,
    "",
    ...projectSetupSection(),
    "",
    ...kickoffQuestionSection(),
    "",
    ...artifactAnchorSection(),
    "",
    "## Readiness Checklist",
    "",
    "| Status | Item |",
    "|---|---|"
  ];
  checks.forEach((check) => lines.push(`| ${titleCase(check.level)} | ${cleanCell(check.label)} |`));
  lines.push("");
  lines.push("## Recommended Next Actions");
  if (fail || warn) {
    checks.filter((check) => check.level !== "pass").forEach((check) => lines.push(`- Resolve or disposition: ${check.label}`));
  } else {
    lines.push("- Prepare the accountable review package using the generated matrix, test plan, monitoring plan, and residual-risk posture.");
  }
  return lines.join("\n");
}

function copyArtifact() {
  const text = artifactText(activeArtifact);
  navigator.clipboard.writeText(text).catch(() => {
    const temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
  });
}

function downloadText(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeText(value) {
  return String(value ?? "").replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char]));
}

function escapeAttr(value) {
  return escapeText(value).replace(/"/g, "&quot;");
}

function cleanCell(value) {
  return String(value ?? "").replace(/\|/g, "/").replace(/\n/g, " ");
}

function gapDisposition(item) {
  if (item.status === "pending") return "Complete or attach evidence before accountable review.";
  if (item.status === "weak") return "Strengthen evidence or convert to explicit review condition.";
  if (item.status === "partial") return "Eligible for accountable pilot review only if residual risk is documented.";
  if (item.status === "stale") return "Refresh evidence before relying on it.";
  if (item.status === "rejected") return "Remediate or redesign before accountable review.";
  return "Review and disposition.";
}

bindStaticControls();
renderFormValues();
updateAll(true);
showSetup();

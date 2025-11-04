<!--
Sync Impact Report:
Version: 1.0.0 → 1.1.0 (MINOR - Added Traditional Chinese documentation requirement)
Modified Principles:
  - Added: VI. Traditional Chinese Documentation (zh-TW)
Added Sections: None
Removed Sections: None
Templates Status:
  - ✅ spec-template.md (header note added for zh-TW requirement)
  - ✅ plan-template.md (header note added for zh-TW requirement)
  - ✅ tasks-template.md (header note added for zh-TW requirement)
  - ✅ .claude/commands/speckit.specify.md (zh-TW reminder added)
  - ✅ .claude/commands/speckit.plan.md (zh-TW reminders added for all phases)
  - ✅ .claude/commands/speckit.tasks.md (zh-TW reminder added)
Follow-up TODOs: None - all templates and command files updated
-->

# TechDrive Showcase Site Constitution

## Core Principles

### I. Simplicity First (NON-NEGOTIABLE)

**DO NOT OVERDESIGN. DO NOT OVERENGINEER.**

- Start with the simplest solution that solves the problem
- New abstraction layers MUST be justified with concrete evidence of need
- YAGNI (You Aren't Gonna Need It) principle is mandatory
- Reject complexity unless unavoidable for meeting requirements
- Technical decisions MUST be documented in plan.md with "Complexity Tracking" section when adding abstractions

**Rationale**: Over-engineering creates maintenance burden, reduces readability, and slows down development velocity. Simple code is easier to understand, test, and modify.

### II. Scope Control (NON-NEGOTIABLE)

**Strictly enforce User Story boundaries to prevent scope creep.**

- Implementation MUST align exactly with defined User Story acceptance scenarios
- Any additional functionality requires explicit approval before coding
- Features outside current User Story MUST be deferred to new User Stories
- Before starting implementation, confirm scope understanding with stakeholder
- Reject "while we're here" additions unless explicitly scoped

**Rationale**: Uncontrolled scope expansion leads to delayed delivery, incomplete features, and technical debt. Clear boundaries enable predictable delivery and independent testing.

### III. Test-Driven Development (TDD)

**Tests guide implementation quality and catch regressions early.**

- **When tests are required** (explicitly stated in spec or plan):
  - Tests MUST be written BEFORE implementation
  - Follow Red-Green-Refactor cycle: Write test → Verify failure → Implement → Verify pass → Refactor
  - Contract tests MUST cover all external API boundaries defined in contracts/
  - Integration tests MUST validate end-to-end User Story acceptance scenarios
- **When tests are optional** (not explicitly required):
  - Apply judgment based on risk, complexity, and criticality
  - Consider testing for: authentication, payment processing, data integrity, complex business logic
  - Document testing decisions in plan.md
- All tests MUST run in CI pipeline and block merge if failing
- Test coverage is a quality signal, not a target number

**Rationale**: TDD prevents defects from entering production, improves design by forcing testability, and provides living documentation. Mandatory when specified; optional based on risk assessment otherwise.

### IV. User Experience Consistency

**Deliver coherent, predictable experiences across all touchpoints.**

- UI components MUST follow established design system patterns
- Error messages MUST be user-friendly (no raw stack traces or technical jargon)
- Loading states and error handling MUST be present for all async operations
- Responsive behavior MUST be tested on target devices/viewports before completion
- Accessibility (a11y) considerations MUST be addressed for interactive elements
- UX changes affecting multiple User Stories require design review and approval

**Rationale**: Inconsistent UX creates cognitive load, reduces trust, and increases support burden. Predictable patterns improve learnability and user satisfaction.

### V. Performance Standards

**Performance is a feature, not an afterthought.**

- Performance goals MUST be documented upfront in plan.md Technical Context
- Critical paths (e.g., page load, API response, rendering) MUST meet documented targets
- Performance regressions blocking defined goals MUST be addressed before merge
- Use appropriate profiling tools to validate performance claims
- Optimize only when measurements show actual bottlenecks (avoid premature optimization)
- Consider: bundle size (web), memory usage (mobile), response time (API), frame rate (animations)

**Rationale**: Poor performance directly impacts user satisfaction, conversion rates, and system scalability. Defining goals upfront prevents costly refactoring later.

### VI. Traditional Chinese Documentation (NON-NEGOTIABLE)

**All specifications, plans, and user-facing documentation MUST be written in Traditional Chinese (zh-TW).**

- spec.md MUST be written in Traditional Chinese
- plan.md (including all phases: research.md, data-model.md, quickstart.md) MUST be written in Traditional Chinese
- tasks.md MUST be written in Traditional Chinese
- User-facing UI text, error messages, and help content MUST be in Traditional Chinese
- Code comments MAY be in English or Traditional Chinese (developer's choice)
- Technical terms (e.g., "API", "frontend", "backend") MAY remain in English when commonly used in industry
- Variable names, function names, and code identifiers MUST follow standard programming conventions (typically English)

**Exceptions**:
- External library/framework documentation references (keep original language)
- Git commit messages (follow Conventional Commits in English as per CLAUDE.md)
- Technical configuration files (e.g., package.json, tsconfig.json)

**Rationale**: Consistent use of Traditional Chinese in specifications and user-facing content ensures clear communication with the target audience (Taiwan/Hong Kong markets), reduces misunderstandings in requirements, and maintains professional standards for localized products.

## Development Workflow

### Feature Lifecycle

1. **Specification** (`/speckit.specify`):
   - Define User Stories with priorities (P1, P2, P3...)
   - Write acceptance scenarios in Given-When-Then format
   - Document functional requirements (FR-XXX) and success criteria (SC-XXX)
   - Output: `specs/[###-feature]/spec.md`

2. **Planning** (`/speckit.plan`):
   - Research technical approach and document in research.md
   - Define data models, APIs, and contracts
   - Document Technical Context (stack, dependencies, performance goals)
   - Run Constitution Check and justify any violations
   - Output: `specs/[###-feature]/plan.md`, research.md, data-model.md, contracts/, quickstart.md

3. **Task Generation** (`/speckit.tasks`):
   - Generate dependency-ordered task list grouped by User Story
   - Ensure each User Story can be implemented and tested independently
   - Mark parallel-executable tasks with [P]
   - Output: `specs/[###-feature]/tasks.md`

4. **Implementation** (`/speckit.implement`):
   - Execute tasks in dependency order
   - Write tests first (if required in spec/plan)
   - Commit after completing logical task groups
   - Validate each User Story independently at checkpoints

5. **Analysis** (`/speckit.analyze`):
   - Verify cross-artifact consistency (spec ↔ plan ↔ tasks)
   - Check constitution compliance
   - Identify gaps or quality issues
   - Mandatory before marking feature complete

### Git Workflow

- **Commit messages**: Follow Conventional Commits v1.0.0 (defined in CLAUDE.md)
  - Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
  - Scopes: auth, customer, designer, voucher, api, store, ui (adjust per project)
  - Breaking changes: Use `!` suffix or `BREAKING CHANGE:` footer
- **Branch naming**: `[issue-number]-feature-name` (e.g., `42-voucher-scanning`)
- **Pull requests**: Must include summary, test plan, and link to spec.md
- **Code review**: At least one approval required; all CI checks must pass

## Quality Gates

### Pre-Implementation Gates

- [ ] Constitution Check passes (complexity justified if violations exist)
- [ ] User Stories are independently testable with clear priorities
- [ ] Technical Context documented (stack, dependencies, performance goals, constraints)
- [ ] Testing strategy defined (contract/integration tests if required)

### Pre-Merge Gates

- [ ] All tasks in tasks.md completed
- [ ] Tests written and passing (if required per spec/plan)
- [ ] User Story acceptance scenarios validated
- [ ] Performance goals met (if documented in plan.md)
- [ ] Error handling and loading states implemented
- [ ] Code reviewed and approved
- [ ] CI pipeline green (linting, tests, build)
- [ ] No unexplained complexity violations

### Pre-Release Gates

- [ ] Cross-artifact analysis complete (`/speckit.analyze`)
- [ ] quickstart.md validated (if applicable)
- [ ] Documentation updated
- [ ] Stakeholder demo completed for P1 User Stories

## Governance

### Amendment Process

1. Propose amendment with rationale (why existing principle insufficient)
2. Document impact on existing templates (spec, plan, tasks)
3. Update constitution version following semantic versioning:
   - **MAJOR**: Backward-incompatible changes (removing/redefining principles)
   - **MINOR**: New principles or materially expanded guidance
   - **PATCH**: Clarifications, wording fixes, typo corrections
4. Update all dependent templates and command files
5. Commit with message: `docs: amend constitution to vX.Y.Z (description)`

### Compliance Review

- All PRs MUST verify adherence to Core Principles
- Complexity violations MUST be documented in plan.md "Complexity Tracking" section
- Constitution supersedes all other coding practices or conventions
- Any principle conflicts MUST be escalated before proceeding

### Runtime Guidance

- Agents (Claude Code, etc.) MUST consult CLAUDE.md for project-specific behavioral guidance
- CLAUDE.md provides communication style, task execution preferences, and MCP tool usage
- Constitution defines **what** is required; CLAUDE.md defines **how** to interact

---

**Version**: 1.1.0 | **Ratified**: 2025-11-04 | **Last Amended**: 2025-11-04

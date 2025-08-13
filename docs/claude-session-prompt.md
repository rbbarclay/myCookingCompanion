# Claude Code Session Startup Prompt

Copy and paste this prompt at the start of each Claude Code session to maintain project continuity and quality standards.

---

## 🎯 Project Context: Budget Bites Recipe App

I'm working on **Budget Bites**, a recipe app for young adults (18-28) living independently for the first time. The goal is helping them cook affordable, tasty, achievable meals while building cooking confidence.

### 📁 Key Project Files to Review:
- `docs/PRD.md` - Product Requirements Document
- `docs/project-status.md` - Current implementation status vs. PRD
- `docs/3-week-prototype-plan.md` - Development roadmap
- `docs/web-first-strategy.md` - Strategic approach (web app first, then mobile)

### 🚧 Current Development Phase:
**3-Week Web Prototype** - Building testable web app for user validation before mobile development

**Current Week:** [Specify: Week 1/2/3]  
**Current Focus:** [Specify current feature/component you're working on]

---

## 💻 Development Standards & Requirements

### Code Quality Standards:
- **TypeScript:** Strict typing, comprehensive interfaces
- **Security:** No secrets in code, secure authentication practices, input validation
- **Performance:** <2 second load times, optimized for mobile web
- **Accessibility:** Touch-friendly (44px+ targets), keyboard navigation, screen reader support
- **Testing:** Testable components, consider edge cases

### Architecture Principles:
- **Incremental Development:** Small, testable changes
- **Mobile-First:** Responsive design, PWA capabilities
- **Offline-First:** Local storage, service workers
- **User-Centric:** Focus on 18-28 demographic needs

### Tech Stack:
- **Frontend:** React + TypeScript + Tailwind CSS + Vite
- **State:** React hooks, Context API (no external state management yet)
- **Storage:** localStorage for prototype, IndexedDB for offline recipes
- **PWA:** Service workers, manifest.json, offline capability

---

## 📋 Session Workflow Requirements

### 1. Pre-Work Assessment (ALWAYS DO FIRST):
- Read current `docs/project-status.md` to understand project state
- Review the specific section of `docs/3-week-prototype-plan.md` for current week/day
- Understand what was completed in previous sessions

### 2. During Development:
- **Use TodoWrite tool** to track ALL tasks and progress
- **Focus on one feature at a time** - don't mix multiple features
- **Read only relevant files** to keep context manageable
- **Test incrementally** - verify each change works before moving on
- **Follow existing code patterns** and conventions

### 3. Post-Work Documentation (ALWAYS DO):
- **Update `docs/project-status.md`** with new features completed and current gaps
- **Mark completed items** in `docs/3-week-prototype-plan.md` with ✅
- **Document any architecture decisions** or changes to approach
- **Update any technical debt** or issues discovered

---

## 🔒 Security & Best Practices Checklist

Before implementing any feature, ensure:
- [ ] No hardcoded secrets or API keys
- [ ] Input validation on all user inputs
- [ ] Secure localStorage usage (no sensitive data)
- [ ] HTTPS in production
- [ ] Sanitize any user-generated content
- [ ] Proper error handling (don't expose internal errors)

---

## 🎯 Success Criteria for Each Session

### Code Quality:
- [ ] New code follows existing patterns and TypeScript standards
- [ ] All features work on both mobile and desktop
- [ ] No console errors or warnings
- [ ] Changes are incremental and testable

### Documentation:
- [ ] Project status document reflects current state
- [ ] Any new features/decisions are documented
- [ ] Prototype plan is updated with progress

### User Experience:
- [ ] Changes align with target demographic (18-28 budget-conscious)
- [ ] Mobile-first responsive design maintained
- [ ] Performance remains fast (<2 second loads)

---

## 🚀 Current Session Goal

**What I want to accomplish this session:**
[Fill this in each time - be specific about the feature/component/task]

**Expected outcome:**
[What should be working when session is complete]

**Files I expect to modify:**
[List the specific files you'll likely need to work with]

---

**Ready to start! Please read the current project status and let me know you understand the context before we begin coding.**
# Copilot Instructions for workfms-fe

## Project Overview
- **Framework:** Vue 3 (with `<script setup>` SFCs)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (see `src/tailwind.css`, `src/assets/styles/`, and `src/assets/styles/tailwind/`)
- **State Management:** Vuex modules in `src/stores/modules/`
- **Routing:** Vue Router (see `src/routers/` and `src/views/**/router.js`)
- **API Layer:** Centralized in `src/api/` with service classes for each domain (e.g., `cardService.js`, `projectService.js`)
- **i18n:** Language files in `src/i18n/`

## Key Patterns & Conventions
- **Component Structure:**
  - Pages in `src/views/`, reusable components in `src/components/`
  - Layouts in `src/views/layouts/`
  - Use `<script setup>` syntax for all new Vue components
- **API Usage:**
  - Use `src/api/instance.js` for axios instance configuration
  - All API calls should go through service files in `src/api/services/`
- **State:**
  - Use Vuex modules for domain separation (e.g., `moduleProjects.js`, `moduleWorkspaces.js`)
- **Routing:**
  - Route definitions are split by feature in `src/views/**/router.js` and aggregated in `src/routers/index.js`
- **Assets:**
  - Images in `src/assets/images/`, global styles in `src/assets/styles/`
- **Enums & Utils:**
  - Shared enums in `src/enums/`, utility functions in `src/utils/`

## Developer Workflows
- **Install dependencies:**
  ```sh
  npm install
  ```
- **Start dev server:**
  ```sh
  npm run dev
  ```
- **Build for production:**
  ```sh
  npm run build
  ```
- **Preview production build:**
  ```sh
  npm run preview
  ```

## Integration Points
- **External APIs:** All HTTP requests are managed via axios in `src/api/`
- **i18n:** Use `$t` for translations, add new keys to `src/i18n/en.js` and `src/i18n/vi.js`
- **Tailwind:** Customizations in `src/assets/styles/tailwind/`

## Examples
- **Add a new API service:** Duplicate an existing file in `src/api/services/`, register it in `src/api/services/index.js`
- **Add a new page:** Create a Vue file in `src/views/feature/`, add route in `src/views/feature/router.js`

## References
- See `README.md` for IDE setup and basic info
- See `vite.config.js` for build customization

---
_Keep instructions concise and up-to-date. Update this file if project structure or conventions change._

# Copilot Instructions for chatbot-frontend

## Project Overview
This is a React + TypeScript project bootstrapped with Vite. The codebase is organized for a simple chatbot frontend UI, with all source code in the `src/` directory. Vite is used for fast development and builds, and ESLint is configured for code quality.

## Architecture & Major Components
- **src/App.tsx**: Main application entry point. Sets up the overall UI structure.
- **src/components/**: Contains all UI components:
  - `ChatBot.tsx`: Main chatbot interface, manages message display and interaction.
  - `InputBox.tsx`: Handles user input and message submission.
  - `Message.tsx`: Renders individual chat messages.
- **src/assets/**: Static assets (e.g., images).
- **public/**: Publicly served files (e.g., icons).

## Data Flow & Patterns
- State is managed locally in React components using hooks (`useState`, `useEffect`).
- Components communicate via props; there is no global state management (e.g., Redux).
- Message sending and receiving logic is handled in `ChatBot.tsx` and `InputBox.tsx`.

## Developer Workflows
- **Start Dev Server**: `npm run dev` (uses Vite for hot module reload)
- **Build for Production**: `npm run build`
- **Preview Production Build**: `npm run preview`
- **Lint**: `npm run lint` (uses ESLint, config in `eslint.config.js`)
- **Type Checking**: `tsc --noEmit` (uses `tsconfig.app.json` and `tsconfig.node.json`)

## Project-Specific Conventions
- All React components use function components and TypeScript.
- CSS is colocated with components (e.g., `App.css`).
- No custom hooks or context providers are used; keep logic simple and local.
- Use Vite's module resolution and HMR features for fast iteration.
- ESLint config is customized for type-aware linting (see `eslint.config.js`).

## Integration Points & External Dependencies
- **Vite**: Handles dev server, build, and HMR (`vite.config.ts`).
- **React**: UI framework.
- **TypeScript**: Type safety.
- **ESLint**: Linting, with recommended and type-checked rules.
- No backend/API integration is present by default; add fetch/axios logic in `ChatBot.tsx` if needed.

## Examples of Patterns
- To add a new UI feature, create a new component in `src/components/` and import it in `App.tsx`.
- To update message handling, edit logic in `ChatBot.tsx` and `InputBox.tsx`.
- To change lint rules, update `eslint.config.js` and run `npm run lint`.

## Key Files
- `src/App.tsx`, `src/components/ChatBot.tsx`, `src/components/InputBox.tsx`, `src/components/Message.tsx`
- `eslint.config.js`, `vite.config.ts`, `tsconfig*.json`

## References
- See [README.md](../README.md) for more on ESLint and Vite setup.

---
If any conventions or workflows are unclear, please ask for clarification or provide feedback to improve these instructions.

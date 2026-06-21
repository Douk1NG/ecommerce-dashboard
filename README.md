# README

Welcome to Wedevs eCommerce Dashboard!

This repository contains the code for an eCommerce dashboard that provides interfaces to manage your ecommerce

## Features

## Getting Started

To get started with the eCommerce Dashboard, follow these steps:

1. Clone this repository.
2. Install the necessary dependencies by running `npm install`.
3. Start the server by running `npm start`.
4. Open your web browser and navigate to `http://localhost:3001`.
5. Copy `.env.local.example` to `.env.local` and set `DATABASE_URL` and `AUTH_SECRET`.

## License

This project is licensed under the [MIT License](LICENSE).

# Dependencies
- next-intl : for internationalization
- zod: for form validation
- shadcn: for almost all the components
- tailwindcss: for styling
- svgr: for icons
- tanstack/react-table: for tables
- react-currency-input-field: for currency input
- react-select: for select inputs
- use-debounce: for debouncing

# Todo
- Ajustar sistema de constantes
- Ajustar sistema de traducciones
- Cambiar sidebar por layout interno pero que mantenga navegación
- Cambiar composición de carpetas
- add error handling when file is not valid
- improve the currency config
- remove the use of any
- redesing types folder
- redesign the modules folder

# Reported bugs
- Cuando deselecciono una categoria en productos, los elementos seleccionados no se deseleccionan (se debe conservar la selección de filtros que prevalezca según el caso)

- Validacion de
- Imagen principal en editar no se adjunta

# Rules

- **Any / unknown types** are not allowed.
- `@ts-ignore` is not allowed; use `@ts-expect-error` instead and mention the reason.
- Do not define types inside components. All application types live in `src/shared/types/`, organized by domain subfolders.
- Never mix `interface` and `type` keywords; use only `type` in this codebase.
- No abbreviations (spell out names fully e.g. `utilities` instead of `utils` if making new folders, no `btn`, `msg`, `err`).
- Keep components small (under 150 lines). Extract distinct UI blocks into top-level functional components.
- Components must have their logic separated into custom hooks or utility functions.

# Project Structure

- **`app/`**: Next.js App Router folders representing route URLs and page templates.
- **`components/`**: Shared core UI and layout components (e.g., FormBuilder, DataTable, sidebar layout).
- **`src/`**:
  - **`features/`**: Domain-specific feature folders (e.g., `products`, `categories`, `filters`, `inventory`, `auth`).
    - Every feature has its own `components/` (e.g. `ProductTable.tsx`), actions (e.g. `productActions.ts`), schemas, and services.
  - **`shared/`**: Unified global utilities, library configurations, types, and constants.
    - **`types/`**: All application data types.
    - **`constants/`**: Translation keys and application namespace mappings.
    - **`lib/`**: Routing configuration and network helpers.
    - **`utils/`**: General helper utilities.

# How to Modify and Add Code

### 1. Adding/Modifying a Feature Page Component
Go to the respective feature folder under `src/features/<feature_name>/components/`. 
- To edit a form, open `src/features/<feature_name>/components/<FeatureName>Form.tsx`.
- Keep logic in a dedicated hook if it has local state or uses mutations.
- Import data types from `@/src/shared/types/<domain>`.

### 2. Modifying Services or Backend Actions
- **Database/API operations** are located under `src/features/<feature_name>/<featureName>Services.ts`.
- **Next.js Server Actions** for handling form submissions/mutations are located under `src/features/<feature_name>/<featureName>Actions.ts`.

### 3. Adding New Types or Constants
- Add new type definitions to `src/shared/types/<domain>.ts`.
- Add namespaces or translation references to `src/shared/constants/<domain>.ts`.
- Remember to run `npm run generate:translation-types` if translation keys are modified.
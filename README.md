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
5. Configure the .env.local file with the correct API URL and token.

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
- Controlled/Uncontrolled inputs on categories

# Rules
- Any type is not allowed
- @ts-ignore is not allowed, use @ts-expect-error instead and mention the reason
- types in components are not allowed, use types folder in the root of the project and when importing use the following syntax: import type { Type } from '@/types'
- use the following syntax for importing constants: import CONSTANTS from '@/lib/constants'

# To know
- route @auth is not implemented yet, but will be used for authentication without redirecting to a login page
- file default.tsx is important to nextjs hotreloading and is a copy of page.tsx (only neccesary for parallel routes)

# Project structure
- app
    - [locale]
    - favicon.ico
    - globals.css
        - categories
            - @sidebar
        - filters
            - @sidebar
        - products
            - @sidebar
        - inventory
        - orders
        - settings
- components:
  - form: form fields and builder
  - datatable: builder
  - ui: shadcn components
  - layout : layout components
  - nav: navbar component
  - icon: svg icon loader
- context: context providers
- hooks: custom hooks, the idea is to keep logic out of components
- docs: documentation about the project and consumption of the APIs
- i18n: internationalization
    - messages: translations
    - request: request functions
    - routing: routing functions
- lib: utility functions
- modules: business logic
    - actions
    - columns
    - components
    - constants
    - fields
    - schemas
    - services
    - tables
    - types
- types: type definitions
- scripts: only for development purposes
- public: static files such as images, icons, etc.
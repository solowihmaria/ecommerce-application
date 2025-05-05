<!-- TODO: update project name (ecommerce-application -> ?) -->
<!-- TODO: update project description -->
<!-- TODO: update scripts -->
<!-- TODO: update project structure -->
<!-- TODO: update Build With (technologies) -->
<!-- TODO: clarify testing tool used (Jest?) -->
<!-- TODO: update screenshot -->
<!-- TODO: decide between Features and Application Content -->

# 📦🛍️ ecommerce-application

This is a [training](https://github.com/rolling-scopes-school/tasks/tree/master/stage2/modules/final-task) single-page eCommerce application with user registration, product catalog, basket, and profile management. Developed in a team using TypeScript and React, integrated with CommerceTools to practice API usage, responsive design, and collaborative development.

Task description: [https://github.com/rolling-scopes-school/tasks/tree/master/stage2/modules/final-task]().

## 🧠 Features

- 🔐 User authentication (login/register)
- 🛒 Product catalog with categorization, sorting and search
- 📦 Order details
- 🛠️ User dashboard to manage their personal details and addresses
- 💻 Fully responsive (desktop-first)

## ✅ Application Content

- Login page
- Registration page
- Main page
- Catalog Product page
- Detailed Product page
- User Profile page
- Basket page
- About Us page

## 🚀 Getting Started

### Installation

```
git clone https://github.com/solowihmaria/ecommerce-application.git
cd ecommerce-application
```

### Dependencies

```
npm install
```

### Running the Project

```
npm run start-prod
```

## 🛠️ Development Tools

This project uses several developer tools to ensure code quality and consistency:

### 🧹 Linting & Formatting

- **ESLint** — analyzes code for potential issues and enforces consistent coding styles ([Unicorn](https://www.npmjs.com/package/eslint-plugin-unicorn) configuration is used).
- **Prettier** — automatically formats code for consistency.

```
# Lint the code
npm run lint

# Format the code
npm run format
```

Configuration files: [eslint.config.mjs](https://github.com/solowihmaria/ecommerce-application/blob/develop/eslint.config.mjs), [.prettierrc](https://github.com/solowihmaria/ecommerce-application/blob/develop/.prettierrc).

### 🧪 Testing

- **Jest** — used for unit and integration testing.

```
npm test
```

Test configuration can be found in [jest.config.js](https://github.com/solowihmaria/ecommerce-application/blob/develop/jest.config.js).

### 📜 NPM Scripts

| Command        | Description                                      |
|----------------|--------------------------------------------------|
| `start-dev`    | Start dev server using development config        |
| `start-prod`   | Start dev server using production config         |
| `build-dev`    | Build the project with development config        |
| `build-prod`   | Build the project with production config         |
| `format`       | Format source files in `./src` using Prettier    |
| `ci:format`    | Check formatting in `./src`        |
| `lint`         | Run ESLint on `./src`                            |
| `stylelint`    | Lint SCSS styles in `./src`                      |
| `prepare`      | Initialize Git hooks with Husky                  |
| `test`         | Run tests using Jest                             |

## 📂 Project Structure

```
ecommerce-application/
├── src/                   # Source code
│   ├── api/               # API request functions and services
│   ├── assets/            # Static assets (images, fonts, etc.)
│   ├── components/        # Reusable UI components
│   ├── features/          # Feature-specific modules
│   ├── interfaces/        # TypeScript interfaces and types
│   ├── pages/             # Top-level pages and views
│   ├── router/            # Application routing configuration
│   ├── store/             # State management
│   └── utilities/         # Helper functions and utilities
├── .lintstagedrc.json     # Lint-staged config
├── .prettierrc            # Prettier config
├── .stylelintrc.json      # Stylelint config
├── commitlint.config.js   # Commitlint config
├── eslint.config.mjs      # ESLint config 
├── jest.config.js         # Jest config
├── package.json           # Project metadata and scripts
└── README.md              # Project overview
```

## 🔧 Built With

- React + Redux Toolkit
- React Router
- Typescript
- Webpack
- ESLint + Prettier
- Husky
- Jest
- Commercetools API

## 👩‍💻 Team

- Maria Solowih: [@solowihmaria](https://github.com/solowihmaria)
- Violetta Batsura: [@violettab21](https://github.com/violettab21)
- Alexandra Sharovatova: [@asharovatova](https://github.com/asharovatova)

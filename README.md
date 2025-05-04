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

## 📸 Screenshot

![https://i.pinimg.com/1200x/8f/92/dc/8f92dcaef982a70963392191e9b82fc9.jpg](https://i.pinimg.com/1200x/8f/92/dc/8f92dcaef982a70963392191e9b82fc9.jpg)

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
npm run start
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

Configuration files: [.eslintrc](), [.prettierrc]().

### 🧪 Testing

- **Jest** — used for unit and integration testing.

```
npm test
```

To run tests in watch mode:

```
npm run test:watch
```

Test configuration can be found in [jest.config.js]().

### 📜 NPM Scripts

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `npm run dev`        | Start the development server     |
| `npm run lint`       | Run ESLint to check code quality |
| `npm run format`     | Format code using Prettier       |
| `npm test`           | Run tests using Jest             |
| `npm run test:watch` | Run tests in watch mode          |
| `npm run build`      | Build the project for production |

## 📂 Project Structure

```
ecommerce-application/
├── src/              # Source code
├── tests/            # Test files
├── public/           # Static assets
├── .eslintrc         # ESLint config
├── .prettierrc       # Prettier config
├── jest.config.js    # Jest config
├── package.json      # Project metadata and scripts
└── README.md         # Project overview

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

## 📬 Contact

- Maria Solowih: [@solowihmaria](https://github.com/solowihmaria)
- Violetta Batsura: [@violettab21](https://github.com/violettab21)
- Alexandra Sharovatova: [@asharovatova](https://github.com/asharovatova)

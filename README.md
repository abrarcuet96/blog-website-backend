# Blog Website Backend

Welcome to the **Blog Website Backend** repository. This is a robust and scalable backend application built to support a blog website. It provides essential functionalities such as user authentication, blog management, and error handling while following best practices in software development.

## Live Deployment
- **URL**: [To Be Added]

## Project Overview
The Blog Website Backend is a server-side application designed for managing blog-related operations such as creating, reading, updating, and deleting blog posts. It also includes user management with role-based access control.

### Admin Login Credentials
- **Email**: `abrarhaider@example.com`
- **Password**: `abrar123`

### Project Features
- User authentication and authorization (JWT-based).
- Blog management with CRUD operations.
- Admin dashboard for user management.
- Centralized error handling.
- Input validation using Zod.
- Modular and scalable architecture.

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Validation**: Zod
- **Authentication**: JWT
- **Styling**: Prettier and ESLint

---

## Getting Started
Follow these instructions to set up and run the project locally.

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- npm (Node Package Manager)
- MongoDB instance or access to a cloud-based MongoDB database

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/abrarcuet96/blog-website-backend.git
    cd blog-website-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```env
    NODE_ENV=development
    PORT=5000
    DATABASE_URL=mongodb+srv://<db_username>:<db_password>@cluster0.xyyby40.mongodb.net/<project-name>?retryWrites=true&w=majority&appName=Cluster0
    ```

4. Build the project:
    ```bash
    npm run build
    ```

5. Start the development server:
    ```bash
    npm run start:dev
    ```

6. For production, use:
    ```bash
    npm run start:prod
    ```

### Folder Structure
```
src
├─ app
│  ├─ builder
│  │  └─ QueryBuilder.ts
│  ├─ config
│  │  └─ index.ts
│  ├─ errors
│  │  ├─ AppError.ts
│  │  ├─ handleCastError.ts
│  │  ├─ handleDuplicateError.ts
│  │  ├─ handleValidationError.ts
│  │  └─ handleZodError.ts
│  ├─ interface
│  │  ├─ error.ts
│  │  └─ index.d.ts
│  ├─ middlewares
│  │  ├─ auth.ts
│  │  ├─ globalErrorHandler.ts
│  │  └─ validateRequest.ts
│  ├─ modules
│  │  ├─ blog
│  │  │  ├─ blog.constant.ts
│  │  │  ├─ blog.controller.ts
│  │  │  ├─ blog.interface.ts
│  │  │  ├─ blog.model.ts
│  │  │  ├─ blog.route.ts
│  │  │  ├─ blog.service.ts
│  │  │  └─ blog.validation.ts
│  │  └─ user
│  │     ├─ admin.route.ts
│  │     ├─ user.constant.ts
│  │     ├─ user.controller.ts
│  │     ├─ user.interface.ts
│  │     ├─ user.model.ts
│  │     ├─ user.route.ts
│  │     ├─ user.service.ts
│  │     ├─ user.utils.ts
│  │     └─ user.validation.ts
│  ├─ routes
│  │  └─ index.ts
│  └─ utils
│     ├─ catchAsync.ts
│     └─ sendResponse.ts
├─ app.ts
└─ server.ts
```

### Scripts
- **Start (Development)**: `npm run start:dev`
- **Start (Production)**: `npm run start:prod`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Fix Lint Issues**: `npm run lint:fix`
- **Format Code**: `npm run format`

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a pull request.

---

## License
This project is licensed under the ISC License. See the LICENSE file for details.

---

## Project Resources
- **GitHub Repository**: [Blog Website Backend](https://github.com/abrarcuet96/blog-website-backend)
- **Project Overview Video**: [To Be Added]

---

Thank you for checking out the Blog Website Backend! We hope you find this project helpful and insightful.

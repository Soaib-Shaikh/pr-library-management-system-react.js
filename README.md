
# PR Library Management System (React)

A simple library management web application built with React and Vite. This project provides a basic admin panel for managing books and a user-facing site for browsing and borrowing books.

## Deployment

Deployment link:- https://pr-library-management-system-react.vercel.app/

## Admin Login (Demo)

Use these demo credentials for local testing or a demo instance only. Do NOT use these in production.

- Email: soaib1002@gmail.com
- Password: 1002

If your app stores credentials in a backend, update the seed/admin user there. If authentication is mocked in the frontend for demo, replace with secure backend auth before production.


## Key Features

- Admin dashboard to add, view, and manage books
- User authentication (signup/login)
- Book listing by category and search
- User profile and my-books view
- Responsive UI for admin and user layouts

## Technologies

- Frontend: React, Vite
- Styling: SCSS, Bootstrap (assets in `public/plugins/bootstrap`)
- Charts & UI assets: Chart.js, FontAwesome
- Project structure: single-page React app in the `src` directory

## Quick Start (Development)

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open the app at the URL shown by Vite (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

## Project Structure (important files)

- `src/` — React source files
- `src/admin/` — Admin layouts and pages (Dashboard, AddBook, ViewBooks, AdminLogin)
- `src/users/` — User-facing layouts and pages (Home, Books, Profile, auth)
- `public/` — Static assets (CSS, JS, images, plugins)
- `vite.config.js` — Vite configuration

## Notes & Documentation

- The app uses a custom hook `src/hooks/useBooks.js` for book-related logic.
- SCSS sources are in `public/scss` and compiled to `public/assets/css` in the build flow.
- Update environment variables or backend API endpoints in the frontend code where applicable before deploying.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo
2. Create a feature branch
3. Open a pull request with a clear description of changes

## License

Add your license here (e.g., MIT). If none, state "All rights reserved".

## Contact

For questions, contact the project owner or open an issue in the repository.


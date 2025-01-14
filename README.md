# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# Beers and Breweries Project

This is a web application built with **React** (using TypeScript) that displays data about beers and breweries. The project leverages a backend built with **PostgreSQL** and **Express** for API services, and Axios is used for fetching data.

---

## Features

### General Features:
- **Brewery List**: View all breweries with their details.
- **Brewery Details**: View a specific brewery's information and its related beers.
- **Beer List**: Display all beers with filters, sorting, and search capabilities.
- **Beer Management**: Add, update, and delete beers directly from the application.

### Filtering and Sorting:
- **Filters**:
    - Search beers by name.
    - Filter beers by a minimum ABV (Alcohol By Volume).
- **Sorting**:
    - Sort beers by name, ABV, or price.
    - Toggle between ascending and descending order.

### Clean Code and Modularity:
- Separate utility functions for filtering and sorting.
- Reusable components for filters and sorting.
- API calls are centralized in an `api` folder for maintainability.

---

## Technology Stack

### Frontend:
- **React** with **TypeScript**
- **Axios** for HTTP requests
- **React Router** for navigation

### Backend:
- **Express** for API endpoints
- **PostgreSQL** for database management

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- PostgreSQL

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/beers-and-breweries.git
   cd beers-and-breweries
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Environment Variables**:
   Create a `.env` file in the root directory and configure the following:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   DATABASE_URL=your_postgresql_connection_string
   ```

4. **Run the Backend**:
   Navigate to the backend folder and start the server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

5. **Run the Frontend**:
   Start the React application:
   ```bash
   npm start
   ```

6. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## Folder Structure

```plaintext
├── src
│   ├── api
│   │   └── beersApi.ts
│   ├── components
│   │   ├── BeerList.tsx
│   │   ├── Filters.tsx
│   │   └── Sorting.tsx
│   ├── pages
│   │   ├── BeersPage.tsx
│   │   └── BreweryDetailPage.tsx
│   ├── utils
│   │   └── beersUtils.ts
│   └── App.tsx
├── public
│   └── index.html
└── package.json
```

---

## API Endpoints

### Backend Endpoints
- **GET /api/beers**: Fetch all beers
- **GET /api/breweries**: Fetch all breweries
- **GET /api/breweries/:id**: Fetch details for a specific brewery
- **GET /api/breweries/:id/beers**: Fetch beers for a specific brewery
- **POST /api/beers**: Add a new beer
- **PUT /api/beers/:id**: Update an existing beer
- **DELETE /api/beers/:id**: Delete a beer

---

## Future Improvements
- Add authentication for managing beers and breweries.
- Enhance UI with better styling and responsiveness.
- Implement pagination for beer and brewery lists.
- Add analytics to track user interactions.

---

## Contributing
Contributions are welcome! Feel free to open a pull request or submit issues.

---

## License
This project is licensed under the MIT License.



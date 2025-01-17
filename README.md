# 🍺 Designing User Interfaces for Craft Beer Exploration

## Project Overview

This application is an intuitive and visually appealing user interface for craft beer enthusiasts. It allows users to explore a **catalog of craft beers** and view details about the breweries that produce them. Built with **React.js** and **TypeScript**, the app interacts seamlessly with a REST API to provide a smooth and user-friendly experience.

---

## 🌟 Main Features

### 1. **Craft Beer Catalog**
- A page displaying all the available craft beers in a grid.
- Quick information about each beer, including:
    - **Name**
    - **Description**
    - **Abv**
    - **Price**
    - **Brewery Name**
    - **Location**

[//]: # (    - **Image**)
- Detailed beer pages with comprehensive information:
    - Description
    - Alcohol by Volume (ABV)
    - Price

### 2. **Brewery Directory**
- A dedicated page listing all breweries with their main details (name, location).
- The ability to view beers produced by a specific brewery.

### 3. **Beer Details Page**
- A detailed beer page with complete information about a beer:
    - Name
    - Brewery information
    - Alcohol by Volume (ABV)
    - Price
    - Description
    - Options to edit or delete a beer

### 4. **Brewery-Specific Beer List**
- A page dedicated to showing all beers associated with a specific brewery.
- Additional information about the brewery.

### 5. **Advanced Search and Filters**
- A dynamic search bar with autocomplete suggestions to quickly find a specific beer.
- Filters by name, price, alcohol content, and sorting

### 6. **Favorites**
- A dedicated page where users can view and manage their favorite beers.

---

## 🛠️ Technologies Used

- **React.js + TypeScript**: Built with modern functional components and hooks.
- **React Router**: For navigation between pages.
- **Context API**: To manage global state (like beers, favorites, etc.).
- **Axios**: For REST API calls.
- **CSS**: Fully responsive and styled for an elegant, mobile-first design.
- **Responsive Design**: Ensures the application works smoothly across all screen sizes.

---

## 🚀 Features Implemented

- View a catalog of craft beers with detailed pages for each beer.
- List all breweries and view beers by a specific brewery.
- Search for beers dynamically and filter results.
- **Bonus**:
    - Add, update, or delete beers via a modal.
    - Mark beers as favorites and manage them on a dedicated page.

---

## 🌐 How to Run the Project



### Prerequisites:
1. You have to clone and run this projects related to the PostgreSQL database and the Api:

    [zythologue-api-jn](https://github.com/2024-devops-alt-dist/zythologue-api-jn)

    [zythologue-jn](https://github.com/2024-devops-alt-dist/zythologue-jn)

2. Ensure you have **Node.js** and **npm** installed.
3. Clone the repository:
   ```bash
   git clone git@github.com:2024-devops-alt-dist/zythologue-front-jn.git
   ```
4. Navigate to the project directory:
    ```bash
    cd zythologue-front-jn
    ```
   
### Steps to Run:
1. Install the dependencies:
    ```bash
    npm install
    ```
2. Run in dev mode
    ```bash
    npm run dev
    ```
3.	Open your browser and go to:
    ```
    http://localhost:5173/
    ```
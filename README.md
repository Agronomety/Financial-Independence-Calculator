# Financial Independence (FI) Calculator

This project is a simple web application that helps users calculate the estimated time it will take to reach financial independence based on their savings habits and investment growth expectations. It features a React frontend that communicates with a Node.js/Express backend API.

## Overview

The calculator takes the following inputs:

* **Monthly Investment:** The amount of money saved and invested each month.
* **Annual Growth Rate:** The expected average annual return on investments (as a percentage).
* **Initial Investment (Optional):** Any starting capital already invested.
* **Target Amount (Optional):** The desired total investment amount to reach FI. If not provided, it defaults to 25 times the calculated annual *expenses* (implicitly derived from annual *savings* using the 25x rule, a common FIRE movement guideline).

It calculates and displays:

* The estimated number of **years** until the target amount is reached.
* The calculated **target amount** (either user-defined or the default 25x).
* The projected **final amount** achieved at that time.
* The **total amount contributed** through savings over the period.
* The **total investment growth** earned.
* **Milestones** showing the projected investment value at specific year intervals (1, 5, 10, 15, 20, 25, 30, 40, 50 years).

## Features

* Calculates time to financial independence using compound growth.
* Handles optional initial investment amounts.
* Allows users to set a custom target amount or uses a default based on the 25x rule.
* Provides a breakdown of total contributions vs. investment growth.
* Shows projected investment milestones over time.
* Simple, user-friendly web interface built with React.
* Backend API built with Node.js and Express for handling calculations.
* Basic input validation on the backend.

## Technologies Used

* **Frontend:**
    * React
    * JavaScript (ES6+)
    * CSS
    * Fetch API (for backend communication)
* **Backend:**
    * Node.js
    * Express.js
    * CORS (Cross-Origin Resource Sharing middleware)
* **Language:** JavaScript

## Prerequisites

* Node.js (includes npm) - Version 14.x or higher recommended. Download from [nodejs.org](https://nodejs.org/).
* Git (for cloning the repository)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd financial-independence-calculator
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend  # Go back up and into the frontend directory
    npm install
    ```

## Running the Application

You need to run both the backend server and the frontend application simultaneously.

1.  **Start the Backend Server:**

    * Navigate to the `backend` directory:

    * Start the server:
        ```bash
        npm run dev
        ```

2.  **Start the Frontend Application:**

    * Open a *new* terminal window/tab.

    * Navigate to the `frontend` directory:

    * Start the React development server:
        ```bash
        npm start
        ```
    * This will usually open the application automatically in your default web browser at `http://localhost:3001` (or another available port if 3001 is busy).

3.  **Access the Calculator:**
    * Open your web browser and navigate to the address provided by the `npm start` command for the frontend (usually `http://localhost:3001`).
    * Use the form to input your financial details and click "Calculate".


## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository. If you'd like to contribute code, please fork the repository and submit a pull request.

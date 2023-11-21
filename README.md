# UserDataManager-422 

This project is a React-Firebase application that allows users to manage user data. It includes features such as adding new users, editing existing user information, and deleting users.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add new users with details like name, email, age, gender, country, and state.
- Edit existing user information.
- Delete users from the system.
- View a list of all users with their details.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/react-firebase-user-management.git
    ```

2. **Change into the project directory:**

    ```bash
    cd react-firebase-user-management
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up Firebase:**

   - Create a new Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Obtain your Firebase configuration (apiKey, authDomain, projectId, etc.).
   - Create a `.env` file in the project root and add your Firebase configuration:

        ```env
        REACT_APP_FIREBASE_API_KEY=your-api-key
        REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
        REACT_APP_FIREBASE_PROJECT_ID=your-project-id
        REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
        REACT_APP_FIREBASE_APP_ID=your-app-id
        ```

## Usage

1. **Start the development server:**

    ```bash
    npm start
    ```

2. **Open your browser and navigate to [http://localhost:3000](http://localhost:3000).**

3. **You should see the React-Firebase User Management App in action!**

## Technologies Used

- React
- Firebase (Firestore, Hosting)
- HTML/CSS
- JavaScript

## Folder Structure

```markdown
|-- public/
|-- src/
    |-- components/
    |-- context/
    |-- firebase/
    |-- pages/
    |-- App.js
    |-- index.js
|-- .env
|-- .gitignore
|-- package.json
|-- README.md

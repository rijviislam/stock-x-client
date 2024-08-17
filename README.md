## Getting Started

To get a local copy of this project up and running, follow these steps:

### Prerequisites

- Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- Ensure you have your Firebase and MongoDB configurations ready.

### Installation

1. **Clone the repository** or **download the ZIP file**:
   - **Clone**:
     ```bash
     https://github.com/rijviislam/stock-x-client.git
     ```
   - **Download ZIP**:
     - Click on the green "Code" button at the top right of this repository.
     - Select "Download ZIP".
     - Extract the downloaded ZIP file.

2. **Navigate to the project directory**:
   ```bash
   cd your-repository
3. **Install the necessary dependencies:**
     ```bash
     npm install
4. **Set up Firebase and MongoDB configurations:**
- Create a firebaseConfig.js file in the src/config directory (if not already present)
- Add your Firebase configuration
  ```bash // src/config/firebaseConfig.js
  const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
export default firebaseConfig;

3. **Run the project::**
     ```bash
     npm install
6. **Environment Variables**:

Make sure to create a .env file at the root of your project if any environment variables are needed for Firebase or other services. Example:

     
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain


**Additional Notes:**
For Firebase authentication and storage, ensure that your Firebase project is properly set up in the Firebase console and that all necessary APIs are enabled.
MongoDB connection will likely be managed by the backend, so ensure the backend server is configured and running properly.

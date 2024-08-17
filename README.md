## Project Setup

To get a local copy of this project up and running, follow these steps:

### Prerequisites

- Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- Ensure you have your Firebase and MongoDB configurations ready.

### Installation

1. **Clone the repository** or **download the ZIP file**:
   - **Clone**:
     ```bash
     https://github.com/rijviislam/techSpotter-client.git
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

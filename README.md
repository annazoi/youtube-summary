## YouTube Transcript Summarizer

### A web application that leverages AI to generate concise summaries of YouTube video transcripts. Users can log in using their Google accounts and input a YouTube video URL to receive an AI-generated summary of the video's content.

### Features

- AI-Powered Summaries: Automatically generates a summary of the transcript for any given YouTube video.

- Google Authentication: Users can log in securely using their Google accounts.

- User-Friendly Input: Simply provide a YouTube video URL to get a summary.

- Seamless Experience: Built with modern web technologies for fast and responsive performance.

### Technologies Used

- Frontend: React, TypeScript, Ionic

- Backend: Express

- Cloud Services: Firebase (Authentication, Database, Hosting)

### How It Works

The user logs in via Google authentication.

After successful login, the user provides a YouTube video URL.

The backend processes the video transcript and uses AI to generate a summary.

The summary is displayed to the user in a clean and intuitive interface.

## Getting Started

### Prerequisites

- Node.js (v14 or later)

- npm or yarn

- Firebase account for authentication and database setup

### 1. Clone this repository:

https://github.com/annazoi/youtube-summary.git

### 2. Navigate to the project directory

### 3. Set up Firebase:

- Create a Firebase project.

- Enable Google authentication.

- Set up Firestore or Realtime Database as needed.

- Update the Firebase configuration in the project.

### 4. Install dependencies:

### CLIENT

- `npm install`

- `npm install -g @ionic/cli`

### Run

- `ionic serve`

### env

- VITE_API_URL = your_api_url
- VITE_FIREBASE_API_KEY= your_firebase_api_key
- VITE_FIREBASE_AUTH_DOMAIN= your_firebase_auth_domain
- VITE_FIREBASE_PROJECT_ID= your_firebase_project_id
- VITE_FIREBASE_STORAGE_BUCKET= your_firebase_storage_bucket
- VITE_FIREBASE_MESSAGING_SENDER_ID= your_firebase_messaging_sender_id
- VITE_FIREBASE_APP_ID= your_firebase_app_id
- VITE_FIREBASE_MEASUREMENT_ID= your_firebase_measurement_id

### SERVER

- `npm install`

### Run

### Nodemon:

- `npm start`

### env

- DB_CONNECTION = your_db_connection
- DG_KEY = your_dg_key
- OPEN_AI_API_KEY= your_open_ai_api_key

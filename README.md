# Python Tutor Quiz App

## Overview

Welcome to the **Python Tutor Quiz App**, a web application designed to help students practice Python through dynamic and high-difficulty quizzes. The app generates Python programming quizzes tailored to a student's class level and evaluates their knowledge with multiple-choice questions.

Once the quiz is completed, the user can review their score and retake the quiz to further improve their knowledge. The quiz content is generated using Google's generative AI, which ensures that the quizzes are challenging and relevant.

### Deployed App Link:
You can access the deployed application here:  
[Python Tutor Quiz App](https://skc-rudraksh-tutor.vercel.app/)

## Features

- **Dynamic Quiz Generation**: The app generates 10 high-difficulty multiple-choice questions based on the student's input class level.
- **Instant Feedback**: Once the user answers each question, the app shows whether the answer is correct or incorrect, and highlights the correct answer.
- **Score Calculation**: After finishing the quiz, the user's score is displayed out of 10, allowing them to evaluate their performance.
- **Retake Quiz Option**: After completing the quiz, users can retake it without having to reload the page, giving them an opportunity to improve their score.
- **Responsive Design**: The app works seamlessly across devices and screen sizes, ensuring a smooth user experience on both mobile and desktop.

## How It Works

1. **User Input**: The user enters their class level (e.g., "Intermediate" or "Advanced") into the input field.
2. **Quiz Generation**: Upon submitting the form, the app generates a quiz with 10 multiple-choice questions related to Python programming, using Google's Generative AI.
3. **Answering Questions**: The user answers the questions, and after each question, the app provides immediate feedback on whether the answer was correct.
4. **Viewing Score**: At the end of the quiz, the user sees their total score, which is the number of correct answers.
5. **Retake Option**: After reviewing the score, users can retake the quiz by clicking the "Retake Quiz" button.

## Setup and Usage

### Prerequisites

Before running the app locally, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Steps to Run the App Locally

1. **Clone the Repository**:  
   Clone this repository to your local machine using the following command:
   ```bash
   git clone https://github.com/your-username/python-tutor-quiz.git
   ```

2. **Install Dependencies**:  
   Navigate to the project directory and install the required dependencies:
   ```bash
   cd python-tutor-quiz
   npm install
   ```

3. **Set Your API Key**:  
   To use the Generative AI model, you'll need a valid API key.  
   - Open the `key.js` file.
   - Replace the placeholder `API_KEY` with your actual API key. For example:
     ```javascript
     export const API_KEY = "YOUR_GOOGLE_GENERATIVE_API_KEY";
     ```

4. **Start the Application**:  
   Run the app locally by starting the development server:
   ```bash
   npm start
   npm run build
   ```


## Project Structure

- **`src/`**: Contains all the React components and app logic.
- **`key.js`**: Stores the API key needed to access Google's Generative AI service.
- **`public/`**: Contains the `index.html` file and static assets (e.g., images, icons).
- **`package.json`**: Manages project dependencies and scripts.


## Changing the API Key
If you wish to use your own API key, simply update the `key.js` file:
1. Open `key.js`.
2. Replace the placeholder with your own API key.



## Technologies Used

- **React**: JavaScript library for building the user interface.
- **Google Generative AI**: Powers the dynamic quiz generation based on the provided class level.
- **Vercel**: Deployed the app using Vercel for seamless hosting.


## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Here's how you can contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request for review.

---


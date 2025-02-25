# Python Tutor 

Welcome to the **Python Tutor Chatbot App**, a web application designed to help students learn Python through interactive lessons and quizzes. The app features an AI-powered chatbot that assists students in learning Python programming concepts, answering questions, and guiding them through lessons.

Once the lesson is completed, users have the option to take a dynamic Python quiz tailored to their class level. The app also features a high-difficulty quiz that is generated using Google's generative AI to test the user's Python knowledge.

Additionally, the app lets users choose between two AI chatbots: **Charlie** and **Cooler Charlie**, each offering a unique way to learn Python. After selecting a chatbot, users can interact with the AI to get lessons and explanations.


### Deployed App Link:
You can access the deployed application here:  
[Python Tutor Quiz App](https://skc-rudraksh-tutor.vercel.app/)

## Features

- **AI Chatbots for Learning**: Choose between **Charlie** or **Cooler Charlie**, two chatbots that help explain Python concepts and provide interactive lessons. You can select **Charlie** to learn more about Python concepts and get personalized lessons.
- **Dynamic Quiz Generation**: The app generates 10 high-difficulty multiple-choice questions based on the student's input class level.
- **Instant Feedback**: Once the user answers each question, the app shows whether the answer is correct or incorrect, and highlights the correct answer.
- **Score Calculation**: After finishing the quiz, the user's score is displayed out of 10, allowing them to evaluate their performance.
- **Retake Quiz Option**: After completing the quiz, users can retake it without having to reload the page, giving them an opportunity to improve their score.
- **Responsive Design**: The app works seamlessly across devices and screen sizes, ensuring a smooth user experience on both mobile and desktop.

  

## How It Works

1. **Select Chatbot**: Choose between **Charlie** or **Cooler Charlie** for your interactive Python lessons.
2. **Interactive Learning**: The chatbot will provide explanations, answer questions, and guide you through Python programming concepts.
3. **Quiz Generation**: After completing the lesson with the chatbot, you can generate a quiz by selecting your class level (e.g., "Intermediate" or "Advanced").
4. **Answer Questions**: The quiz consists of 10 multiple-choice questions. Answer each question, and the app will provide instant feedback.
5. **Viewing Score**: After the quiz, you’ll see your total score out of 10.
6. **Retake Quiz**: After reviewing your score, you can retake the quiz to improve your performance.


## Setup and Usage

### Prerequisites

Before running the app locally, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Steps to Run the App Locally

1. **Clone the Repository**:  
   Clone this repository to your local machine using the following command:
   ```bash
   git clone https://github.com/Rudyshhh/skc-Rudraksh-tutor.git
   ```

2. **Install Dependencies**:  
   Navigate to the project directory and install the required dependencies:
   ```bash
   cd skc-Rudraksh-tutor
   npm install
   ```

3. **Set Your API Key**:  
   To use the Generative AI model, you'll need a valid API key.  
   - Open the `key.js` file.
   - Replace the placeholder `API_KEY` with your actual GEMINI API key. For example:
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

## Switching Between Chatbots
To switch between Charlie and Cooler Charlie, users can select either of the two AI chatbots before starting their lesson. Once a chatbot is selected, it will guide users through a Python lesson. After completing the lesson, users will have the option to take the quiz.

## Technologies Used

- **React**: JavaScript library for building the user interface.
- **Google Generative AI**: Powers the chatbot and dynamic quiz generation based on the provided class level.
- **Vercel**: Deployed the app using Vercel for seamless hosting.


## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Here's how you can contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request for review.

---


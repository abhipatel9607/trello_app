<!-- @format -->

# Trello App

A Trello-like task management application with Firebase authentication and Chakra UI.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## Introduction

This project is a Trello-inspired task management application built with React. It incorporates Firebase for user authentication and Cloud Firestore as a database service. The UI is designed using the Chakra UI library.

## Features

- User authentication and authorization with Firebase
- Board creation, view, and manipulation
- List and card management within a board

## Live Demo

- You can see project directly from here
  [Live Demo](https://trello-app.netlify.app/)

## Getting Started

### Prerequisites

Before running the project, ensure you have the following prerequisites installed:

- Node.js
- npm
- Firebase account for authentication and Firestore database setup

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abhipatel9607/trello_app.git
   ```

2. Change the repository:

   ```bash
   trello_app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

Visit the deployed application or run it locally. Create an account, log in, and start managing your tasks on boards.

## Project Structure

The project structure follows:

- `/src`: Source code for the React application.
- `/components`: React components for different parts of the application.
- `/googleSingIn`: Firebase authentication service.
- `/helper`: Utility functions and configurations.
- `/routes`: React Router configuration.
- `/public`: Public assets and HTML template.

## Technologies Used

- React
- Chakra UI
- Firebase (Authentication, Firestore)

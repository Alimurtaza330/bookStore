# Bookstore App

## Overview

Welcome to the Bookstore App! This is a full-stack web application where users can browse, and manage courses related to books. To access the courses section, users must log in. The app ensures a secure login process, requiring email verification. If a user logs out without verifying their email, they must verify their email to log in again.

## Features

- **User Authentication**: Sign up, log in, and log out functionality.
- **Email Verification**: Users must verify their email before accessing certain features.
- **Responsive Design**: A user-friendly interface accessible on various devices.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Email Service**: Nodemailer
- **Authentication**:  bcrypt
- **Form Handling**: react-hook-form

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- MongoDB

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/bookstore-app.git
    cd bookstore-app
    ```

2. **Backend Setup**:
    1. Navigate to the backend directory:
        ```bash
        cd backend
        ```
    2. Install dependencies:
        ```bash
        npm install
        ```
    3. Create a `.env` file in the `backend` directory with the following variables:
        ```plaintext
       
        GMAIL=your_gmail_address
        GMAIL_PASSWORD=your_gmail_password
        GMAIL_PORT=587
        HOST=smtp.gmail.com
       
        ```
    4. Start the backend server:
        ```bash
        npm start
        ```

3. **Frontend Setup**:
    1. Navigate to the frontend directory:
        ```bash
        cd ../frontend
        ```
    2. Install dependencies:
        ```bash
        npm install
        ```
    3. Start the frontend server:
        ```bash
        npm start
        ```

### Usage

1. **Sign Up**: Create a new account by providing a username, email, and password.
2. **Email Verification**: Check your email for a verification link and verify your email address.
3. **Log In**: Log in using your email and password.
4. **Courses**: Access and manage courses in the Courses section.

### Routes

- **Home**: `/`
- **Courses**: `/course` (Protected, requires login)
- **Contact Us**: `/contact`
- **About Us**: `/about`
- **Sign Up**: `/signup`
- **Forget Password**: `/forget`

### API Endpoints

- **Sign Up**: `POST /signup`
- **Log In**: `POST /login`
- **Verify Email**: `GET /verify`
- **Forget Password**: `POST /forget_password`

## Contributing

We welcome contributions! Please fork the repository and submit pull requests.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Thanks to the developers and open-source community for their invaluable contributions and resources.

## Contact

For any inquiries or feedback, please contact [alimurteza330@gmail.com](mailto:alimurteza330.com).

Steps for Running the App Locally:

    Install Dependencies:
        Run npm install to install all the dependencies listed in package.json.
    Start the Development Server:
        Run npm run dev to start the Vite development server for the front-end.
    Start the Backend Server:
        Run npm run serve to start the json-server mock API on port 5000. This will simulate a backend for user and password data.
    Start the App:
        Run npm run start to start both the front-end and back-end servers concurrently.

        # Password Manager

## Project Overview

This project is a Password Manager developed as part of the COMP1004 module. The application provides a secure and user-friendly way to manage passwords for different online accounts. The Password Manager allows users to store, manage, and retrieve their passwords with a focus on security and encryption. 

The application features:

- User authentication (Login/Register)
- Secure password storage (encrypted)
- Password strength validation
- User-friendly interface for managing passwords
- Password categorization and search functionality
- Data backup and recovery options

## Project Vision and Background

With the increasing number of online accounts requiring unique passwords, many users resort to weak or reused passwords, compromising security. This Password Manager offers a centralized, secure solution for storing passwords, ensuring that users create strong passwords and protecting sensitive data through encryption.

The goal is to make password management more secure and convenient for individuals looking to protect their online identities.

## Project Features

- **Login/Register System**: User authentication to securely manage and associate passwords with unique users.
- **Encryption**: Strong encryption to protect user data, ensuring passwords are never stored in plaintext.
- **Password Management**: Add, edit, delete, and categorize passwords to organize and easily access stored data.
- **Password Strength Validator**: Ensures users create strong passwords that meet industry-standard criteria.
- **Backup and Recovery**: Protects user data from loss by offering backup and recovery features.

## Technologies Used

- **Java**: For backend functionality and processing.
- **HTML & CSS**: For frontend structure and styling.
- **JSON**: For storing password data temporarily.
- **GitHub**: For version control and deployment.

## Development Methodology

The project follows an **Agile methodology**, enabling iterative development, flexibility in meeting goals, and frequent improvements. Regular sprint meetings are held for feedback and feature adjustments. The development process focuses on continuous testing to ensure that key features work as expected.

## Installation and Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/OkyanusAlbas/COMP1004SPA.git
    ```

2. Open the project directory:

    ```bash
    cd COMP1004SPA
    ```

3. Open the `index.html` file in your browser to view and interact with the application.

## Testing

During development, the application underwent multiple testing phases. Key features tested included:

- **Login/Register**: Ensured the user can register and log in successfully.
- **Password Strength**: Tested password validation, ensuring weak passwords are rejected.
- **Password Storage**: Tested the ability to store and retrieve passwords.
- **Routing**: Validated that navigation between pages (login/register) is seamless.

**Known Issues:**

- Passwords were stored in plaintext in the JSON file due to technological limitations, which poses a security risk.
- Login and session management have routing issues, preventing proper user session management.

## Limitations

Due to technological constraints, encryption techniques such as AES or bcrypt were not implemented in this version of the project. This limitation resulted in insecure password storage, which violates best practices for password managers. 

Future improvements will focus on integrating proper encryption for password storage, implementing secure session management, and refining the user interface based on feedback.

## Future Improvements

- **Implement AES Encryption**: To ensure passwords are stored securely.
- **Session Management**: To handle user sessions more securely and prevent login issues.
- **Enhance UI/UX**: Provide clearer visual cues, feedback messages, and improve overall navigation.
- **Strengthen Password Generation**: Implement a randomly generated password feature for user convenience.
- **Performance Testing**: Conduct load testing to ensure scalability as more passwords are added.

## Conclusion

This project aims to provide users with a simple, secure solution for managing their passwords. Although limited by technological and time constraints, the application successfully meets the basic requirements for password management. Future versions will focus on addressing the security flaws and enhancing the user experience to meet modern standards for password management tools.

## References

- [bcrypt](https://en.wikipedia.org/wiki/Bcrypt)
- [UK GDPR](https://ico.org.uk/for-organisations/data-protection-and-the-eu/data-protection-and-the-eu-in-detail/the-uk-gdpr/)
- [W3Schools](https://www.w3schools.com)
- [React Documentation](https://reactjs.org/docs/getting-started.html)

## License

This project is licensed under the MIT License.

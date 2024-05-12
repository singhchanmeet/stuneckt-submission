# Stuneckt Internship Assignment Submission (Microblogging API)

This is a simple RESTful API for a microblogging platform like Twitter or LinkedIn. It allows users to create posts, follow other users, and retrieve posts made by themselves or other users.

## Setup

### Prerequisites

- Node.js installed on your machine.
- TypeScript installed globally on your machine
- MongoDB installed locally or a remote MongoDB instance.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/singhchanmeet/stuneckt-submission
   ```

2. Navigate to the server directory:

   ```bash
   cd server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and define the following variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/microblogging
   JWT_SECRET=your_secret_key
   ```

   Adjust the `MONGODB_URI` and `JWT_SECRET` values as per your setup.

5. Compile the Typescript to Javascript:

   ```bash
   npm run build
   ```
6. Start the server:

   ```bash
   npm run start
   ```

## API Endpoints

### Auth

- **POST /auth/signup**
  - Create a new user account.
  - Request Body:
    ```json
    {
      "username": "example_user",
      "email": "user@example.com",
      "password": "your_password",
      "name": "User Name"
    }
    ```
- **POST /auth/login**
  - Log in an existing user.
  - Request Body:
    ```json
    {
      "username": "example_user",
      "password": "your_password"
    }
    ```

### Users

- **GET /user/profile**
  - Retrieve the profile of the authenticated user.

- **POST /user/follow/:usernameToFollow**
  - Follow a user by their username.

- **PUT /user/update**
  - Update the details of the authenticated user.
  - Request Body:
    ```json
    {
      "username": "new_username",
      "email": "new_email@example.com",
      "name": "New Name"
    }
    ```

### Posts

- **POST /posts/create**
  - Create a new post.
  - Request Body:
    ```json
    {
      "content": "This is a sample post content."
    }
    ```
- **GET /posts/all**
  - Retrieve all posts.
- **GET /posts/user/:userId**
  - Retrieve posts by a specific user.
  - Replace `:userId` with the user's ID.

## Error Handling

The API handles errors gracefully and returns appropriate HTTP status codes along with error messages in JSON format.


API Node TypeScript
This is a Node.js API project built using TypeScript, Express, and PostgreSQL with Knex.js. The project includes authentication and validation mechanisms, leveraging JWT for authentication and Yup for schema validation.


Table of Contents

        Installation
        Configuration
        Scripts
        API Endpoints
        Middleware
        Database
        License

Installation
To get started, clone the repository and install the necessary dependencies:

    To get started, clone the repository and install the necessary dependencies:

Configuration
Create a .env file in the root directory and add the following environment variables:

    DATABASE_URL=your_database_url
    DATABASE_HOST=your_database_host
    DATABASE_NAME=your_database_name
    DATABASE_USER=your_database_user
    DATABASE_PASSWORD=your_database_password
    DATABASE_PORT=your_database_port
    JWT_SECRET=your_jwt_secret

Scripts
Use the following scripts to manage the project:
    
    npm run dev: Start the development server using nodemon.
    npm run build: Build the project for production.
    npm start: Start the production server.
    npm run migrate:latest: Run the latest database migrations.
    npm run seed: Seed the database with initial data.


API Endpoints
Authentication


    POST /entrar: Sign in a user.
    POST /cadastrar: Sign up a new user.
    GET /logout: Logout a user (requires authentication).
    Cities
    GET /cidades: Get all cities (requires authentication).
    POST /cidades: Create a new city (requires authentication).
    GET /cidades/:id: Get a city by ID (requires authentication).
    PUT /cidades/:id: Update a city by ID (requires authentication).
    DELETE /cidades/:id: Delete a city by ID (requires authentication).
    
People

    GET /pessoas: Get all people (requires authentication).
    POST /pessoas: Create a new person (requires authentication).
    GET /pessoas/:id: Get a person by ID (requires authentication).
    PUT /pessoas/:id: Update a person by ID (requires authentication).
    DELETE /pessoas/:id: Delete a person by ID (requires authentication).
    
Middleware:

ensureAuthenticated: Middleware to ensure the user is authenticated before accessing certain routes.

Database
This project uses PostgreSQL as the database. Knex.js is used for query building and migration management.

Development Configuration:

    export const development: Knex.Config = {
      client: 'pg',
      migrations: {
        directory: path.resolve(__dirname, '..', 'migrations')
      },
      seeds: {
        directory: path.resolve(__dirname, '..', 'seeds')
      },
      connection: {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        ssl: { rejectUnauthorized: false },
      }
    };

Test Configuration:

    export const test: Knex.Config = {
      ...development,
      connection: ':memory:',
    };

Production Configuration:

    export const production: Knex.Config = {
      ...development,
    };

License
This project is licensed under the MIT License.

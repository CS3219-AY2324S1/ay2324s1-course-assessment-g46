[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

# PeerPrep - CS3219 G46

> [!NOTE]
> This is the instructions to set up and run the PeerPrep services for local development/testing for Assignments grading

## Pre-requisites

- Ensure you have Docker installed on your machine. If not, follow this [link](https://docs.docker.com/desktop/install/mac-install/) to install Docker Desktop.
- Ensure you have followed the instructions in the **Set up** section bellow before proceeding further

## Set up environment variables

Please proceed to download secrets files submitted on Canvas to set up environment variables for the services.

### For assignment purposes

#### Question service (`assignment/question-service`)

- Create a `.env` file in the root directory of the `assignment/question-service` folder
- Copy the contents of the question-service-env file from into the `.env` file
- Your file should look like this:

```
MONGODB_URL=
JWT_SECRET=
```

#### User service

- Create a `.env` file in the root directory of the `assignment/user-service` folder
- Copy the contents of the user-service-env file from into the `.env` file
- Your file should look like this:

```
SUPABASE_URL=
SUPABASE_KEY=
JWT_SECRET=
```

> [!IMPORTANT]
> For any missing environment variables, please contact the team to retrieve the secrets


### For project purposes

#### Question service (`project/question-service`)

- Create a `.env` file in the root directory of the `project/question-service` folder
- Copy the contents of the question-service-env file from into the `.env` file
- Your file should look like this:

```
SUPABASE_URL=
SUPABASE_KEY=
JWT_SECRET=
```

#### User service

- Create a `.env` file in the root directory of the `project/user-service` folder
- Copy the contents of the user-service-env file from into the `.env` file
- Your file should look like this:

```
SUPABASE_URL=
SUPABASE_KEY=
JWT_SECRET=
```

> [!IMPORTANT]
> For any missing environment variables, please contact the team to retrieve the secrets

## Run

### Run the services

- In the root of the `project` folder, run `docker-compose up -d --build`

- Visit the following endpoints for respective services:

  - Frontend: http://localhost:3000
  - Question service: http://localhost:8888
  - User service: http://localhost:5100
  - Matching service: http://localhost:8080
  - Collaboration service: http://localhost:8181

- To stop the services, run `docker-compose down` (This step is crucial to ensure that the services are stopped properly when installing new dependencies)

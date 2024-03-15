# Ilant Book Search Application

### Description

Brought to you by the Ilant Health team, this application offers users the ability to query the Google Books API and display results using an
intuitive and visually appealing interface. You can use this repository to deploy your own instance of this application or simply visit the
following [link](https://duckduckgo.com) to get started immediately!

### Technology

This application uses both a front-end and back-end component. The Backend is a Python FastAPI application packaged within a Docker container.
The front-end is a Next.js application styled using TailwindCSS.

### Local deployment

#### Back-end

1. Ensure that you have Docker installed on your system
2. Navigate to the ilant_books/backend folder
3. In a terminal, execute the following command to build the Docker image  
`docker build -t ilant_books .`
4. Execute the following command to run the newly built Docker image  
`docker run --name ibooks -p 80:80 ilant_books`
5. If this succeeds you should be able to access the documentation by visiting the following link in your browser  
[localhost/docs](http://0.0.0.0/docs).

#### Front-end

1. Ensure that you have Node.js and NPM installed on your system
2. Navigate to the ilant_books/frontend/nextjs-books folder
3. In a terminal, execute `npm i` to install all of the project requirements
4. Execute `npm run dev` to run the development server to serve the files locally
5. At this point you should be able to access the application at [localhost:3000](http://0.0.0.0:3000)

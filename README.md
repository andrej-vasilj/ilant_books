# Ilant Book Search Application

### Description

Brought to you by the Ilant Health team, this application offers users the ability to query the Google Books API and display results using an
intuitive and visually appealing interface. You can use this repository to deploy your own instance of this application or simply visit the
following [link](https://ilantbooks.initializedsoul.com/) to get started immediately!

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

##### Unit tests
To execute the unit tests, first build the Docker container and then run it with the following command  
`docker run --name ibooks ilant_books pytest`

#### Front-end

1. Ensure that you have Node.js and NPM installed on your system
2. Navigate to the ilant_books/frontend/nextjs-books folder
3. In a terminal, execute `npm i` to install all of the project requirements
4. Execute `npm run dev` to run the development server to serve the files locally
5. At this point you should be able to access the application at [localhost:3000](http://0.0.0.0:3000)

In order to build static assets for remote deployment one may simply execute `npm run build` and the
static files will be available in the 'out' directory.

### Known issues

1. Pagination does not currently work well due to a bug in the Google Books API itself! The problem is that every time
the startIndex is incremented to get the subsequent entries, the number of totalItems returned by the Google API response keeps
incrementing substantially (by thousands of entries). There is a [StackOverflow link](https://stackoverflow.com/questions/76799691/google-books-api-erroneously-incrementing-totalitems-returned/78161879#78161879) for this issue.
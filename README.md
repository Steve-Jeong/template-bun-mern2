# MERN Stack Docker

### Create this README.md file in the home directory

### Initialize git repository. Always do git operation in the home directory.

### Make .gitignore
  ```
    node_modules
    .env
  ```

### API-1. Create api directory and make initial Dockerfile in the api directory

1) In the home directory, 'git checkout -b 01-api-1'

1) Dockerfile
   ```Dockerfile
      FROM oven/bun
      USER bun
      WORKDIR /app
   ```

2) Then, in the api terminal run
   ```bash
      docker build -t api .
   ```

3) Enter into the docker container
   ```bash
      docker run -it -v $(pwd):/app --name api-1 api sh   
   ```

4) In the container, type `whoami`, it will show `bun` username since we put `USER bun` in the second line of the Dockerfile. Without this, the user will be `root`. `USER bun` will ensure to prevent user permission issues while coding afterwards.

5) Continue setup in the container.
    ```
      bun init 
      bun add express
    ```

6) Make index.js file
   ```javascript
      const express = require('express')
      const app = express()

      app.get('/', (req, res)=>{
         res.status(200).json({
            status: 'success',
            message: 'Hello World'
         })
      })

      app.listen(3000, ()=>{
         console.log('app is listening on port 3000')
      })
   ```

7) Add the following "dev" script in the package.json file
   ```diff
      "scripts": {
   +     "dev": "bun run --watch index.js"
      },
   ```

8) If you followed correctly up to this point, if you run `bun run dev` in the container, it will show the `bun` is listening on port 3000. Press Ctrl+C to stop `bun`

9) Exit from the container




### API-2. Update the Dockerfile in the api directory to the final version
1) Dockerfile
   ```diff
      FROM oven/bun
      USER bun
      WORKDIR /app
   +  COPY --chown=bun:bun package*.json ./
   +  RUN bun install
   +  COPY --chown=node:node ./ ./
   +  CMD [ "bun", "run", "dev" ]
   ```

   From above `--chown=bun:bun` changes the permission of the files from the root user to `bun` user.

2) Add .dockerignore file.
   ```.dockerignore
      node_modules
   ```

3) Build the api docker image again. 
   ```bash
      docker build -t api .
   ```

4) Run the container, and test if it is working
   ```bash
      docker run -d -p 3000:3000 -v $(pwd):/app -v /app/node_modules --name api-1 api
      curl localhost:3000
   ```

   It should show `json message` on the cli.
   


### Docker Compose 
1) Make docker-compose.yml in the project home directory. Set api into docker-compose.yml
   ```docker-compose.yml
      version: '3.9'
      services:
         api:
            build: 
               context: ./api
            ports:
               - 3000:3000
            volumes:
               - ./api:/app
               - /app/node_modules
   ```

2) Run the container, and test if it is working
   ```bash
      docker compose up -d --build
      curl localhost:3000
   ```

   It should show `json message` on the cli.



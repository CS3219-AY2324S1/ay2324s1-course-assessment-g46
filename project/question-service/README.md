# Question service

> API implemented by ExpressJS and MongoDB

## 1. Data format

```
{
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  complexity: {
    type: String,
    required: true,
    enum: ["Easy", "Medium", "Hard"],
  },
}
```

## 2. Available API calls

> All links start with `http://localhost:8888/questions`

|       Command       |  Method  | Link | Body                                    |
| :-----------------: | :------: | :--- | --------------------------------------- |
|  Get all questions  |  `GET`   | /    |                                         |
|  Get one question   |  `GET`   | /:id |                                         |
|  Add one question   |  `POST`  | /    | Question                                |
|  Update a question  | `PATCH`  | /:id | Question _(with fields want to update)_ |
| Remove one question | `DELETE` | /:id |                                         |

## 3. How to use?

- Run `npm run dev` to start server using **nodemon**. Make sure port `8888` is available.

You will see

```
[nodemon] 3.0.1
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
Server is listening on port 8888
Connected to Database
```

- Test if the server is receiving requests in Postman

`READ localhost:8888/questions` should returns a list of questions

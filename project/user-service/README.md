# User service

> API implemented by ExpressJS and Supabase

## 1. Data format

Profile table: 
```
(
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE
  full_name text NOT NULL 
  goal text 
)
```


## 2. Available API calls

> All links start with `http://localhost:5100/user`

|       Command       |  Method  | Link | Bearer token needed? | Body                                    |
| :-----------------: | :------: | :--- | --------------------------------------- |
|  Sign up new account |  `POST`   | /signup | no  | email, password, full_name        |
|  Login               |  `POST`   | /login |  no | email, password                   |
|  Log out             |  `POST`   | /logout | no |                                   |
|  Retrieve profile    |  `GET`    | /profile | yes |                                   |
|  Update profile      |  `PUT`    | /profile | yes | full_name, goal                   |
|  Delete account      |  `DELETE` | /profile |  yes |                                 |
|  Get user attempts history  |  `GET`  | /attempts   | yes |                                  |
|  Get user latest attempts history  |  `GET`  | /attempts/latest | yes |                                  |
|  Insert a new user attempt  |  `POST`  | /attempts   | yes | question_id                      |



## 3. How to use?

- Run `node index.js` to start server. Make sure port `5100` is available.

You will see

```
> Ready on http://localhost:5100
```

- Test if the server is receiving requests in Postman

`POST localhost:5100/user/login` with registered email, password field should return a token for you to access other user services later. 

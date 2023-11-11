# Code Execution Service

Code execution runs on Judge0, an open-source code execution service
[Judge0 github](https://github.com/judge0/judge0)

# How To Run

```
    cd judge0-v1.13.0
    docker-compose up -d db redis
    sleep 10s
    docker-compose up -d
    sleep 5s
```

Code Execution service will be available on port `2358`

# API Calls Used

POST `/submissions/?base64_encoded=false&wait=true`

example body

```
{
    "language_id": 70,
    "source_code": "print('hello')"
}
```

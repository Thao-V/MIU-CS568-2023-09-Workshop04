# Workshop 4: Added Fetch (axios) to WS3
## Following the previous workshop, you can copy the project to this directory (please do not copy node_modules since it is automatically created by running the command `npm install`)
## Assume that you have following restful APIs
1. POST /login: To log in. The body of this request should contain the email and password. If this information is valid, the backend will return {success: true, token: <string>}. Otherwise, it returns {success: false, error: <message>}.
2. POST /tasks: To add a new task. The body of this request should contain the task's information. You should attach the header "authorization" with the scheme "Bearer <token>" (this token is returned when you logged in successfully). If successful, the body return {success: true, data: <new task>}. Otherwise, it return {success: false, error: <message>}
3. PUT /tasks/{id}: To add a new task. The body of this request should contain the task's information. You should attach the header "authorization" with the scheme "Bearer <token>" (this token is returned when you logged in successfully). If successful, the body return {success: true}. Otherwise, it return {success: false, error: <message>}
4. GET /tasks: To get all tasks. You should attach the header "authorization" with the scheme "Bearer <token>" (this token is returned when you logged in successfully). If successful, the body return {success: true, data: <list of tasks>}. Otherwise, it return {success: false, error: <message>}
5. DELETE /tasks/{id}: To delete an existing task. You should attach the header "authorization" with the scheme "Bearer <token>" (this token is returned when you logged in successfully). If successful, the body return {success: true}. Otherwise, it return {success: false, error: <message>}
## Please implement the following features
1. Using the above API to modify the previous workshop 3
2. After logging in successfully, the token should be saved in the localstorage. When you start the app again, if the token is existing in the localstorage, navigate to the Home page instead of the Login Page.
3. Provide a button in the Home page for logging out. You should clear the localstorage to show the Login page again.
## There is an existing user in the backend you can use to login: `{email: "test@miu.edu", password: "123"}`
## Style your app using the regular CSS

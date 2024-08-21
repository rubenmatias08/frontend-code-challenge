Steps to set up backend:

1. Clone to repo
2. Run: npm install
3. Create a .env file and populate with the following:

TZ=UTC<br/>
PORT=3333<br/>
HOST=localhost<br/>
LOG_LEVEL=info<br/>
APP_KEY=qFlFnOw4MsxVSTajLUuothM9m_oPu7jp<br/>
NODE_ENV=development

4. Create a tmp folder in the root directory
5. Run: node ace migration:run
6. Run: node ace db:seed
7. Run: npm run dev

The development server for the back end should be up and running. Do not make any changes here. Create a separate directory for the front end. If you try to access thes '/users' endpoint, you should see the seeded user provided.

**Endpoints**<br/>

Fetch all users</br>
GET /users

Create new user</br>
POST /users</br>
Expected body: { fullName: string, email: string, password: string }

Get user by id</br>
GET /users/:id

Delete user</br>
DELETE /users/:id

Get orders by user id</br>
GET /orders/:id

Create order</br>
POST /orders</br>
Expected body: { userId: string, orderDate: date, product: string }

Delete order</br>
DELETE /orders/:id

Get order by id</br>
GET /order/:id

Update order</br>
PUT /order/:id/edit</br>
Expected body: { orderDate: date, product: string }

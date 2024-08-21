Steps to set up backend:

1. Clone to repo
2. Create a .env file and populate with the following:

TZ=UTC<br/>
PORT=3333<br/>
HOST=localhost<br/>
LOG_LEVEL=info<br/>
APP_KEY=qFlFnOw4MsxVSTajLUuothM9m_oPu7jp<br/>
NODE_ENV=development

3. Create a tmp folder in the root directory
4. Run: node ace migration:run
5. Run: npm run dev

The development server for the back end should be up and running. Do not make any changes here. Create a separate directory for the front end.

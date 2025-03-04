## Install packages
```bash
cd backend
npm install
cd ..
cd frontend
npm install
```

## Database credential
Make sure to change change **backend/.env** according to your db.

```javascript
DATABASE_URL=postgresql:my_user:my_password@localhost:5432/database
JWT_SECRET=your jwt secret

```

## How to launch backend
Inside **backend** folder, run:
```bash
node server.js
```

## How to run frontend
Inside front end, run:
```bash
npm run dev
```

The signup and login page are at **localhost:3000/login(signup)**
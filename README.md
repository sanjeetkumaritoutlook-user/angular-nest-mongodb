## Project architecture
full-stack CRUD app with Angular → NestJS → MongoDB
```
my-app/
│
├── frontend/          → Angular app
│   ├── src/
│   ├── angular.json
│   └── package.json
│
├── nest-proxy/        → NestJS backend (CRUD + MongoDB)
│   ├── src/
│   ├── main.ts
│   └── package.json
│
└── README.md
```

## setup

inside nest-proxy/
```
nest new .

npm install @nestjs/mongoose mongoose
```

if nest already not installed
```
npm i -g @nestjs/cli
nest new .
```

When it asks for the package manager — choose npm or yarn, whichever you prefer.

```
nest-proxy/
  ├─ src/
  │   ├─ app.controller.ts
  │   ├─ app.module.ts
  │   ├─ app.service.ts
  │   └─ main.ts
  ├─ tsconfig.json
  ├─ package.json
  ├─ ...
```

npm run start:dev

Your NestJS API will be available at:

👉 http://localhost:3000/users

connect to MongoDB Atlas, and create a simple CRUD API for, say, users.

Create a CRUD module

```
nest g resource items
```

create .env file

```
MONGODB_URI= connection_string from mongodb atlas
PORT=3000
```

```
npm install @nestjs/config
```

POSTMAN or bruno API testing

http://localhost:3000/items


inside frontend:

If you prefer to use the traditional NgModules structure, add the --no-standalone flag:

npx @angular/cli@17 new front-end --no-standalone

ng new front-end --no-standalone

ng generate environments

ng generate environments --development --staging

Data Engineer

Data warehouse (structured)

Date Lake (unstructured)

Data Analyst

Data Scientist


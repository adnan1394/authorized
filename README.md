## Description

A basic RBAC implementation using NestJs and ObjectionJs 

## Installation
Update the env variable for `DATABASE_URL` for your respective db

```bash
$ npm install
$ npm run migrate
$ npm run seed
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Routes

```bash
# Public routes
POST auth/login
POST auth/signup

# Admin (globalManager) only routes
GET users
GET users/:userId
POST users
PUT users/:userId
DELETE users/:userId
PUT users/:userId/roles/:roleId
DELETE users/:userId/roles/:roleId

GET groups
GET groups/:groupId
POST groups
PUT groups/:groupId
DELETE groups/:groupId

GET collections
GET collections/:collectionId
POST collections
PUT collections/:collectionId
DELETE collections/:collectionId

GET items
GET items/:itemId
POST items
PUT items/:itemId
DELETE items/:itemId

# Common Routes 
* Users with role `manager` can only CRUD resources belonging to their own group
* Users with role `regular` can only Read resources belonging to their own group

GET roles
GET roles/:roleId
POST roles
PUT roles/:roleId
DELETE roles/:roleId

GET groups/:groupId/collections
GET groups/:groupId/collections/:collectionId
POST groups/:groupId/collections
PUT groups/:groupId/collections/:collectionId
DELETE groups/:groupId/collections/:collectionId

GET groups/:groupId/collections/items
GET groups/:groupId/collections/:collectionId/items/:itemId
POST groups/:groupId/collections/items
PUT groups/:groupId/collections/:collectionId/items/:itemId
DELETE groups/:groupId/collections/:collectionId/items/:itemId

```

## TODOs for later :)

```bash
 * Implement interfaces to validate output of APIs
 * Clean-up common guard implementation to make it DRY
```
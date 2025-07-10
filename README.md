# 📚 Leaflet - Full-Stack Book Discovery Platform

A full-fledged application for discovering new books, favoriting, and ranking books that you have already read. It's a library and a tracker all-in-one!

### 🎬 Demo

![Demo of the app](assets/demo.gif)

## 🚀 Main Features

### Discover New Books

- **Real-time Search**: Debounced search with 500ms delay for optimal performance
- **Infinite Scroll**: Intersection Observer API implementation
- **Open Library Integration**: Leveraging OpenLibrary API for access to millions of books

### Backend Architecture

- **RESTful API**: Express.js controllers and routes
- **MongoDB Integration**: Mongoose ODM with schema design and indexing
- **Constraints**: Preventing duplicate favorites and reviews per user

## 🛠️ Tech Stack

- **Next.js** with App Router and TypeScript
- **Tailwind CSS**
- **Lucide React** iconography

- **Node.js** with Express.js framework
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **Axios** for HTTP client operations

## 🎯 Design Considerations

### Infinite Scroll

- Uses OpenLibrary's offset parameter for pagination
- Returns structured response with pagination info
- Frontend tracks page state and appends new books
- Automatically loads more when scrolling near bottom
- Supports both search and browsing with infinite scroll

### Database

The original plan was to use a PostgresSQL database, however, oweing to the json structure of the api calls, it is far for efficient to use
a nosql database such as MongoDB

Advantages:

Document-based: Perfect for storing book data (which is already JSON from OpenLibrary API)
Flexible schema: Easy to add new fields without migrations
Great for user-generated content: Reviews, favorites, reading lists
MongoDB Atlas: Fully managed cloud service (like AWS but easier to set up)
Excellent Node.js integration: Mongoose makes it very developer-friendly

Moongoose ORM is particularly useful for:
- Useful for data modeling, schema enforcement, model validation, and general data manipulation
- Mongoose forces a semi-right schma

- Express route handler signatures expect functions that return void or a Promise resolving to void and not a response object - Doing so will result in an error of ` Argument of type '(error: any, req: Request, res: Response, next: NextFunction) => express.Response<any, Record<string, any>>' is not assignable`


## Run Steps

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm run dev
```

## 📈 To-Do

- Finish user authentication with JWT tokens
- Finish deployment
- Add search filters and sorting
- Add suggested algorithm
- Chat or social features

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

**Dev Tools:**

- **ESLint** with Next.js configuration
- **PostCSS** for CSS processing
- **React DevTools** compatible hooks

## 📊 Backend Structure

### REST API

```typescript
// API endpoints
GET    /books       
GET    /books/search
GET    /books/:id  
POST   /user/favorites
DELETE /user/favorites/:bookId
POST   /user/reviews
```

### Database Schema

```javascript
// Optimized indexing for performance
favoriteSchema.index({ userId: 1, bookId: 1 }, { unique: true });
reviewSchema.index({ userId: 1, bookId: 1 }, { unique: true });
reviewSchema.index({ bookId: 1 });
```

## 🎯 Design Considerations

- **Debounced Input**: Prevents excessive API calls during typing
- **Query Caching**: Efficient data management with pagination state
- **Auto-scroll**: Smooth navigation to results when user searches
- **Lazy Loading**: Images and components are loaded on demand to reduce server load


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

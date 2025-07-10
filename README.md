# 📚 Leaflet - Full-Stack Book Discovery Platform

A full-fledged web application for discovering and managing books. Features real-time search, user favorites, and a comprehensive review system.

### 🎬 Demo

![Demo of the app](assets/demo.gif)

## 🚀 Key Features & Technical Highlights

### Advanced Search & Discovery

- **Real-time Search**: Debounced search with 500ms delay for optimal performance
- **Infinite Scroll**: Intersection Observer API implementation for seamless pagination
- **Open Library Integration**: Leveraging OpenLibrary API for access to millions of books

### User Experience & Interface

- **Responsive Design**: Mobile-first approach with Tailwind CSS utility classes
- **Interactive Components**: Hover effects, animations, and smooth transitions

### Backend Architecture

- **RESTful API**: Clean separation of concerns with Express.js controllers and routes
- **MongoDB Integration**: Mongoose ODM with proper schema design and indexing
- **Data Validation**: Comprehensive input validation and error handling
- **CORS Configuration**: Proper cross-origin resource sharing setup

### Database Design

- **Optimized Schemas**: Efficient document structure with strategic indexing
- **Unique Constraints**: Preventing duplicate favorites and reviews per user
- **Timestamp Tracking**: Automatic createdAt/updatedAt fields for audit trails

## 🛠️ Technical Stack

**Frontend Technologies:**

- **Next.js 15** with App Router and TypeScript
- **React 19** with custom hooks and context management
- **Tailwind CSS 4** for utility-first styling
- **Radix UI** components for accessibility
- **Lucide React** for consistent iconography

**Backend Technologies:**

- **Node.js** with Express.js framework
- **TypeScript** for type safety across the stack
- **MongoDB** with Mongoose ODM
- **Axios** for HTTP client operations

**Development Tools:**

- **ESLint** with Next.js configuration
- **PostCSS** for CSS processing
- **React DevTools** compatible hooks

## 📊 Architecture Highlights

### API Design

```typescript
// RESTful endpoints with proper HTTP methods
GET    /books                    // Paginated book discovery
GET    /books/search             // Search with query parameters
GET    /books/:id               // Individual book details
POST   /user/favorites          // Add to favorites
DELETE /user/favorites/:bookId  // Remove from favorites
POST   /user/reviews            // Submit book reviews
```

### Database Schema

```javascript
// Optimized indexing for performance
favoriteSchema.index({ userId: 1, bookId: 1 }, { unique: true });
reviewSchema.index({ userId: 1, bookId: 1 }, { unique: true });
reviewSchema.index({ bookId: 1 });
```

## 🎯 Advanced Features

- **Debounced Input**: Prevents excessive API calls during typing
- **Query Caching**: Efficient data management with pagination state
- **Auto-scroll**: Smooth navigation to results on search
- **Lazy Loading**: Images and components are loaded on demand to reduce server load
- **Code Splitting**: Next.js automatic code splitting for optimal bundle size
- **SEO Optimization**: Proper meta tags and semantic HTML structure

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/leaflet.git
cd leaflet

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
- Advanced search filters and sorting
- Recommendation algorithm based on user preferences
- Social features and book clubs

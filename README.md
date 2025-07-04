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

Will be using mongoose as an ORM - Object relational mapping

- Useful for data modeling, schema enforcement, model validation, and general data manipulation
- Mongoose forces a semi-right schma

## Valuable Lessons Learned

- Express route handler signatures expect functions that return void or a Promise resolving to void and not a response object - Doing so will result in an error of ` Argument of type '(error: any, req: Request, res: Response, next: NextFunction) => express.Response<any, Record<string, any>>' is not assignable`

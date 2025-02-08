# Image Vault API

A secure Node.js REST API for image management with role-based access control, built using Express and MongoDB. The API provides authentication, image upload/deletion capabilities, and admin-specific functionalities.

## Features

- User authentication and authorization using JWT
- Role-based access control (Admin and User roles)
- Secure password encryption using bcryptjs
- Image upload with Multer and Cloudinary integration
- Admin-only image management capabilities
- Sorting and pagination for image retrieval
- Password update functionality
- Secure image deletion (only by admin who uploaded)

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcryptjs for password hashing
- Multer for file upload handling
- Cloudinary for image storage
- dotenv for environment variable management

## Project Structure

```
├── config/
│   └── cloudinary.js
├── controllers/
│   ├── auth-controller.js
│   └── image-controller.js
├── helpers/
│   └── uploadToCloudinary.js
├── middleware/
│   ├── admin.middleware.js
│   ├── auth.middleware.js
│   └── upload.middleware.js
├── models/
│   ├── Image.js
│   └── User.js
├── routes/
│   ├── admin-routes.js
│   ├── auth-routes.js
│   ├── home-routes.js
│   └── image-routes.js
├── uploads/
├── .env
├── server.js
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/image-vault-api.git
cd image-vault-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/change-password` - Update password

### Image Management
- `POST /api/image/upload` - Upload image (Admin only)
- `GET /api/image/all` - Get all images with pagination and sorting
- `DELETE /api/image/:id` - Delete image (Admin only, uploader only)

## Query Parameters for Image Retrieval

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sortBy`: Field to sort by (default: 'createdAt')
- `sortOrder`: Sort order ('asc' or 'desc', default: 'desc')

Example:
```
GET /api/image/all?page=1&limit=10&sortBy=createdAt&sortOrder=desc
```

## Authentication

The API uses JWT for authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer your_jwt_token
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

# Ecommerce Website

## Introduction
This project is a full-fledged Ecommerce Website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It encompasses both a user-friendly interface for customers to explore and purchase products, and a robust admin portal for efficient management of products, orders, and user accounts. Authentication mechanisms powered by JSON Web Tokens (JWT) ensure secure login and authorization processes.

## Tech Stack
- **Frontend:**
  - React.js: A popular JavaScript library for building interactive user interfaces.
  - Redux: A predictable state container for managing application state.
  - React Router: A routing library for React.js applications.
  
- **Backend:**
  - Node.js: A versatile JavaScript runtime environment for building server-side applications.
  - Express.js: A minimalist web application framework for Node.js, enabling robust API development.
  - MongoDB: A flexible NoSQL database for storing and managing application data.
  - Mongoose: An elegant MongoDB object modeling tool for Node.js, providing schema-based solutions.
  - Multer: A middleware for handling multipart/form-data, used for uploading images.
  
- **Authentication:**
  - JSON Web Tokens (JWT): A compact and self-contained method for securely transmitting information between parties as a JSON object.
  - bcrypt.js: A library for hashing passwords, enhancing security during authentication processes.

## Features
### User Portal: https://shopper-seven-flame.vercel.app/
- Seamless browsing: Users can easily navigate through products by category or perform specific searches.
- Product details: Detailed information including images, descriptions, and pricing is provided for each product.
- Cart management: Users can add products to their cart and smoothly proceed to checkout for purchase.
- Personalization: User authentication and authorization mechanisms ensure personalized experiences based on user roles and permissions.

### Admin Portal: https://shopper-admin-bay.vercel.app/
- Product management: Admins can effortlessly add, edit, and delete products as needed.
- Add new products: Admins can add products with details such as name, image, price, and other relevant information. Multer middleware is utilized for handling image uploads.
- View product list: Admins have access to a comprehensive list of all products, allowing for easy management and editing as needed.

## Author
This project was meticulously crafted by Anubhav Saxena.

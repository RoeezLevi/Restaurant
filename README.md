Restaurant Management Application

Overview
This application is designed to manage products, allowing users to search, view, and add new products. It is built using Angular and Angular Material for a responsive and user-friendly interface.

Setup Instructions
Prerequisites
Node.js (v14 or higher)
Angular CLI (v12 or higher)
Installation
Clone the repository:
```bash
git [clone https://github.com/your-repo/product-management-app.git](https://github.com/RoeezLevi/Restaurant.git)
cd .\restaurant-backend\

Install dependencies:
npm install

Run the application:

The application will be available at http://localhost:4200.

Design Choices
Component Structure
IndexComponent: The main component that handles the product list and search functionality.
ProductTableComponent: Displays the list of products in a table format.
ProductSearchComponent: Provides a search input for filtering products.
ProductNewComponent: A dialog component for adding new products.
Services
ProductService: Handles API calls to fetch, create, and manage products.
Angular Material
MatTable: Used for displaying the product list in a tabular format.
MatDialog: Used for the product creation dialog.
MatFormField and MatInput: Used for the search input field.
MatIcon: Used for icons within the application.
Change Detection
ChangeDetectorRef: Manually triggers change detection to ensure the product table updates when a new product is added.
Running the Application
Start the development server:

The application will be available at http://localhost:4200.

Add a new product:

Click the "Add" button to open the product creation dialog.
Fill in the product details and submit.
The product list will automatically update to include the new product.
Search for products:

Use the search input to filter products by name or other attributes.

# Finance Management System

Small business financial data management system created as a final study project.

The application allows users to manage projects, track income and expenses, view financial summaries and filter data by project and time period.

## Technologies

- Next.js
- TypeScript
- React
- Prisma ORM
- MySQL
- NextAuth
- Tailwind CSS

  ## Main Features

- User registration and authentication
- Project creation and management
- Income and expense tracking
- Dashboard with financial KPI summaries
- Filtering by project
- Filtering by selected month or full period
- Server-side data fetching using Next.js App Router
- User-specific data filtering based on session

  ## Dashboard

  The dashboard displays:
- Total income
- Total expenses
- Balance
- Number of projects

The data can be filtered by project and by selected time period.

 ## Screenshots
 
 ### Register page
 <img width="1435" height="679" alt="image" src="https://github.com/user-attachments/assets/7ff55769-9082-416f-b5ae-6da9b08803f1" />
 
 ### Dashboard
 <img width="1148" height="863" alt="image" src="https://github.com/user-attachments/assets/95eb07b1-52db-489a-8069-634b50cf9850" />

 ### Income Page
 <img width="1175" height="581" alt="image" src="https://github.com/user-attachments/assets/7ab0275c-58c3-4917-b2fb-bd18f2f8dc0b" />

 ### Create Income
 <img width="1365" height="921" alt="image" src="https://github.com/user-attachments/assets/233d4f2a-6a70-422c-b852-eb353c466b58" />

 


## Database Models

The project uses a relational MySQL database with Prisma ORM.

Main models:

- User
- Project
- Transaction
- Category
- TransactionType

Transactions are connected to projects and categories. This allows the system to calculate income, expenses and balance for each user.


  ## Project Structure

``` text
app/              # Next.js App Router pages and API routes
components/       # Reusable UI and dashboard components
lib/              # Authentication, Prisma and query logic
prisma/           # Prisma schema and database models
types/            # TypeScript types

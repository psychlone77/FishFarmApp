# Fish Farm Management System
## Overview
This repository contains a Fish Farm Management System, which includes both backend and frontend components. The backend is built using ASP.NET Core and Entity Framework Core, while the frontend is developed using React, TypeScript, and Vite.

## Tech Stack
### Backend
- ASP.NET Core
- Entity Framework Core
- SQL Server
- AutoMapper
### Frontend
- React
- TypeScript
- Vite
- Material-UI
- React Query
- React Hook Form
- Zod
## Project Structure

```
.github/
    workflows/
.gitignore
Backend/
    API/
        appsettings.Development.json
        appsettings.json
        Controllers/
        Program.cs
    API.sln
    BLL/
        /Services
        ...
    DAL/
        /Repositories
Frontend/
    .env.local
    index.html
    package.json
    public/
    src/
    ...configs
```
## ER Diagram
![image](https://github.com/user-attachments/assets/b280236a-93c7-46fd-831c-e2fc2e81c43a)

## Getting Started
### Prerequisites
- .NET 8.0 SDK
- Node.js
- MSSQL Server
### Backend Setup
- Navigate to the API directory.
- Restore the NuGet packages:
  ```ps
  dotnet restore
    ```
- Update the database:
  ```ps
  dotnet ef database update
  ```
- Run the application:
  ```ps
  dotnet run
  ```
### Frontend Setup
- Navigate to the Frontend directory.
- Install the dependencies:
  ```ps
  npm install
  ```
- Start the development server:
  ```ps
  npm run dev
  ```

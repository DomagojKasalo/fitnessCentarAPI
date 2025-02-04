# 🏋️‍♂️ Fitness App API  

This is a **Fitness Management API** designed to help gyms and fitness centers manage **users, trainers, sessions, and reservations**. The system enforces **role-based access control (RBAC)**, allowing different levels of access for **admins, trainers, and members**.  

## Features 🚀  

✅ **User Authentication & Authorization (JWT-based)**  
Users register and log in using **email & password**. Secure authentication is handled using **JSON Web Tokens (JWT)**.  

✅ **Role-Based Access Control**  
Different user roles (**admin, trainer, member**) determine what actions a user can perform.  
- **Admins** can manage all users, trainers, and sessions.  
- **Trainers** can schedule and manage sessions.  
- **Members** can book sessions and view schedules.  

✅ **Session Management**  
Trainers and admins can create, update, and delete **training sessions**, including details such as **date, capacity, and trainer assignment**.  

✅ **Member & Trainer Management**  
Admins can add, update, and remove **trainers** and **members** from the system. Trainers can view **member lists** but cannot modify them.  

✅ **Reservations System**  
Members can **book** available sessions if slots are open. Duplicate reservations for the same session are prevented. Trainers and admins can **view** all reservations.  

✅ **Data Validation & Error Handling**  
All user input is validated using **Joi** to prevent incorrect data entries. A centralized **error-handling mechanism** ensures meaningful error messages for better API usage.  

## API Overview 🌍  

This API follows **RESTful principles** and provides endpoints for:  

- **User authentication** (`/register`, `/login`)  
- **Managing members & trainers** (`/members`, `/trainers`)  
- **Scheduling and managing sessions** (`/sessions`)  
- **Handling reservations** (`/reservations`)  

Each request is validated and protected using **JWT authentication** to ensure secure data access.  

---

This API is designed to efficiently manage fitness sessions and reservations while maintaining **security, scalability, and ease of use**. 🚀

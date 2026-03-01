# Tourism & Culture Platform

This repository contains the source code for the **Tourism & Culture Platform**, a full-stack, scalable application built to provide users with an immersive, interactive journey through cultural heritage sites and vibrant tourist destinations. 

From interactive maps (Leaflet/Mapbox) to VR panoramic views (A-Frame/Pannellum) and organized Cultural Calendars, the platform is structured intelligently to bridge modern tourist demands with cutting-edge web technologies.

---

## 🏗️ System Architecture

The platform separates the client UI from the backend services effectively.

### Client (Frontend)
Located in the `frontend` folder, the UI is powered by **React 19** and bootstrapped with **Vite** for unparalleled dev-server speeds.
- **Routing:** React Router v7 driving everything from landing pages to authenticated dashboards and map explorations (`App.jsx`).
- **Design:** Glassmorphic modern UIs styled with Tailwind CSS, delivering highly responsive components (`Login.jsx`, `HotelsCars.jsx`).
- **Interactive Layers:**
  - `react-leaflet`, `mapbox-gl`, `@react-google-maps/api` form the core mapping mechanics.
  - `aframe` and `pannellum` used for 3D/360-degree immersive panoramas.
  - `react-calendar` visualizes cultural events fetched from static datasets.
  
### Server (Backend)
Located in the `backend` directory, the backend acts as a robust data layer built with **Spring Boot v3.5.5 (Java 17/21)**.
- **Architecture Base:** Centralized around the `com.example.dundi` package structure utilizing Controllers, Services, and Repositories.
- **Persistence:** Spring Data JPA connected to a local MySQL container (`loginsystem`). Configuration properties live in `application.properties`. DDL definitions are auto-updated through Hibernate.
- **Security Context:** Basic HTTP Spring Security filter chains (`SecurityConfig.java`) protecting APIs, with user credentials securely encrypted down to the row level using `BCryptPasswordEncoder`.

---

## 🚀 Getting Started

To run the application locally, you must first ensure you meet the necessary system requirements.

### Prerequisites
- **Node.js** (v18+) and `npm` for the frontend.
- **Java Development Kit (JDK)** 17 or 21 for the backend.
- **MySQL Database Server** instance with a schema named `loginsystem` and configured credentials (default: root/John@9866R).

### 1. Run the Backend API

Open your terminal and step into the backend workspace:

```bash
cd backend
```

*(Windows Option): If you have conflicting Java installations, set your environment path explicitly before running:*
```powershell
$env:JAVA_HOME="C:\Program Files\Java\jdk-21"
```

Start the application using Maven Wrapper:

```bash
# On Windows CMD/PowerShell:
.\mvnw spring-boot:run

# On MacOS/Linux:
./mvnw spring-boot:run
```
> The API will start and bind generally to `http://localhost:8087`. Hibernate will automatically connect and verify the MySql DDL definitions. 

### 2. Run the Frontend Development Server

Open a second terminal window or tab and navigate into the UI's folder:

```bash
cd frontend
```

Install modern dependencies required by `package.json` and kick-start Vite.

```bash
npm install
npm run dev
```

> The Vite server will instantly launch the frontend logic and HMR listener. Press `h` to view Vite commands, or navigate directly to the provided `http://localhost:5173` URI. 

---

## 🔌 Core API Endpoints Reference

The Spring Boot layer exposes straightforward APIs to handle Authentication (`AuthController.java`). 
- **User Authentication:** Both endpoints communicate across the React components securely using CORS policies configured inside `CorsConfig.java`. 

### `[POST] /auth/register`
Accepts a JSON object payload comprising a `username` and `password`. Encrypts the raw password context over BCrypt and persists the new identity within the `User` object table.

### `[POST] /auth/login`
Expects `username` and raw `password`, querying securely against stored database hashes to assert login status. Returns successes directly to React State (`App.jsx -> Login.jsx`), establishing authorization tokens contextually in the user's `localStorage`.

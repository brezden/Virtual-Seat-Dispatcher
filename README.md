# Virtual Seat Dispatcher

Welcome to the Virtual Seat Dispatcher, an intuitive seat picker app designed to streamline the process of booking seats in an office environment. Leveraging the T3 Stack, this app offers a user-friendly interface and efficient seat allocation functionality.

![VSDScreenshot](https://github.com/brezden/Virtual-Seat-Dispatcher/assets/60556017/5cd91ff5-d9d1-430e-8452-24310b648181)

## Features

- **Interactive Seat Selection:** Choose your preferred seat from a visual office layout.
- **Real-time Availability:** View current availability of seats.
- **Booking Management:** Easily manage your booking dates and times.
- **User Accounts:** Personalized accounts for booking and managing seats.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- Prisma
- PlanetScale Database

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/brezden/Virtual-Seat-Dispatcher.git
   cd virtual-seat-dispatcher
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup PlanetScale and Prisma Connections in ENV File**

4. **Configure Prisma**

    Initialize Prisma in your project (if not already done):

    ```bash
   npx prisma init
   ```

5. **Run Prisma Migrations**

    Apply your database schema to PlanetScale:

    ```bash
   npx prisma migrate dev
   ```

6. **Insert NextAuth Azure Credentials**

    Insert your Azure credentials into the `.env` file.

7. **Run the App**

    ```bash
   npm run dev
   ```

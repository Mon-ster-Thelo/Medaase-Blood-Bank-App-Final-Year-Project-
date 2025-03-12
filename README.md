# Medaase Blood Bank App - Final Year Project

## Overview
The **Medaase Blood Bank App** is a MERN stack-based web application designed to streamline blood donation and inventory management. It allows donors, hospitals, and organizations to efficiently track blood stock levels, register donations, and facilitate life-saving contributions.

## Features
- **Donor Registration & Dashboard**: Donors can sign up, log in, and view their donation history as an achievement tracker.
- **Blood Inventory Management**: Admins and hospitals can track blood stock levels and manage availability.
- **Chatbot Assistance**: An AI-powered chatbot answers blood-related queries and assists with donation bookings.
- **Reward System**: Incentives for donors who meet donation thresholds.
- **Hospital & Organization Management**: Hospitals can add/remove inventory, while organizations can register and update their services.
- **Event Banner & Contact Widget**: Displays upcoming blood donation exercises and provides contact options (WhatsApp, email, telephone).
- **Knowledge Hub**: A section with downloadable PDFs on health-related topics.

## Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **AI Chatbot**: Integrated using Gemini API
- **Email Integration**: Email.js for verification emails

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- MongoDB (local or cloud-based like MongoDB Atlas)

### Clone the Repository
```bash
 git clone https://github.com/Mon-ster-Thelo/Medaase-Blood-Bank-App-Final-Year-Project-.git
 cd Medaase-Blood-Bank-App-Final-Year-Project-
```

### Install Dependencies
```bash
 npm install  # Install backend dependencies
 cd client && npm install  # Install frontend dependencies
```

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAILJS_USER=your_emailjs_public_key
EMAILJS_SERVICE=your_emailjs_service_id
EMAILJS_TEMPLATE=your_emailjs_template_id
```

### Run the Application
#### Start Backend Server
```bash
 npm start
```
#### Start Frontend Server
```bash
 cd client
 npm start
```

## Usage
- Donors can sign up and log in to track their contributions.
- Hospitals can manage their blood inventory and request stock.
- Admins oversee user accounts and manage system-wide data.

## Contributions
Contributions are welcome! Feel free to fork this repository and submit pull requests.

## License
This project is open-source under the **MIT License**.

## Contact
For any inquiries or contributions, please reach out via [GitHub Issues](https://github.com/Mon-ster-Thelo/Medaase-Blood-Bank-App-Final-Year-Project-/issues).

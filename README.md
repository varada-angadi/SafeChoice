# SafeChoice – Carcinogenic Chemical Insights Platform
A web application that helps users identify harmful chemicals in products. Built with React, TailwindCSS, Node.js, and MongoDB, it’s designed for fast, interactive, and secure chemical analysis.

# Features 
Product Analysis – Scan barcodes or search products to detect carcinogenic risks. </br>
Real-Time Barcode Scanning – Implemented using zxing/library for instant results.</br>
Integrated Datasets – EWG, OpenFoodFacts, IARC classifications, plus AI fallback for unknown products.</br>
Clean & Responsive UI – Focused on awareness and education.</br>
No Login Required – Fully accessible without creating an account.</br>

# Tech Stack 
Frontend: React, TailwindCSS </br>
Backend: Node.js, Express.js</br>
Database: MongoDB</br>
Other Tools: zxing/library</br>

# Screenshots / Demo
<table>
  <tr>
    <td><img src="assets/screenshots/home.jpeg" alt="SafeChoice Home" width="250"/></td>
    <td><img src="assets/screenshots/search.jpeg" alt="SafeChoice Dashboard" width="250"/></td>
    <td><img src="assets/screenshots/scan.jpeg" alt="SafeChoice Scan" width="250"/></td>
    <td><img src="assets/screenshots/result1.jpeg" alt="SafeChoice Scan" width="250"/></td>
    <td><img src="assets/screenshots/result2.jpeg" alt="SafeChoice Scan" width="250"/></td>
    <td><img src="assets/screenshots/info.jpeg" alt="SafeChoice Scan" width="250"/></td>
    <td><img src="assets/screenshots/feedback.jpeg" alt="SafeChoice Scan" width="250"/></td>  
  </tr>
</table>

# Setup & Installation
1. Clone the repo</br>
git clone https://github.com/yourusername/SafeChoice.git</br>
cd SafeChoice</br>


2. Install dependencies</br>
npm install</br>


3. Create .env</br>
MONGO_URI=your_mongodb_connection_string</br>
JWT_SECRET=your_secret_key</br>


4. Start backend & frontend</br>
npm run server</br>
npm start</br>

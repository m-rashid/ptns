# PTNS - Portable Trading Network System  
  
The retailing industry, having become a vital business sector globally, has increasingly opted for technological innovations and solutions to manage businesses in an automated and efficient manner. This is more applicable to small on-the-go businesses as well as
stores with multiple branches in different locations who wish to adopt a portable and cost-effective solution for a global automated inventory management system connected to their Point of Sale (POS). The current market solutions were found to contain advanced functionality which many of the small-sized businesses do not make use of but are nonetheless required to pay for. 

The ultimate goal of this project is to develop a system named _Portable Trading Network System (PTNS)_ while researching appropriate technologies that can be used in its development. The system should be aimed at providing a cost-effective and basic POS functionality relevant to small businesses who would use it in their daily operations without having to pay an extra amount for advanced and unused features. To achieve this, the system will start off in the server-side to develop an API so as to give client-side developers more freedom to choose the functionality needed by interfacing with the server.

## Getting started  
 
These instructions will provide you with a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
* Node.js and npm  
The entire project is developed using the Javascript runtime environment, _Node.js_. To install Node.js on your local machine, visit [this link](https://nodejs.org/en/download/). This installation will include the Node Package Manger, which is also used in this project.
  
  
### Installation
There are two aspects to this project, the Node/Express.js back-end and a React front-end application. The follow steps will get a development environment running on your machine.

1. CLone the Git repository or download the source files from Github:
Clone the Git repository for PTNS: `https://github.com/m-rashid/ptns.git`.  
2. Setup the Node.js server:
    * Navigate to the project folder
    * `cd api-backend`
    * run the following in the command line: `npm install`
    * configure Firebase Admin SDK:  
      Create a Firebase project and follow [this](https://firebase.google.com/docs/admin/setup) to download your Service Account credentials file. Place this file in the `/api-backend` folder.
    * Enter your Firebase database URL in the server's database configuration file: `/api-backend/models/db.js`.
    * Run `node index.js` from the root of the `/api-backend` directory to start the server.
    
3. If you wish to test the server using the React.js front-end application, follow these steps:
   * Navigate to the project folder
   * `cd react-frontend`
   * run the following in the command line: `npm install`
   * Configure your Firebase database credentials in `/src/firebase/firebase.js`
   * Run `npm start` from the root of the directory

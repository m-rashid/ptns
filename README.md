# PTNS - Portable Trading Network System  

This is a research project aimed at developing a system to provide a cost-effective and cloud-based Point-of-Sale solution. The focus is to achieve global automated inventory control for businesses that have multiple stores in different locations, along with a portable retail management soltution for _on-the-go_ businesses. The initial iteration of this system begins by developing an API which would give client-side developers the flexibility to tailor the functionality provided to retailers' requirements.

## Getting started  
 
These instructions will provide you with a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
* Node.js and npm  
The entire project is developed using the Javascript runtime environment, _Node.js_. To install Node.js on your local machine, visit [this link](https://nodejs.org/en/download/). This installation will include the Node Package Manger, which is also used in this project.
  
  
### Installation
There are two aspects to this project, the Node/Express.js back-end and a React front-end application<sup>[1](#myfootnote1)</sup>. The following steps will get a development environment running on your machine.

1. Clone the Git repository or download the source files from Github:
Clone the Git repository for PTNS: `https://github.com/m-rashid/ptns.git`.  
2. Setup the Node.js server:
    * Navigate to the project folder
    * `cd api-backend`
    * run the following in the command line: `npm install`
    * configure Firebase Admin SDK:  
      Create a Firebase project and follow [this guide](https://firebase.google.com/docs/admin/setup) to download your Service Account credentials file. Place this file in the `/api-backend` folder.
    * Enter your Firebase database URL in the server's database configuration file: `/api-backend/models/db.js`.
    * Run `node index.js` from the root of the `/api-backend` directory to start the server.
    
3. If you wish to test the server using the React.js front-end application, follow these steps:
   * Navigate to the project folder
   * `cd react-frontend`
   * run the following in the command line: `npm install`
   * Configure your Firebase database credentials in `/src/firebase/firebase.js`
   * Run `npm start` from the root of the directory

<a name="myfootnote1">1</a>: [This](https://github.com/kels-orien/real-time-pos-system.git) Github repository has been used as the base for the React front-end application in order to speed-up development. Special thanks to the contributors.

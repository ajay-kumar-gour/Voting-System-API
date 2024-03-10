# Voting-System-API

Welcome to the Voting API! This API provides functionality for managing candidates, casting votes, and retrieving live vote counts.

## Technologies Used
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

## Overview

The Voting API provides a platform for managing voting processes in various scenarios, such as elections, surveys, or polls. Here's an overview of the key features and rules governing the API:

1. **ADMIN cannot cast vote**: Administrators of the system are restricted from casting votes. Their role is to manage candidates, monitor voting activities, and ensure the integrity of the voting process.

2. **Unique voting restriction**: Each voter can only cast one vote to a candidate or a party. This prevents duplicate or fraudulent voting and maintains the fairness of the voting process.

3. **Live vote result**: The API offers a feature to view live vote results to everyone. No authentication is required to access this feature. Users can see the current status of votes cast for each candidate or party in real-time.

4. **Admin-exclusive candidate creation**: Only administrators have the authority to create new candidates. This ensures that the candidate pool is managed securely and accurately by authorized personnel.

5. **Age eligibility for voting**: Any user with a valid AADHAR CARD can register on the platform. However, only users with an age of 18 years or older are eligible to cast their votes. This rule aligns with legal voting age requirements in many jurisdictions.

These rules and features collectively contribute to the fairness, transparency, and security of the voting process facilitated by the Voting API.

## Features

| Feature                        | Description                                                                                                     |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------|
| Create Candidate               | Admins can create new candidates providing details such as name, party, manifesto, etc.                        |
| View Candidates                | Retrieve a list of all candidates or view specific candidate details by ID.                                     |
| Cast Vote                      | Registered users can cast their votes for candidates, ensuring fair and transparent elections.                   |
| Live Vote Count                | Real-time view of the vote count for each candidate or party, accessible to everyone without authentication.    |
| Admin Dashboard                | Administrators have access to a dashboard for managing candidates, monitoring voting activities, etc.           |
| Age Eligibility Check          | Users' age is verified against the legal voting age (18 years or older) before allowing them to cast their votes.|
| Aadhar Card Registration       | Users can register using their Aadhar Card details, ensuring only legitimate users participate in voting.        |
| Duplicate Vote Prevention      | Mechanisms are in place to prevent users from casting multiple votes to the same candidate or party.             |
| Secure Authentication          | JWT tokens are used for user authentication and authorization, ensuring secure access to protected endpoints.   |
| Error Handling                 | The API returns appropriate error messages for various scenarios, ensuring a smooth user experience.           |

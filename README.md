# Voting-System-API

Endpoints:


(AUTHENTICATION)
-----------------
POST --> api/auth/register --> USERS(VOTERS) should register giving details as name, age, DOB , age , aadhard card number , password

POST --> api/auth/login --> USERS(VOTERS) can login using aadhard card number and password

POST --> api/auth/logout --> logs out the current users -->invalidates the token

(CANDIDATE)
------------

GET --> api/candidates --> shows all the list of candidates

GET --> api/candidates/:candidateID --> shows info of a single candiated based on the provided ID

POST --> api/vote/:candidateID --> allows the user to vote for the candidate

GET --> api/results --> everyone can see the LIVE VOTE results


POST --> api/candidate --> create a new & unique candiate

GET --> api/voters --> shows the list of eligible voters

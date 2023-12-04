## Author

[Shobhit Srivastava](mailto:srivastava.sho@northeastern.edu)

[![Build CI](https://github.com/csye-cloud-shobhit/webapp/actions/workflows/build-ci.yml/badge.svg)](https://github.com/csye-cloud-shobhit/webapp/actions/workflows/build-ci.yml)

## Prerequisites

To install and run the app locally, you need to have the following installed

- `git`
- `node v.16.17.0` and above
test
## Installation

- npm install

## Test
- npm run test:integration
# API Routes
## Assignments Routes
- GET /assignments - Retrieve all assignments.
- POST /assignments - Add a new assignment.
- GET /assignments/:id - Retrieve a specific assignment by its ID.
- DELETE /assignments/:id - Delete a specific assignment by its ID.
- PUT /assignments/:id - Update a specific assignment by its ID.
- 
All other methods to the above routes will return a 405 Method Not Allowed status.
## Health Check
- GET /healthz - Health check route.
All other methods to this route will return a 405 Method Not Allowed status

Packer Ami Build test


### Added certificate
 
- aws acm import-certificate --certificate file://Certificate.pem --certificate-chain file://CertificateChain.pem --private-key file://PrivateKey.pem --profile demo
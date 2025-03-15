# Mediscribe - Central API

This is the documentation of the central API. You can find the routes and their specs here.

## Requirements

This API runs on the express.js library with mongoose.js and aws-sdk integration. Run `npm i` to download all dependencies.

### .env

PORT=
MONGODB_URI=
AWS_USERNAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=

## Routes

### patients

#### GET /api/v2/patients

#### GET /api/v2/patients/:patientId

#### POST /api/v2/patients/:patientId

#### PATCH /api/v2/patients/:patientId

#### DELETE /api/v2/patients/:patientId

### doctors

#### GET /api/v2/doctors

#### GET /api/v2/doctors/:doctorId

#### POST /api/v2/doctors/:doctorId

#### PATCH /api/v2/doctors/:doctorId

#### DELETE /api/v2/doctors/:doctorId

### records

#### GET /api/v2/records

#### GET /api/v2/records/:recordId

#### POST /api/v2/records/:recordId

#### PATCH /api/v2/records/:recordId

#### DELETE /api/v2/records/:recordId

### recordings

#### GET /api/v2/recordings

#### GET /api/v2/recordings/:recordingId

#### POST /api/v2/recordings/:recordingId

#### PATCH /api/v2/recordings/:recordingId

#### DELETE /api/v2/recordings/:recordingId

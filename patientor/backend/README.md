# 🏥 Patientor API - Backend Service

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A RESTful API backend for patient management system (Patientor), built with Node.js, Express, and TypeScript.

### Installation

- To get the app running just install its dependencies with `npm install` and run it with `npm run dev`.

### Routes

- GET http://localhost:3001/patients // get all patient
- GET http://localhost:3001/patients/:id // get patient by id

- POST http://localhost:3001/patients // create new patient
- POST http://localhost:3001/patients/:id/entries // add new entry for a patient

- GET http://localhost:3001/diagnoses // get all diagnoses

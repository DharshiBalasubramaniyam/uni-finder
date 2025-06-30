# Uni Finder

## Objective:


Uni Finder is a web-based application designed to assist Advanced Level (A/L) students in identifying the university degree programs they are eligible for. The system takes into account a student’s Z-score, subject stream, individual subjects, and district to provide personalized and accurate recommendations.

## Key Features:

- Eligibility-Based Course Identification: Enables users to discover eligible university degree programs based on their Z-score, subject stream, selected A/L subjects, and district.

- Detailed Course Information: Displays comprehensive details for each degree program, including:
  - Unicode
  - Degree program name
  - The university offering the program
  - Duration
  - Medium of instruction
  - A/L and O/L eligibility requirements

- Shortlisting Functionality: Allows users to create and manage a list of preferred degree programs.

- PDF Export: Users can download their shortlisted degree programs as a PDF document for offline access.

- Responsive Design: Optimized for usability on both desktop and mobile devices with an intuitive user interface.

## Technologies Used:

- Next.js – Web framework for server-rendered React applications
- TypeScript – A Strongly typed programming language for scalable frontend development
- Google Sheets – Used as the primary data source for program and eligibility information
Dataset:

> Note: All necessary data, including information on universities, districts, subject streams, subjects, and degree programs, is maintained in a structured [Google Sheet](https://docs.google.com/spreadsheets/d/11593XtsICvhF_yDD58mpxyheNGMQVdEcHld8oVVjrrw/edit?usp=drive_web&ouid=101553164679422943030). The course cut-off scores are extracted from the Academic year 2023/2024. The course eligibility requirement details are extracted from the University Handbook - 23/24

## Live Deployment:

The application is currently deployed and accessible via the following link: [Uni Finder Website](https://uni-finder-chi.vercel.app/)

## How to run?

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file similar to `.env.example`.

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

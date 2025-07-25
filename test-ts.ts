// Basic test file
console.log('Testing TypeScript compilation...');
console.log('Node.js version:', process.version);

import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Express.js is working!' });
});

console.log('Express app created successfully');

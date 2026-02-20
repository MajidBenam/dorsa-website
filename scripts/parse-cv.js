// Script to parse CV PDF and extract information
// Run with: node scripts/parse-cv.js

const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

async function parseCV() {
  try {
    const pdfPath = path.join(__dirname, '../public/cv/Dorsa Updated CV Feb 2026.pdf');
    
    if (!fs.existsSync(pdfPath)) {
      console.error('CV PDF not found at:', pdfPath);
      return;
    }

    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    
    console.log('PDF parsed successfully!');
    console.log('Total pages:', data.numpages);
    console.log('\n--- Extracted Text (first 2000 chars) ---');
    console.log(data.text.substring(0, 2000));
    console.log('\n--- Full text saved to cv-content.txt ---');
    
    // Save full text to file for review
    fs.writeFileSync(
      path.join(__dirname, '../cv-content.txt'),
      data.text
    );
    
    // Try to extract structured information
    const text = data.text;
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    console.log('\n--- Structured Information ---');
    console.log('Total lines:', lines.length);
    console.log('\nFirst 50 lines:');
    lines.slice(0, 50).forEach((line, i) => {
      console.log(`${i + 1}: ${line}`);
    });
    
  } catch (error) {
    console.error('Error parsing PDF:', error);
  }
}

parseCV();

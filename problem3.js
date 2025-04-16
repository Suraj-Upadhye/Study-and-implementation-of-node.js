const fs = require('fs');

// // Write to a file
// fs.writeFile('example.txt', 'Hello World!', (err) => {
//   if (err) throw err;
//   console.log('File written successfully!');
// });

// // Read from a file
// fs.readFile('example.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log('File content:', data);
// });


// const data = fs.readFileSync('example.txt', 'utf8');
// console.log(data); // This blocks further code until reading is complete


// if (fs.existsSync('example.txt')) {
//     console.log("File exists");
//   } else {
//     console.log("File not found");
//   }
  


const fsPromises = require('fs').promises;

async function readMyFile() {
  try {
    const data = await fsPromises.readFile('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
readMyFile();

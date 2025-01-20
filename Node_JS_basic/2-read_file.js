const fs = require('fs');

function countStudents(path) {
  try {

    const data = fs.readFileSync(path, 'utf8');

    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length === 0) throw new Error('Cannot load the database');

    const header = lines[0].split(',');
    const students = lines.slice(1);

    if (students.length === 0) throw new Error('Cannot load the database');

    console.log(`Number of students: ${students.length}`);

    const fields = {};

    students.forEach((row) => {
      const values = row.split(',');

      if (values.length !== header.length) return;

      const firstname = values[0];
      const field = values[values.length - 1];

      if (!fields[field]) fields[field] = [];
      fields[field].push(firstname);
    });

    for (const [field, names] of Object.entries(fields)) {
      console.log(
        `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`
      );
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;

console.log('Welcome to Holberton School, what is your name?');

// That function dynamic for what ur names
process.stdin.on('data', (input) => {
  const name = input.toString().trim();
  console.log(`Your name is: ${name}`);
  console.log('This important software is now closing');
  process.exit();
});

module.exports = {};

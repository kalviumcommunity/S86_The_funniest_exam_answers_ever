const sequelize = require('./sequelize');
const User = require('./models/User');
const FunnyAnswer = require('./models/Entity');

async function setup() {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL!');

    await sequelize.sync({ force: true });
    console.log('All models synced.');

    const users = await User.bulkCreate([
      { username: 'Alice' },
      { username: 'Bob' },
      { username: 'Charlie' },
    ]);
    console.log('Users seeded.');

    await FunnyAnswer.bulkCreate([
      {
        question: "Why did the computer get cold?",
        funny_answer: "Because it left its Windows open!",
        student_name: "Ram",
        subject: "Computer Science",
        uploaded_by: "Teacher3",
        created_by: users[0].id,
      },
      {
        question: "Who invented exams?",
        funny_answer: "My enemy.",
        student_name: "Shyam",
        subject: "History",
        uploaded_by: "Teacher1",
        created_by: users[1].id,
      },
      {
        question: "Name a mammal that can fly",
        funny_answer: "Superman",
        student_name: "Jimmy",
        subject: "Biology",
        uploaded_by: "Teacher3",
        created_by: users[2].id,
      },
    ]);

    console.log('Funny answers seeded.');

    process.exit();
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setup();

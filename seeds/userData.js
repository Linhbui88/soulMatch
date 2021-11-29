const faker = require("faker");
const users= [];

for (var i = 0; i < 20; i++) {
  const fakee = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    image: faker.image.avatar(),
    story:faker.lorem.paragraph()

};

  users.push(fakee)
}

console.log(users)
module.exports = users

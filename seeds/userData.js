const faker = require("faker");
const users= [];

for (var i = 0; i < 20; i++) {
  const randomNum = Math.floor(Math.random()* 100)
  const randomSex = Math.floor(Math.random()* 2)? 'men' : 'women'

  const fakee = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    image: `https://randomuser.me/api/portraits/${randomSex}/${randomNum}.jpg`,
    story:faker.lorem.paragraph()

};

  users.push(fakee)
}

console.log(users)
module.exports = users

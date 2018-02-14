const characters = require('./characters/characters.service.js');
const feats = require('./feats/feats.service.js');
const skills = require('./skills/skills.service.js');
const spells = require('./spells/spells.service.js');
const users = require('./users/users.service.js');
const specialAbilities = require('./special-abilities/special-abilities.service.js');
const languages = require('./languages/languages.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(characters);
  app.configure(feats);
  app.configure(skills);
  app.configure(spells);
  app.configure(users);
  app.configure(specialAbilities);
  app.configure(languages);
};

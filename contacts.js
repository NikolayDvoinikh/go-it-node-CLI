const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const result = await readFile(contactsPath, "utf-8");
  return console.log(result);
}

async function getContactById(contactId) {
  const result = await listContacts().find(({ id }) => id === contactId);
  return console.log(result);
}

async function removeContact(contactId) {
  const newContactList = await listContacts().filter(
    ({ id }) => contactId !== id
  );
  const result = await writeFile(contactsPath, newContactList);
  return console.log(result);
}

// async function addContact(name, email, phone) {
//   const result = await listContacts();
// }

module.exports = { listContacts, removeContact, getContactById };

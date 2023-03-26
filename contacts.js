const { nanoid } = require("nanoid");

const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

// const contactsPath = path.join(__dirname, "db", "contacts.json"); */

async function listContacts() {
  const result = await readFile(contactsPath, "utf-8");
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = allContacts.find(({ id }) => id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => contactId === id);
  if (index === -1) {
    return null;
  }
  const [deleteContact] = allContacts.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deleteContact;
}

async function addContact({ name, email, phone }) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const allContacts = await listContacts();
  // const existName = allContacts.find((contact) => contact.name === name);
  // const existEmail = allContacts.find((contact) => contact.email === email);
  // const existPhone = allContacts.find((contact) => contact.phone === phone);
  // if (existName || existEmail || existPhone) {
  //   return console.log("Bad request");
  // }
  allContacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

module.exports = { listContacts, removeContact, getContactById, addContact };

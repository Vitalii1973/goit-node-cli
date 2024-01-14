const { promises: fsPromises } = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const removedContact = contacts.find((contact) => contact.id === contactId);
    if (removedContact) {
      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      await fsPromises.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, null, 2)
      );
    }
    return removedContact || null;
  } catch (error) {
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: generateId(), name, email, phone };
    const updatedContacts = [...contacts, newContact];
    await fsPromises.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2)
    );
    return newContact;
  } catch (error) {
    return null;
  }
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

module.exports = { listContacts, getContactById, removeContact, addContact };

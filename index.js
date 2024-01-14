// index.js
const { program } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      return listContacts();
    case "get":
      return getContactById(id);
    case "add":
      return addContact(name, email, phone);
    case "remove":
      return removeContact(id);
    default:
      return null;
  }
}

invokeAction(argv).then((result) => {
  console.log(result);
});

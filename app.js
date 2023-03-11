const fs = require('fs')
const contact = require('./modules/contact')
const yargs = require('yargs')

yargs.command({
  command: 'add',
  describe: 'Add new contact',
  builder: {
    nama: {
      describe: 'Name contact',
      demandOption: true,
      type: 'string',
    },
    nohp: {
      describe: 'Number contact',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'Email contact',
      demandOption: false,
      type: 'string',
    },
  },
  handler(argv) {
    contact.addContact(argv.nama, argv.nohp, argv.email)
  },
})

yargs.command({
  command: 'remove',
  describe: 'Remove some contact',
  builder: {
    nama: {
      describe: 'Name contact that you want to remove',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contact.removeContact(argv.nama)
  },
})

yargs.command({
  command: 'list',
  describe: 'List all contact',
  handler() {
    contact.listContact()
  },
})

yargs.parse()

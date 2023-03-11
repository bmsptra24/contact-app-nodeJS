const fs = require('fs')
const validator = require('validator')
const chalk = require('chalk')
let validFlag = true

const readJSON = () => {
  let rawData = fs.readFileSync('data/contacts.json', 'utf-8')
  return JSON.parse(rawData)
}

const addContact = (nama, noHP, email = '') => {
  console.log(
    chalk.bgGreen.bold(`Add new contact (${nama}, ${noHP}, ${email})`),
  )
  // read json
  let dataJSON = readJSON()

  // validation data (number & email)
  if (!validator.isMobilePhone(noHP, 'id-ID')) {
    // check number
    return console.log(chalk.bgRed.bold('Number not valid!'))
  } else if (!validator.isEmail(email)) {
    // check email
    if (!email == '') {
      return console.log(chalk.bgRed.bold('Email not valid!'))
    }
  }

  // validation data (same number)
  dataJSON.find((e) => {
    if (e.noHP == noHP) {
      console.log(chalk.bgRed.bold('Number already saved before!'))
      validFlag = false
    }
  })

  // write json
  if (validFlag) {
    data = { nama, noHP, email }
    dataJSON.push(data)
    fs.writeFileSync('data/contacts.json', JSON.stringify(dataJSON, null, 2))
    console.log(chalk.bgBlue.bold(`Data berhasil diinput!`))
  }
}

const removeContact = (nama) => {
  console.log(chalk.bgGreen.bold(`Remove: ${nama}`))
  let dataJSON = readJSON()
  dataJSON.find((e, i) => {
    if (e.nama === nama) {
      dataJSON.splice(i, 1)
      fs.writeFileSync('data/contacts.json', JSON.stringify(dataJSON, null, 2))
      console.log(chalk.bgBlue.bold(`Data berhasil dihapus!`))
    }
  })
}

const listContact = () => {
  console.log(chalk.bgGreen.bold('My  Contact List'))
  dataJSON = readJSON()
  dataJSON.forEach((e, i) => {
    console.log(`${i + 1}. ${e.nama} - ${e.noHP}`)
  })
}

module.exports = { addContact, removeContact, listContact }

const { response } = require('express')

const bcrypt = require('bcrypt')

const pool = require('../database/database')

const getUser = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY userId ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE userId = $1', [id], (error, results) => {
      if (error) {
        response.status(400).send(error.message)
      } else if(results.rowCount === 0) {
        response.status(404).send(`No data found`)
      } else {
        response.status(200).json(results.rows)
      }
    })
}

const getUserByEmail = (request, response) => {
  const id = parseInt(request.params.email)

  pool.query('SELECT * FROM users WHERE userEmail = $1', [email], (error, results) => {
    if (error) {
      response.status(400).send(error.message)
    } else if(results.rowCount === 0) {
      response.status(404).send(`No data found`)
    } else {
      response.status(200).json(results.rows)
    }
  })
}

const createUser = (request, response) => {
    const name = request.body.name
    const firstname = request.body.firstname
    const password = request.body.password
    const email = request.body.email
    const phone = request.body.phone

    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt)

    pool.query('INSERT INTO users(userName, userFirstName, userPassword, userEmail, userPhoneNumber) VALUES ($1, $2, $3, $4, $5)', [ name, firstname, hash, email, phone], (error, result) => {
        if (error) {
            response.status(400).send(`Unable to add user, the email is already used`)
        } else {
        response.status(201).send(`User has been added`)
        }
    })
}

const deleteUser = (request, response) => {

    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE userId = $1', [id], (error, results) => {
        if (error) {
            response.status(404).send(error.message)
        } else {
            response.status(200).send(`User deleted with ID: ${id}`)
        }
      })
}

module.exports = {
    getUser,
    getUserById,
    getUserByEmail,
    createUser,
    deleteUser,
}
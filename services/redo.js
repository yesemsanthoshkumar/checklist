const {client} = require('../lib/db');

/**
 * Adds a new task to an existing redo
 * @param {Request} req 
 * @param {Response} res 
 */
async function addTasktoRedo(req, res) {
  try {
      console.log("AddingTasktoRedo", req.params);
      const result = await client.query(
          `INSERT INTO TASKS(CHECKLIST, NAME, DESCRIPTION)
          VALUES($1, $2, $3)
          RETURNING *`,
          [req.params.redo, req.body.name, req.body.desc]
      );

      console.log("Inserted Tasks...");
      res.send({
          'status': true
      })
  } catch (error) {
      console.log("Error adding task to redo: ", error);
      res.send({
          'status': false
      })
  }
}

module.exports = {
  'addTask': addTasktoRedo 
}
const {client} = require('../lib/db');
const Promise = require('bluebird');

/**
 * Inserts the record of the checklist being done along with the tasks
 * @param {Object} data 
 */
async function doingTheTaskNow(data) {
    try {
        console.log('Inserting done checks...');
        const doneChecklist = await client.query(
            `INSERT INTO DONECHECKLIST(CHECKLIST)
            VALUES($1)
            RETURNING ID`,
            [data.checklist]
        );

        console.log('Insering Done tasks...');
        const doneTasks = await Promise.all(
            data.tasks.map(
                async (doneTask) => {
                    const dtask = await client.query(
                        `INSERT INTO DONETASKS(CHECKLIST, TASK, STATUS)
                        VALUES($1, $2, $3)
                        RETURNING ID, TASK STATUS`,
                        [doneChecklist.rows[0].id, doneTask.task, doneTask.status]
                    );
                    return dtask.rows[0];
                }
            )
        );

        console.log('Done inserting tasks!!!');

        return {
            doneId: doneChecklist.rows[0].id,
            status: true,
            done: doneTasks
        };

    } catch (error) {
        console.log('Error inserting tasks...');
        console.error(error);
        
        return {
            'status': false
        };
    }
}

/**
 * Insert a record for the tasks being done from the checklists
 * 
 * @param {Request} req
 * @param {Response} res 
 */
async function taskIsBeingDone(req, res) {
    try {
        console.log('Querying checklist...');
        const userChecklist = await client.query(
            `SELECT *
            FROM USERCHECKLIST
            WHERE ID = $1
            AND USR = 1
            AND STATUS = 200`,
            [req.body.checklist]
        )

        if (userChecklist.rowCount === 1) {
            const result = await doingTheTaskNow(req.body);
            console.log('Finished doing the tasknow');
            console.log(result);
            res.send(result);
        } else {
            console.log('Multiple checklists matched...');
            res.send({
                'status': false
            })
        }
    } catch (error) {
        console.log(error);
        res.send({
            'status': false
        });
    }
}

/**
 * Adds a new checklist with the tasks associated with it
 * @param {Request} req 
 * @param {Response} res 
 */
async function addNewChecklist(req, res) {
    try {
        console.log('Inserting checklist...');
        const newChecklist = await client.query(
            `INSERT INTO USERCHECKLIST(CHECKLISTNAME, USR)
            VALUES($1, $2)
            RETURNING *`,
            [req.body.name, 1]
        );

        console.log('Inserted tasks...');
        map(
            async (task)=>{
                const tsk = await client.query(
                    `INSERT INTO TASKS(CHECKLIST, NAME, DESCRIPTION)
                    VALUES($1, $2, $3)
                    RETURNING *`,
                    [newChecklist.rows[0].id, task.name, task.description]
                );
            },
            req.body.tasks);

        res.send({
            'status': true
        });
    } catch (error) {
        console.log(error);
        res.send({
            'status': false    
        });
    }
}

/**
 * Returns all the checklists accessible by the authenticated user
 * @param {Request} req 
 * @param {Response} res 
 */
async function getAllChecklists(req, res) {
    try {
        console.log('Querying...');
        const result = await client.query(
            `SELECT ID, CHECKLISTNAME AS NAME
            FROM USERCHECKLIST
            WHERE USR = 1
            AND STATUS = 200
            ORDER BY CHECKLISTNAME`);
        console.log('Fetched result...');
        res.send({
            'status': true,
            'value': result.rows
        });
    } catch (error) {
        console.log(error);
        res.send({
            'status': false
        });
    }
}

/**
 * Returns a single checklist identified by the id in the request params
 * @param {Request} req 
 * @param {Response} res 
 */
async function getSingleChecklist(req, res) {
    try {
        console.log('Querying for ' + req.params.checklist + '...');
        const result = await client.query(
            `SELECT TSK.ID, TSK.NAME, TSK.DESCRIPTION
            FROM USERCHECKLIST AS UCL
            LEFT JOIN TASKS AS TSK
            ON UCL.ID = TSK.CHECKLIST
            WHERE UCL.ID = $1
            AND UCL.USR = 1
            AND UCL.STATUS = 200
            AND TSK.STATUS = 200`,
            [req.params.checklist]);

        console.log('Fetched result...');
        res.send({
            'status': true,
            'value': result.rows
        });
    } catch (error) {
        console.log(error);
        res.send({
            'status': false
        })
    }
}

module.exports = {
    'AddCheckList': addNewChecklist,
    'getAllChecklists': getAllChecklists,
    'getCheckList': getSingleChecklist,
    'DeleteCheckList': (params)=>{
        return "Checklist Deleted"
    },
    'UpdateCheckList': (params)=>{
        return "Checklist updated"
    },
    'ItsTasksTime': taskIsBeingDone
}

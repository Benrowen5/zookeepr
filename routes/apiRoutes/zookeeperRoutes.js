const {filterByQuery, findById, createNewZookeeper, validateZookeeper} = require('../../lib/zookeepers');
const {zookeepers} = require('../../data/zookeepers');

const router = require('express').Router();

router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
});

router.post('/zookeepers', (req, res) => {
    // req.body is where our incoming content will be
    // set the id based on what the next index of the array will be
    req.body.id = zookeepers.length.toString();
    
    // check if the entry did not pass the validation
    if (!validateZookeepers(req.body)) {
        res.status(400).send('The zookeeper is not properly formatted.');
    } else {
    // add zookeeper to JSON file and zookeepers array in this function
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

module.exports = router;
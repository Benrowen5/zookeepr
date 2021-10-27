const path = require('path');
const router = require('express').Router();

// GET route to serve the index.html page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
// GET route to serve the animals page
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});
// GET route to serve the zookeepers page
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});
// GET route wildcard for any routes not defined, redirects to index.html page
router.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const {animals} = require('./data/animals');

function filterByQuery (query, animalsArray) {
    let personalityTraitsArray = [];
    // note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        // save personalityTraits as a dedicated array
        // if personalityTraits is a string (only 1 selected), place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } 
        // otherwise, personalityTraitsArray is populated with the queries.
        else {
            personalityTraitsArray = query.personalityTraits;
        }
        // loop through each traight in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            // check the trait against each animal in the filteredResults array.
            // forEach loop filters the FilteredResults array to include only the entries which contain the trait(s)
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1);
        });
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animals => animals.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animals => animals.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animals => animals.name === query.name);
    }
    return filteredResults;
};

app.get('/api/animals', (req, res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
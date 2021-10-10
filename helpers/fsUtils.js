const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

const deleteFromFile = (id, file) => {
    readFromFile(file)
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all tips except the one with the ID provided in the URL
            const result = json.filter((note) => note.id !== id);

            // Save that array to the filesystem
            writeToFile(file, result);

        });
};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteFromFile };
const fs = require('fs').promises;
const path = require('path');

function createAndDelete(directoryPath, count) {
    const promises = [];
    for (let val = 0; val < count; val++) {
        const filep = `file${val}.json`;
        const jsonfile = path.join(directoryPath, filep);
        const jsonData = { random: Math.random() };

        const createPromise = fs.writeFile(jsonfile, JSON.stringify(jsonData))
            .then(() => {
                console.log('File created', filep);
            })
            .catch((error) => {
                console.log('Failed to create file:', error.message);
            });

        const deletePromise = fs.unlink(jsonfile)
            .then(() => {
                console.log(filep, 'deleted');
            })
            .catch(() => {
                throw new Error(`Failed to delete ${filep}`);
            });

        promises.push(Promise.allSettled([createPromise, deletePromise]));
    }
    return Promise.all(promises);
}

function createRandomjsonFiles(directoryPath, count) {
    fs.mkdir(directoryPath)
        .then(() => {
            console.log(`Directory created.`);
            return createAndDelete(directoryPath, count);
        })
        .then(() => console.log("All tasks completed successfully!"))
        .catch(error => console.error(error.message));
}

module.exports = createRandomjsonFiles;

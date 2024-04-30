const fs = require('fs').promises;
const path = require('path');

function createFiles(directoryPath, count) {
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

        promises.push(createPromise);
    }
    return Promise.all(promises).then(() => console.log('All files created successfully!'));
}

function deleteFiles(directoryPath, count) {
    const promises = [];
    for (let val = 0; val < count; val++) {
        const filep = `file${val}.json`;
        const jsonfile = path.join(directoryPath, filep);

        const deletePromise = fs.unlink(jsonfile)
            .then(() => {
                console.log(filep, 'deleted');
            })
            .catch(() => {
                throw new Error(`Failed to delete ${filep}`);
            });

        promises.push(deletePromise);
    }
    return Promise.all(promises).then(() => console.log('All files deleted successfully!'));
}

function createAndDelete(directoryPath, count) {
    return createFiles(directoryPath, count)
        .then(() => deleteFiles(directoryPath, count))
        .catch(error => console.error(error.message));
}

function createRandomjsonFiles(directoryPath, count) {
    return fs.mkdir(directoryPath)
        .then(() => {
            console.log(`Directory created.`);
            return createAndDelete(directoryPath, count);
        })
        .then(() => console.log("All tasks completed successfully!"))
        .catch(error => console.error(error.message));
}

module.exports = createRandomjsonFiles;

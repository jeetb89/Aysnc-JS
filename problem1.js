const fs = require('fs');
const path = require('path');

function mkdir(directoryPath) {
    return new Promise((resolve, reject) => {
        fs.mkdir(directoryPath, { recursive: true }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function writeFilePromise(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function unlinkFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function createAndDelete(directoryPath, count) {
    const promises = [];
    for (let val = 0; val < count; val++) {
        const filep = `file${val}.json`;
        const jsonfile = path.join(directoryPath, filep);
        const jsonData = { random: Math.random() };

        const createPromise = writeFilePromise(jsonfile, JSON.stringify(jsonData))
            .then(() => {
                console.log('File created', filep);
                unlinkFilePromise(jsonfile)
            .then(() => {
                console.log(filep, 'deleted');
            })
            .catch(() => {
                throw new Error(`Failed to delete ${filep}`);
            });

            })
            .catch((error) => {
                console.log('Failed to create file:', error.message);
            });

       

        promises.push(Promise.all([createPromise]));
    }
    return Promise.all(promises);
}

function createRandomjsonFiles(directoryPath, count) {
    mkdir(directoryPath)
        .then(() => {
            console.log(`Directory created.`);
            return createAndDelete(directoryPath, count);
        })
        .then(() => console.log("All tasks completed successfully!"))
        .catch(error => console.error(error.message));
}

module.exports = createRandomjsonFiles;
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
    const createPromises = [];
    for (let val = 0; val < count; val++) {
        const filep = `file${val}.json`;
        const jsonfile = path.join(directoryPath, filep);
        const jsonData = { random: Math.random() };

        createPromises.push(writeFilePromise(jsonfile, JSON.stringify(jsonData))
            .then(() => {
                console.log('File created', filep);
                return jsonfile;
            })
            .catch((error) => {
                console.log('Failed to create file:', error.message);
            }));
    }

    return Promise.all(createPromises)
        .then((filePaths) => {
            const unlinkPromises = filePaths.map((filePath) => {
                return unlinkFilePromise(filePath)
                    .then(() => {
                        console.log(filePath, 'deleted');
                    })
                    .catch((err) => {
                        console.log(`Failed to delete ${filePath}: ${err.message}`);
                    });
            });
            return Promise.all(unlinkPromises);
        });
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
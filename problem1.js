const fs = require('fs');
const path = require('path');

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

function rec(directoryPath, count, val) {
    if (val < count) {
        const dPath = path.join(directoryPath, `file${val}.json`);
        return writeFilePromise(dPath, 'data')
        .then(() => {
            console.log(`file${val} created`);
            return unlinkFilePromise(dPath);
        })
        .then(() => {
            console.log(`file${val} deleted`);
            return rec(directoryPath, count, val + 1);
        })
        .catch(err => console.error(err.message));
    } else {
        return Promise.resolve();
    }
}

function createRandomjsonFiles(directoryPath, count) {
    return fs.promises.mkdir(directoryPath)
    .then(() => {
        console.log(`Directory created.`);
        return rec(directoryPath, count, 0);
    })
    .catch(error => console.error(error.message))
    .finally(() => console.log("All tasks completed successfully!"));
}

module.exports = createRandomjsonFiles;

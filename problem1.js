const fs = require('fs').promises;
const path = require('path');

async function writeFilePromise(filePath, data) {
    try {
        await fs.writeFile(filePath, data);
        console.log('File created', filePath);
    } catch (err) {
        throw new Error(`Failed to write file: ${err.message}`);
    }
}

async function unlinkFilePromise(filePath) {
    try {
        await fs.unlink(filePath);
        console.log(filePath, 'deleted');
    } catch (err) {
        throw new Error(`Failed to delete file: ${err.message}`);
    }
}

async function createAndDelete(directoryPath, count) {
    const createPromises = [];

    // Create all files first
    for (let val = 0; val < count; val++) {
        const filep = `file${val}.json`;
        const jsonfile = path.join(directoryPath, filep);
        const jsonData = { random: Math.random() };

        createPromises.push(writeFilePromise(jsonfile, JSON.stringify(jsonData)));
    }

    // Wait for all files to be created
    await Promise.all(createPromises);

    // Delete all files
    const deletePromises = [];
    for (let val = 0; val < count; val++) {
        const filep = `file${val}.json`;
        const jsonfile = path.join(directoryPath, filep);
        deletePromises.push(unlinkFilePromise(jsonfile));
    }

    // Wait for all files to be deleted
    await Promise.all(deletePromises);
}

async function createRandomjsonFiles(directoryPath, count) {
    try {
        await fs.mkdir(directoryPath);
        console.log(`Directory created.`);
        await createAndDelete(directoryPath, count);
        console.log("All tasks completed successfully!");
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = createRandomjsonFiles;

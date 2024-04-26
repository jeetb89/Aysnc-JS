const fs = require('fs').promises;
const path = require('path');

async function writeFilePromise(filePath, data) {
    try {
        await fs.writeFile(filePath, data);
    } catch (err) {
        throw new Error(`Failed to write file: ${err.message}`);
    }
}

async function unlinkFilePromise(filePath) {
    try {
        await fs.unlink(filePath);
    } catch (err) {
        throw new Error(`Failed to delete file: ${err.message}`);
    }
}

async function createAndDelete(directoryPath, count) {
    const promises = [];
    for (let val = 0; val < count; val++) {
        const filep = `file${val}.json`;
        const jsonfile = path.join(directoryPath, filep);
        const jsonData = { random: Math.random() };

        try {
            await writeFilePromise(jsonfile, JSON.stringify(jsonData));
            console.log('File created', filep);
        } catch (error) {
            console.log('Failed to create file:', error.message);
        }

        try {
            await unlinkFilePromise(jsonfile);
            console.log(filep, 'deleted');
        } catch (error) {
            throw new Error(`Failed to delete ${filep}`);
        }
    }
    return promises;
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

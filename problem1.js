const fs = require('fs').promises;
const path = require('path');

async function rec(directoryPath, count, val) {
    if (val < count) {
        const dPath = path.join(directoryPath, `file${val}.json`);
        try {
            await fs.writeFile(dPath, 'data');
            console.log(`file${val} created`);
            await fs.unlink(dPath);
            console.log(`file${val} deleted`);
            await rec(directoryPath, count, val + 1);
        } catch (err) {
            console.error(err.message);
        }
    }
}

async function createRandomjsonFiles(directoryPath, count) {
    try {
        await fs.mkdir(directoryPath);
        console.log(`Directory created.`);
        await rec(directoryPath, count, 0);
    } catch (error) {
        console.error(error.message);
    } finally {
        console.log("All tasks completed successfully!");
    }
}

module.exports = createRandomjsonFiles;

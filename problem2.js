const fs = require("fs");

function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
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

function appendFilePromise(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, data, err => {
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

function optOnFiles() {
    // 1. Read the given file lipsum.txt
    return readFilePromise("./lipsum.txt")
    .then(data => {
        // 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        const uppercaseData = data.toUpperCase();
        const upperCasefile = "./upper_case.txt";
        return writeFilePromise(upperCasefile, uppercaseData)
        .then(() => writeFilePromise("./filenames.txt", upperCasefile))
        .then(() => {
            // 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
            const lowercaseContent = uppercaseData.toLowerCase();
            const splitteddata = lowercaseContent.split('.');
            const sentences = "./sentences.txt";
            return writeFilePromise(sentences, splitteddata.join("\n"))
            .then(() => appendFilePromise("./filenames.txt", "\n" + sentences))
            .then(() => {
                // 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
                const restData = splitteddata.sort();
                const newFilePath = "./newFilePath.txt";
                return writeFilePromise(newFilePath, restData.join("\n"))
                .then(() => appendFilePromise("./filenames.txt", "\n" + newFilePath))
                .then(() => {
                    // 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
                    return readFilePromise("./filenames.txt")
                    .then(filenamesData => {
                        const filenames = filenamesData.split('\n');
                        const promises = filenames.map(filename => {
                            if (filename !== '') {
                                return unlinkFilePromise(filename)
                                .then(() => console.log(`${filename} deleted.`))
                                .catch(err => console.error(`Error deleting ${filename}:`, err));
                            }
                        });
                        return Promise.all(promises);
                    });
                });
            });
        });
    })
    .then(() => console.log("All tasks completed successfully!"))
    .catch(err => console.error("Error found", err.message));
}

module.exports = optOnFiles;

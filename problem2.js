const fs = require("fs").promises;

function optOnFiles() {
    // 1. Read the given file lipsum.txt
    fs.readFile("./lipsum.txt", "utf-8")
    .then(data => {
        // 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        const uppercaseData = data.toUpperCase();
        const upperCasefile = "./upper_case.txt";
        return fs.writeFile(upperCasefile, uppercaseData)
        .then(() => fs.writeFile("./filenames.txt", upperCasefile))
        .then(() => {
            // 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
            const lowercaseContent = uppercaseData.toLowerCase();
            const splitteddata = lowercaseContent.split('.');
            const sentences = "./sentences.txt";
            return fs.writeFile(sentences, splitteddata.join("\n"))
            .then(() => fs.appendFile("./filenames.txt", "\n" + sentences))
            .then(() => {
                // 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
                const restData = splitteddata.sort();
                const newFilePath = "./newFilePath.txt";
                return fs.writeFile(newFilePath, restData.join("\n"))
                .then(() => fs.appendFile("./filenames.txt", "\n" + newFilePath))
                .then(() => {
                    // 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
                    return fs.readFile("./filenames.txt", "utf-8")
                    .then(filenamesData => {
                        const filenames = filenamesData.split('\n');
                        const promises = filenames.map(filename => {
                            if (filename !== '') {
                                return fs.unlink(filename)
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

const fs = require("fs").promises;

function optOnFiles() {
    let upperCasefile, sentences, newFilePath,splitteddata;

    return fs.readFile("./lipsum.txt", "utf-8")
        .then(data => {
           
            const uppercaseData = data.toUpperCase();
            upperCasefile = "./upper_case.txt";
            return fs.writeFile(upperCasefile, uppercaseData);
        })
        .then(() => fs.appendFile("./filenames.txt", "\n" + upperCasefile))
        .then(() => {
            const lowercaseContent = upperCasefile.toLowerCase(); 
             splitteddata = lowercaseContent.split('.'); 
            sentences = "./sentences.txt";
            return fs.writeFile(sentences, splitteddata.join("\n"));
        })
        .then(() => fs.appendFile("./filenames.txt", "\n" + sentences))
        .then(() => {
            const restData = splitteddata.sort(); 
            newFilePath = "./newFilePath.txt";
            return fs.writeFile(newFilePath, restData.join("\n"));
        })
        .then(() => fs.appendFile("./filenames.txt", "\n" + newFilePath))
        .then(() => {
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
        })
        .then(() => console.log("All tasks completed successfully!"))
        .catch(err => console.error("Error found", err.message));
}

module.exports = optOnFiles;

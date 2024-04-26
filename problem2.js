const fs = require("fs").promises;

async function optOnFiles() {
    try {
        // 1. Read the given file lipsum.txt
        const data = await fs.readFile("./lipsum.txt", "utf-8");

        // 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        const uppercaseData = data.toUpperCase();
        const upperCasefile = "./upper_case.txt";
        await fs.writeFile(upperCasefile, uppercaseData);
        await fs.writeFile("./filenames.txt", upperCasefile);

        // 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        const lowercaseContent = uppercaseData.toLowerCase();
        const splitteddata = lowercaseContent.split('.');
        const sentences = "./sentences.txt";
        await fs.writeFile(sentences, splitteddata.join("\n"));
        await fs.appendFile("./filenames.txt", "\n" + sentences);

        // 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        const restData = splitteddata.sort();
        const newFilePath = "./newFilePath.txt";
        await fs.writeFile(newFilePath, restData.join("\n"));
        await fs.appendFile("./filenames.txt", "\n" + newFilePath);

        // 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
        const filenamesData = await fs.readFile("./filenames.txt", "utf-8");
        const filenames = filenamesData.split('\n');
        const promises = filenames.map(async (filename) => {
            if (filename !== '') {
                try {
                    await fs.unlink(filename);
                    console.log(`${filename} deleted.`);
                } catch (err) {
                    console.error(`Error deleting ${filename}:`, err);
                }
            }
        });
        await Promise.all(promises);

        console.log("All tasks completed successfully!");
    } catch (err) {
        console.error("Error found", err.message);
    }
}

module.exports = optOnFiles;

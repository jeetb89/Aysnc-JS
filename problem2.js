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
    fs.writeFile(filePath, data, (err) => {
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
    fs.appendFile(filePath, data, (err) => {
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
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const filename = "./filename.txt";
const uppercasefilep = "./upperCasefile";
const lowercasefilep = "./lowerCasefile";
const sortedfilep = "./sortedfile";

function optOnFiles() {
  // 1. Read the given file lipsum.txt
  return readFilePromise("./lipsum.txt")
    .then((data) => {
      const uppercasedata = data.toUpperCase();
                 
      return writeFilePromise(uppercasefilep, uppercasedata);
    })
    .then(() => {
        console.log('Upper CAse file created')
      appendFilePromise(filename, uppercasefilep);
      return readFilePromise(uppercasefilep);
    })
    .then((data) => {
      const lowercasedata = data.toLowerCase();
      const splitteddata = lowercasedata.split(".").join("\n");
      return writeFilePromise(lowercasefilep, splitteddata);
    })
    .then(() => {
       console.log('LOwer case file created')
        return appendFilePromise(filename, "\n" + lowercasefilep);
    })
    .then(() => {
      return readFilePromise(lowercasefilep);
    })
    .then((data) => {
      const sorteddata = data.split("\n").sort();
      return writeFilePromise(sortedfilep, sorteddata.join('\n'))
      .then(() => {
        console.log('Sorted File created')
        appendFilePromise(filename, "\n" + sortedfilep);
      });
    })
    .then(() => {
      return readFilePromise(filename);
    })
    .then((data) => {
      const filenames = data.toString().split("\n");
      const promise = filenames.map((file) => {
        return unlinkFilePromise(file.trim());
      });

      Promise.all(promise).then(()=>{
        console.log('All files deleted')
      })
    })
    .catch((error) => {
      console.log(error.message);
    });
}

module.exports = optOnFiles;

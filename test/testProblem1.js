createRandomjsonFiles=require('../problem1.js');


try{
    const directoryPath = 'random_files';
    const numberOfFiles = 5;

    createRandomjsonFiles(directoryPath, numberOfFiles)
   
}catch(error){
     console.error(error.message);
}

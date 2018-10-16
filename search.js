
const path = require('path');
const fs = require('fs');

const logWrongUsageMessage = "USAGE: node search [EXT] [TEXT]";
const notFoundMessage = "No file was found";
var args = process.argv.slice(2); //returns logs 'params', after exe command.
var stringNotFoundFlag = 0; //turn on if string was found

//validation - correct input
if(process.argv.length !== 4){
    console.log(logWrongUsageMessage);
    return;
}

var fileExtension = "." + args[0];
var stringToCheck = args[1];

fromDir(__dirname, fileExtension); // __dirname - current directory

//check if string not found
if(stringNotFoundFlag === 0){
    console.log(notFoundMessage);
    return;
}

//recursive search all subdirectories
function fromDir(startPath , filter){

//    console.log('Starting from dir '+startPath+'/'); //to see current recursive directory.

    if (!fs.existsSync(startPath)){ //Returns true if the path exists, false otherwise.
        console.log("No file was found" , startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for(var i = 0; i < files.length; i++){
        var filename = path.join(startPath , files[i]);

        if(fs.lstatSync(filename).isDirectory()){ //Returns true if the fs.Stats Object describes a file system directory.
            fromDir(filename , filter); //recurse
        }
        else if (filename.indexOf(filter) >= 0) { //Returns true is file extension is a current filter.

            var fileData = fs.readFileSync(files[i]);
            if(fileData.includes(stringToCheck)) {
             //   console.log(path.isAbsolute(filename)); //true if current path is absolute
                console.log(filename);
                stringNotFoundFlag = 1;
            }
        }
    }
}






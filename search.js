var logEmptyMessage = "USAGE: node search [EXT] [TEXT]";
var notFoundMessage = "No file was found";
var args = process.argv.slice(2); //returns logs after exe command 'params'
var flag = 0; //turn on if string was found

//validation - correct input
if(args.length === 0 || args.length === 1){
    console.log(logEmptyMessage);
    return;
}

var fileExtension = "." + args[0];
var stringToCheck = args[1];
var currentDirection = `${process.cwd()}`; //current direction

var path = require('path');
var fs = require('fs'); // fs module provides an API for interacting with the file system

fromDir(currentDirection, fileExtension);

//check if string not found
if(flag === 0){
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
        else if (filename.indexOf(filter) >= 0) { //Returns true is file extension is a correct filter.

            var fileData = fs.readFileSync(files[i]);
            if(fileData.includes(stringToCheck)) {
                console.log(filename);
                flag = 1;
            }
        }
    }
}






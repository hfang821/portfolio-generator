const fs = require('fs');
const generatePage = require('./src/page-template.js');

//const means the defined variable can't be reassigned a new value.
const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs; 

fs.writeFile('./index.html', generatePage(name,github), err => {
    if (err) throw new Error(err);

    console.log('Portfolio complete! check out index.html to see the output!');
});




/*
console.log(profileDataArgs);

const printProfileData = profileDataArr => {

    //This...

    for(let i =0; i<profileDataArr.length; i++) {
        console.log(profileDataArr[i]);
    }

    console.log('=========');

    //Is the Same as this...

    profileDataArr.forEach(profileItem=>console.log(profileItem));

};

printProfileData(profileDataArgs);

*/

//let: block-scoped (will not be redefined in the global if defined in a block)
//var: function-scoped (will be redefined in the global)



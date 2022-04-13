const inquirer = require('inquirer');

const promptUser =() =>{
 return inquirer
  .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
      },
      {
          type: 'input',
          name: 'github',
          message: 'Enter your github username'
      },
      {
          type: 'input',
          name: 'about',
          message: 'Provide some information about yourself: '
      }
  ]);
};

//ask TA: what's the point of including this "portfolioData" as it is empty when the function is called.
  const promptProject = portfolioData => {
      //if theres no project array property, create one
      if(!portfolioData.projects){
        portfolioData.projects = [];
      }
      console.log(`
      =====================
      Add a New Project
      =====================
      `);
      return inquirer.prompt([
          {
              type:'input',
              name: 'name',
              message: 'What is the name of your project?'
          },
          {
              type:'input',
              name: 'description',
              message:'Provide a description of your project (Required)'
          },
          {
              type:'checkbox',
              name: 'languages',
              message: 'What did you build this project with? (Check all that apply)',
              choices: ['JavaScript', 'Html', 'CSS','ES6', 'JQuery', 'Bootstrap', 'Node']
          },
          {
              type: 'confirm',
              name: 'feature',
              message: 'Would you like to feature this project?',
              default: false
          },
          {
              type: 'confirm',
              name: 'confirmAddProject',
              message: 'Would you like to enter another project?',
              default: false
          }
      ])
      .then(projectData => {
          portfolioData.projects.push(projectData);
          if(projectData.confirmAddProject) {
              return promptProject(portfolioData);
          } else {
              return portfolioData;
          }
      });
  };

  promptUser()
    .then(promptProject)
    .then(portfolioData => console.log(portfolioData));


// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// //const means the defined variable can't be reassigned a new value.
// const profileDataArgs = process.argv.slice(2);

// const [name, github] = profileDataArgs; 

// fs.writeFile('./index.html', generatePage(name,github), err => {
//     if (err) throw new Error(err);

//     console.log('Portfolio complete! check out index.html to see the output!');
// });




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



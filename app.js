const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template');

const promptUser =() =>{
 return inquirer
  .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
            if(nameInput){
                return true;
            } else {
                console.log('Please enter your name!');
                return false;
            }
        }
      },
      {
          type: 'input',
          name: 'github',
          message: 'Enter your github username',
          validate: gitInput => {
              if(gitInput){
                  return true;
              } else {
                  console.log('Please enter your github username');
                  return false;
              }
          }
      },

      {
          type:'confirm',
          name: 'confirmAbout',
          message: 'Would you like to enter some information about yourself for an "About" section?',
          default: true
      },

      {
          type: 'input',
          name: 'about',
          message: 'Provide some information about yourself: ',
          //pass an object containing user's answers to the when function.
          when: ({confirmAbout}) => {
              if (confirmAbout){
                  return true;
              } else {
                  return false;
              }
          }
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
              message: 'What is the name of your project?',
              validate: projectInput => {
                if(projectInput){
                    return true;
                } else {
                    console.log('Please enter a project name');
                    return false;
                }
              }
          },
          {
              type:'input',
              name: 'description',
              message:'Provide a description of your project (Required)',
              validate: descriptionInput => {
                  if(descriptionInput){
                      return true;
                  } else {
                      console.log('enter a description of your project!');
                      return false;
                  }
              }
          },
          {
              type:'checkbox',
              name: 'languages',
              message: 'What did you build this project with? (Check all that apply)',
              choices: ['JavaScript', 'Html', 'CSS','ES6', 'JQuery', 'Bootstrap', 'Node']
          },
          {
              type:'input',
              name: 'link',
              message: 'Enter the github link to your project! (Required)',
              validate: linkInput => {
                  if(linkInput){
                      return true;
                  } else {
                      console.log('Please enter a link to your project');
                      return false;
                  }
              }
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
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);

        fs.writeFile('./dist/index.html', pageHTML, err => {
            if(err) {
                console.log(err);
                return;
            }
            console.log('Page created! Check out index.html in this directory to see it!');

            fs.copyFile('./src/style.css', './dist/style.css', err => {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log('Style Sheet copied successfully!');
            });
        });
    });


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



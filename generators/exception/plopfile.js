module.exports = (plop) => {
  plop.setGenerator('template', {
    description: 'Create a template',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your module exception module?'
      },
      {
        type: 'input',
        name: 'exception',
        message: 'What is your module exception name?'
      }
    ],
    actions: ({ name }) => {
      let actions = [];

      //Create controller file
      actions.push({
        type: 'add',
        path: `../../src/modules/{{lowerCase name}}/exceptions/{{upperCase exception}}.exception.ts`,
        templateFile: './templates/exception-template.hbs'
      });

      return actions;
    }
  });
};

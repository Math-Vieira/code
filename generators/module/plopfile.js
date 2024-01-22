module.exports = (plop) => {
  // create your generators here
  plop.setHelper(
    'isAuthenticated',
    (templateType) => templateType === 'authenticated'
  );

  plop.setGenerator('template', {
    description: 'Create a template',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your module name?'
      }
    ],
    actions: ({ name }) => {
      let actions = [];

      //Create controller file
      actions.push({
        type: 'add',
        path: `../../src/modules/{{lowerCase name}}/{{camelCase name}}.controller.ts`,
        templateFile: './templates/controller-template.hbs'
      });

      //Create module file
      actions.push({
        type: 'add',
        path: `../../src/modules/{{lowerCase name}}/{{camelCase name}}.module.ts`,
        templateFile: './templates/module-template.hbs'
      });

      //Create services files
      actions.push({
        type: 'add',
        path: `../../src/modules/{{camelCase name}}/services/{{camelCase name}}-create.service.ts`,
        templateFile: './templates/create-service-template.hbs'
      });
      actions.push({
        type: 'add',
        path: `../../src/modules/{{camelCase name}}/services/{{camelCase name}}-edit.service.ts`,
        templateFile: './templates/edit-service-template.hbs'
      });
      actions.push({
        type: 'add',
        path: `../../src/modules/{{camelCase name}}/services/{{camelCase name}}-get.service.ts`,
        templateFile: './templates/get-service-template.hbs'
      });
      actions.push({
        type: 'add',
        path: `../../src/modules/{{camelCase name}}/services/{{camelCase name}}-get-all.service.ts`,
        templateFile: './templates/get-all-service-template.hbs'
      });
      actions.push({
        type: 'add',
        path: `../../src/modules/{{camelCase name}}/services/{{camelCase name}}-delete.service.ts`,
        templateFile: './templates/delete-service-template.hbs'
      });

      //Create dto's
      actions.push({
        type: 'add',
        path: `../../src/modules/{{camelCase name}}/dto/create-{{camelCase name}}.dto.ts`,
        templateFile: './templates/create-dto-template.hbs'
      });
      actions.push({
        type: 'add',
        path: `../../src/modules/{{camelCase name}}/dto/update-{{camelCase name}}.dto.ts`,
        templateFile: './templates/update-dto-template.hbs'
      });

      //Create entity
      actions.push({
        type: 'add',
        path: `../../src/modules/{{camelCase name}}/entities/{{name}}.entity.ts`,
        templateFile: './templates/entity-template.hbs'
      });

      //Create repository
      actions.push({
        type: 'add',
        path: `../../src/modules/{{camelCase name}}/repository/{{name}}.repository.ts`,
        templateFile: './templates/repository-template.hbs'
      });

      return actions;
    }
  });
};

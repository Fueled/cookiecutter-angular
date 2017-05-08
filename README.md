cookiecutter-angular
====================

Project template for angular-js based web projects, with a login.

## Features

* Angular JS 1.5.8
* Foundation 5.4.1
* Gulp – Scss, BrowserSync, image handling
* Restangular
* HTML5 URL structure (no hashbang)

## Getting Started

You need to have `cookiecutter` installed in order to scafold a new project from this template. If you have `pip` installed, you simply do this by running:

    pip install --upgrade cookiecutter

After the installation is successful, you can create a new django project by simply running:

    cookiecutter https://github.com/Fueled/cookiecutter-angular

It will ask you to some questions as follows, after which it will create a new project in your current working directory

* project_name
* base_app_name
* repo_name
* github_username
* github_reponame
* project_description
* timezone
* version
* api_base_url
* api_auth_url
* server_auth_username
* server_auth_password

Once the cookiecutter is finishes, you'll have:

1. An angular app in itself

Now the only thing you'll need to do is:

1. `cd` into the new `repo_name` folder
2. run `npm install`
3. run `bower install`
4. run `gulp`

Read the instructions in `README.md`, inside the project to get much detailed instructions.

--------

Built with ♥ at [Fueled](http://fueled.com)

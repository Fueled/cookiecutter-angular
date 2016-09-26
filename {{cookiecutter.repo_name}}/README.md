{{ cookiecutter.project_name }}

Version: {{ cookiecutter.version }}

{{ cookiecutter.project_description }}

Getting up and running

Minimum requirements: Node, setup is tested on Mac OSX only.

    npm install -g gulp bower
    npm install
    bower install

for starting development use

    gulp 


To create a dist package for deployment use

    gulp build


Golden Rule:

Anything in master is always deployable.
Avoid working on master branch, create a new branch with meaningful name, send pull request asap. Be vocal!

Refer to CONTRIBUTING.md

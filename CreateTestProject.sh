#!/bin/bash

rm -rf hello-world/;
yes 'y' | cookiecutter . --no-input


echo "Hello World Created"
cd hello-world/;

echo "Installing gulp and bower globally"
npm install -g gulp bower yarn

echo "Installing project Dependencies"
yarn install;

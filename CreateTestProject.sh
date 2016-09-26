#!/bin/bash

rm -rf Hello\ World/;
yes 'y' | cookiecutter . --no-input


echo "Hello World Created"
cd Hello\ World/;

echo "Installing gulp and bower globally"
npm install -g gulp bower

echo "Installing project Dependencies"
npm install;
bower install;

#!/bin/bash
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

# Ensure newline at EOF
find . ! -path "*/venv/*" -type f -name "*.py" -exec bash -c "tail -n1 {} | read -r _ || echo >> {}" \;

echo "${green}[Finished]${reset}"

echo "==> Setup project dependencies? It will:"
echo "  - Install development requirements using npm and bower"
echo "  - Initialize git."
echo "  - Create git tag {{ cookiecutter.version }}."
echo -n "Would you like to perform these steps? (y/[n]) "
echo ""

# Inside CI, always assume the answer is yes! :)
if [ $CI ]; then
    yn="yes"
else
    read  yn
fi

if echo "$yn" | grep -iq "^y"; then
    echo "==> Checking system dependencies. You may need to enter your sudo password."

    echo "==> Install npm dependencies"
    npm install

    echo "==> Install bower dependencies"
    bower install

    echo "==> Initialize git repo and create first commit and tag it with v{{ cookiecutter.version }}"
    git init
    git add .
    git commit -am "chore(setup): create base angular project."
    git tag v{{ cookiecutter.version }}


    OUT=$?
    if [ $OUT -eq 0 ]; then
        echo "${green}============================================"
        echo "All set! Refer README to get started."
        echo "${green} ============> HAPPY CODING <============ ${reset}"
    else
        echo "${red}============================================"
        echo "          Oops! Something went wrong!!      "
        echo "============================================${reset}"
        echo ""
        echo -n "HINT: Make sure you have installed all OS dependencies. "
        echo "Check the logs above, they might give you some clues."
    fi
else
    echo "==> Skipping project setup..."
    echo "==> You can now 'cd {{ cookiecutter.repo_name }}/' and explore the project. "
    echo "    Read 'README.md' inside it for further setup instructions!"
    echo ""
    echo "${green} ============> HAPPY CODING <============ ${reset}"
fi

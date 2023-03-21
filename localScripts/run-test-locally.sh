#!/usr/bin/env bash


# Functions section
readenv() {
  set -o allexport # Automatically exports variables
  . back/.env.test # Reads env file and gets all the variables
  set +o allexport # Remove automatic variable export
}

# Retrieves all variables from the .env.local file
readenv

# Variables
folderToTest=$1

cd back

# If folder to test is defined, use it
if [ -n "$folderToTest" ] ; then
  yarn jest ./tests/api/$folderToTest --color --detectOpenHandles
else 
  yarn jest ./tests/api/ --color --detectOpenHandles
fi
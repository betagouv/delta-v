#!/usr/bin/env bash


# Functions section
readenv() {
  set -o allexport # Automatically exports variables
  . back/.env.dist # Reads env file and gets all the variables
  set +o allexport # Remove automatic variable export
}

# Retrieves all variables from the .env.local file
readenv

yarn typeorm:drop && yarn migration:run && yarn fixtures:load
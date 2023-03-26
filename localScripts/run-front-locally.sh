#!/usr/bin/env bash

# Variables
command=$1

cd front && yarn

# If command is defined, use it
if [ -n "$command" ] ; then
  yarn $command
else 
  yarn dev
fi
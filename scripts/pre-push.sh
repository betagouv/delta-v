#!/bin/bash

current_hour=$(date +%H)
allowed_start_hour=7 # Start hour allowed
allowed_end_hour=19 # End hour allowed
day_of_week=$(date +%u) # Day of the week (1 to 7)

if [ "$day_of_week" -ge 6 ] || [ "$current_hour" -lt "$allowed_start_hour" ] || [ "$current_hour" -ge "$allowed_end_hour" ]; then
  echo "Push is forbidden outside of allowed hours (Mon-Fri, 7am-7pm)"
  exit 1
fi
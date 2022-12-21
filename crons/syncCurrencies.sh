#! /bin/bash -l

if [ ${APP_FOLDER} = "./back" ]; then
    echo "back app - start cron"
    cd ${APP_HOME}/back
    yarn cron:syncCurrencies
else
    echo "not back app - exit cron"
fi
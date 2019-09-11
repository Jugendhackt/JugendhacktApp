#!/usr/bin/env sh

# You can use a cron job service and configure it like this:
#     $ crontab -e
#     * */20 * * * $USER /path/to/cron.sh >/dev/null 2>&1 # Updates every 20 hours

PROJECT_DIR="${HOME}/jugendhacktapp/" # Sorry for constant directory
EMAIL=$(cat "${PROJECT_DIR}/.env" | grep BadgrMail | cut -f2 -d'=')
PASS=$(cat "${PROJECT_DIR}/.env" | grep BadgrPass | cut -f2 -d'=')
ACCESS=$(curl -X POST 'https://api.badgr.io/o/token' -d "username=${EMAIL}&password=${PASS}" | jq .access_token | sed 's/\"//g')
sed -i "/^BadgrAccess=/s/=.*/=$ACCESS/" "${PROJECT_DIR}/.env"

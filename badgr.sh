#!/usr/bin/env sh

# You can use a cron job service and configure it like this:
#     $ crontab -e
#     * */20 * * * $USER /path/to/cron.sh >/dev/null 2>&1 # Updates every 20 hours

EMAIL=$(cat ./.env | grep BadgrMail | cut -f2 -d'=')
PASS=$(cat ./.env | grep BadgrPass | cut -f2 -d'=')
ACCESS=$(curl -X POST 'https://api.badgr.io/o/token' -d "username=${EMAIL}&password=${PASS}" | jq .access_token | sed 's/\"//g')
sed -i "/^BadgrAccess=/s/=.*/=$ACCESS/" .env

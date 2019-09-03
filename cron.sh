#!/usr/bin/env sh

# This file can be used for seqential API requests to refresh the server cache
# You can use a cron job service and configure it like this:
#     $ crontab -e
#     */15 * * * * $USER /path/to/cron.sh >/dev/null 2>&1 # Updates every 15 minutes

PORT=$(cat ./.env | grep PORT | cut -f2 -d'=')
curl -s -o /dev/null "http://localhost:${PORT}/api/events"
curl -s -o /dev/null "http://localhost:${PORT}/api/twitter"

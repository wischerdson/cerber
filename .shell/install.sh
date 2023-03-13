#!/usr/bin/env bash

set -eu

YELLOW_BG='\033[43m'
YELLOW_FG='\033[43m'
LIGHT_GREEN_BG='\033[1;42m'
GREEN_BG='\033[42m'
LIGHT_BLUE_FG='\033[1;34m'
BLACK_FG='\033[30m'
NC='\033[0m'

path=$(dirname $(dirname $(realpath $0)../))

if ! docker info > /dev/null 2>&1; then
	echo "You need to install ${LIGHT_BLUE_FG}Docker${NC}"
	exit 1
fi

if ! docker-compose -v > /dev/null 2>&1; then
	echo "You need to install ${LIGHT_BLUE_FG}Docker compose${NC}"
	exit 1
fi

if [ ! -f $path/.env ]; then
	echo -e "\n${YELLOW_BG}${BLACK_FG}   Copying backend .env file   ${NC}"
	printf "Check file ${LIGHT_BLUE_FG}$(realpath .env)${NC}, change it if necessary and press Enter"
	cp $path/.env.example $path/.env
	read _
fi

if [ ! -f $path/client/.env ] && [ -f $path/client/.env.example ]; then
	echo -e "\n${YELLOW_BG}${BLACK_FG}   Copying client .env file   ${NC}"
	cp ./client/.env.example ./client/.env
	printf "Check file ${LIGHT_BLUE_FG}$(realpath ./client/.env)${NC}, change it if necessary and press Enter"
	read _
fi

set -a
. $path/.env
set +a

chmod ug+x $path/corn \
&& chmod ug+x $path/artisan \
&& mkdir -p $path/.runtime/cache \
&& mkdir -p $path/.runtime/logs \
&& mkdir -p $path/.runtime/temp

echo -e "\n${YELLOW_BG}${BLACK_FG}   Up application   ${NC}"
$path/corn up -d

echo -e "\n${YELLOW_BG}${BLACK_FG}   Setting permissions   ${NC}"
$path/corn php chmod -R ug+w $path/.runtime
$path/corn php chown -R root:www-data $path/.runtime
$path/corn php chmod -R ug+w $path/storage/app
$path/corn php chown -R root:www-data $path/storage/app

echo -e "\n${YELLOW_BG}${BLACK_FG}   Installing dependencies   ${NC}"
$path/corn npm install --no-audit

if [ "$APP_ENV" = "local" ]; then
	$path/corn composer install --no-interaction --prefer-dist --optimize-autoloader
else
	$path/corn composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

	echo -e "\n${YELLOW_BG}${BLACK_FG}   Building client   ${NC}"
	$path/corn npm run build
fi

echo -e "\n${YELLOW_BG}${BLACK_FG}   Generating application key   ${NC}"
$path/corn artisan key:generate

echo -e "\n${YELLOW_BG}${BLACK_FG}   Applying migrations   ${NC}"
$path/corn artisan migrate --force

echo -e "\n${YELLOW_BG}${BLACK_FG}   Data seeding   ${NC}"
$path/corn artisan db:seed --force

echo -e "\n${GREEN_BG}   Application has been installed successfully   ${NC}"

#! /bin/sh

# -e - опция, требующая от bash немедленно выйти, если какая-либо команда имеет ненулевой
# статус выхода
# -u - опция приводит к немедленному завершению работы программы при установке ссылки
# на любую неопределенную переменную (за исключением $* и $@)
set -eu

branch=$1
commit=$2

echo "target branch: $branch"
echo "commit: $commit"

echo "=== Retrieving source code ($commit) ==="

git reset --hard
git clean -fd
git checkout "$branch" -f
git fetch origin "$branch"
git checkout "$commit" -f

# Создаем символьные ссылки если их нет
if [ ! -h ./public/storage ]
then
	docker-compose exec -T php ./artisan storage:link
fi

echo "=== Installing composer dependencies excluding DEV dependencies ==="
docker-compose run composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-ansi

echo "=== Applying migrations ==="
docker-compose exec -T php ./artisan migrate --force

echo "=== Data seeding ==="
docker-compose exec -T php ./artisan db:seed --force

echo "=== Fresh cache ==="
docker-compose exec -T php ./artisan optimize -n
docker-compose exec -T php ./artisan event:cache -n

echo "=== Queue restarting ==="
docker-compose exec -T php ./artisan queue:restart
docker-compose restart queue

echo "=== NGINX config reloading ==="
docker-compose exec nginx nginx -s reload

echo "=== Nuxt reloading ==="
docker-compose exec nodejs npm ci --prefer-offline --no-audit
docker-compose exec nodejs npm run build
docker-compose restart nodejs

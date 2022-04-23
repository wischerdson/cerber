#! /bin/bash

# Only for development purposes

set -eu

ssl_dir="./.runtime/ssl"

if [ ! -d "$ssl_dir" ]; then
	mkdir -p "$ssl_dir"
fi

cert_pass="1234secret"

# Скрипт написан на основе источника:
# https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/

# Первым шагом является создание корневого сертификата уровня защищенных сокетов (SSL). Этот
# корневой сертификат затем можно использовать для подписи любого количества сертификатов,
# которые можно создать для отдельных доменов.
#
# Создаем ключ RSA-2048 и сохраняем его в файле RootCA.key. Этот файл будет использоваться в
# качестве ключа для создания корневого SSL-сертификата.
openssl genrsa -des3 -out $ssl_dir/rootCA.key -passout pass:$cert_pass 2048

# Воспользуемся сгенерируемым ключом для создания нового корневого SSL-сертификата.
# Сохраните его в файл с именем Root.pem. Срок действия этого сертификата составит 1024 дня.
openssl req -x509 -new -nodes -key $ssl_dir/rootCA.key -sha256 -days 1024 -out $ssl_dir/rootCA.pem -passin pass:$cert_pass -subj "/C=US/CN=./"

# Создадим новый файл конфигурации OpenSSL server.csr.cnf, чтобы можно было импортировать эти
# параметры при создании сертификата.
cat > $ssl_dir/server.csr.cnf << ENDOFFILE
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn

[dn]
C=US
ST=RandomState
L=RandomCity
O=RandomOrganization
OU=RandomOrganizationUnit
emailAddress=hello@example.com
CN = localhost
ENDOFFILE

# Создадим файл v3.ext, чтобы создать сертификат X509 v3
cat > $ssl_dir/v3.ext << ENDOFFILE
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
ENDOFFILE

# Создаем ключ сертификата для localhost, используя параметры конфигурации, хранящиеся в файле
# server.csr.cnf.
openssl req -new -sha256 -nodes -out $ssl_dir/server.csr -newkey rsa:2048 -keyout $ssl_dir/server.key -config <( cat $ssl_dir/server.csr.cnf )

# Запрос на подписание сертификата выдается с помощью корневого SSL-сертификата, который мы
# создали ранее для создания сертификата домена для localhost. Результатом является файл
# сертификата с именем server.crt.
openssl x509 -req -in $ssl_dir/server.csr -CA $ssl_dir/rootCA.pem -CAkey $ssl_dir/rootCA.key -passin pass:$cert_pass -CAcreateserial -out $ssl_dir/server.crt -days 500 -sha256 -extfile $ssl_dir/v3.ext

DOMAIN=$1
cd ../server
docker build -t kucar/$DOMAIN -f ../deployment/$DOMAIN/Dockerfile .
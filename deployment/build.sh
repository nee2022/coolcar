DOMAIN=$1
cd ../server
docker build -t coolcar/$DOMAIN -f ../deployment/$DOMAIN/Dockerfile .
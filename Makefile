start:
	sh ./scripts/stopServers.sh || true
	(cd api && npm run dev) &
	(cd client && npm start)

stop:
	sh ./scripts/stopServers.sh || true

start-be:
	sh ./scripts/stopServers.sh || true
	cd api && npm run dev

start-fe:
	sh ./scripts/stopServers.sh || true
	cd client && npm start


install:
	(cd api && npm install) &
	(cd client && npm install)

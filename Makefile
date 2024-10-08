
.PHONY: run-mongo-local
run-mongo-local:
	docker compose up -d

.PHONY: stop-mongo-local
stop-mongo-local:
	docker compose down -v --rmi all --remove-orphans

.PHONY: migrate-db-schema
migrate-db-schema:
	npx prisma db push

.PHONY: run-frontend
run-frontend:
	cd ./drom-airbnb && pnpm run dev
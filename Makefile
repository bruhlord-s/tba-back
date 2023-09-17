init: ## Copy config files from samples
	@echo "Creating .env"
	@cp .env.sample .env
	@echo "Creating docker-compose.yml"
	@cp docker-compose.yml.sample docker-compose.yml

build: ## Build docker containers
	@docker-compose down
	@docker-compose build

up:	## Start containers
	@docker-compose down
	@docker-compose up

up-quiet: ## Start containers with no output
	@docker-compose down
	@docker-compose up -d

down: ## Shut down containers
	@docker-compose down

migrate: ## Run migrations
	@docker exec -it api npx prisma migrate dev

api-sh: ## Open bash for api container
	@docker exec -it api /bin/sh

test-watch: ## Run tests in watch mode
	@docker exec -it api npm run test:watch

.PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
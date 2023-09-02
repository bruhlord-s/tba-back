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

	.PHONY: help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
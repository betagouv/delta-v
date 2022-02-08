DOCKER_COMPOSE  = docker-compose
BACK_CONTAINER =  backend-api-delta-v
TEST_BACK_CONTAINER =  e2e-test-backend-api-delta-v
BACK_CONTAINERS =  $(BACK_CONTAINER)


## DOCKER MANAGER
	
.PHONY: start-back
start-back: ## Start the backend containers
	$(DOCKER_COMPOSE) up -d --remove-orphans $(BACK_CONTAINERS)

	
.PHONY: stop
stop: ## Stop all the containers
	$(DOCKER_COMPOSE) stop

## DEPENDENCIES

.PHONY: y-i-back
y-i-back: ## Install dependencies for the backend
	$(DOCKER_COMPOSE) run --rm --no-deps $(BACK_CONTAINER) yarn install

## TESTS

.PHONY: test-back
test-back: ## Run the tests for the backend
	$(DOCKER_COMPOSE) run --rm $(TEST_BACK_CONTAINER) yarn jest tests/$(filter-out $@,$(MAKECMDGOALS)) --color

## HELP

.DEFAULT_GOAL := help
help: ## This help
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help

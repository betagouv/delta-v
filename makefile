DOCKER_COMPOSE  = docker-compose --env-file ../.env.local.declareDouane
USER =  --user $$(id -u):$$(id -g)
DOCKER_COMPOSE_RUN  = $(DOCKER_COMPOSE) run $(USER)

FRONT_CONTAINER =  frontend-web-delta-v
STORYBOOK_CONTAINER =  storybook-delta-v
BACK_CONTAINER =  backend-api-delta-v
DATABASE_CONTAINER = database-delta-v
REDIS_CONTAINER = redis.api.dev.delta-v
ADMIN_DATABASE_CONTAINER = adminer
MAILHOG_CONTAINER = mailhog

TEST_BACK_CONTAINER =  e2e-test-backend-api-delta-v
TEST_DATABASE_CONTAINER = e2e-test-redis.api.dev.delta-v e2e-test-database-delta-v

DATABASE_CONTAINERS =  $(DATABASE_CONTAINER) $(ADMIN_DATABASE_CONTAINER)
BACK_CONTAINERS =  $(BACK_CONTAINER) $(REDIS_CONTAINER) $(DATABASE_CONTAINERS) $(MAILHOG_CONTAINER)

##
## -------------------------
## | Delta V - Dev         |
## -------------------------
##

##
## -- DOCKER MANAGER --
##


.PHONY: init
init: pull y-i-back y-i-front init-redis db-fixtures-clear-load db-migrate-run-e2e ## init all project
	
.PHONY: pull
pull: ## Download the latest version of the images
	$(DOCKER_COMPOSE) pull
	
.PHONY: start
start: ## Start the backend containers
	$(DOCKER_COMPOSE) up --remove-orphans $(BACK_CONTAINERS) $(FRONT_CONTAINER)

.PHONY: init-redis
init-redis: ## Start the backend containers
	docker run --rm --name test-redis redis:7-bullseye redis-server --loglevel warning
	
.PHONY: start-back
start-back: ## Start the backend containers
	$(DOCKER_COMPOSE) up -d --remove-orphans $(BACK_CONTAINERS)
	$(DOCKER_COMPOSE) logs -f $(BACK_CONTAINER)
	
.PHONY: start-front
start-front: ## Start the frontend containers
	$(DOCKER_COMPOSE) up --remove-orphans $(FRONT_CONTAINER)

.PHONY: start-storybook
start-storybook: ## Start the storybook containers
	$(DOCKER_COMPOSE) up --remove-orphans $(STORYBOOK_CONTAINER)

	
.PHONY: stop
stop: ## Stop all the containers
	$(DOCKER_COMPOSE) stop

##
## -- INSTANCE RUN --
##

.PHONY: run-back
run-back: ## Run command in the backend container
	$(DOCKER_COMPOSE) run --rm $(BACK_CONTAINER) $(filter-out $@,$(MAKECMDGOALS))
.PHONY: run-back-e2e
run-back-e2e: ## Run command in the backend test container
	$(DOCKER_COMPOSE) run --rm $(TEST_BACK_CONTAINER) $(filter-out $@,$(MAKECMDGOALS))

.PHONY: run-front
run-front: ## Run command in the frontend container
	$(DOCKER_COMPOSE) run --rm $(FRONT_CONTAINER) $(filter-out $@,$(MAKECMDGOALS))

##
## -- BUILD --
##

.PHONY: build-front
build-front: ## build the frontend container
	$(DOCKER_COMPOSE) run --rm $(FRONT_CONTAINER) yarn build

.PHONY: start-build-front
start-build-front: ## start the build the frontend container
	$(DOCKER_COMPOSE) run --rm $(FRONT_CONTAINER) yarn start

.PHONY: build-back
build-back: ## build the back container
	$(DOCKER_COMPOSE) run --rm $(BACK_CONTAINER) yarn build

.PHONY: start-build-back
start-build-back: ## start the build the frontend container
	$(DOCKER_COMPOSE) run --rm $(BACK_CONTAINER) yarn start
##
## -- DEPENDENCIES --
##

.PHONY: y-i-back
y-i-back: ## Install dependencies for the backend
	$(DOCKER_COMPOSE) run --rm --no-deps $(BACK_CONTAINER) yarn install --ignore-scripts
	$(DOCKER_COMPOSE) run --rm --no-deps $(BACK_CONTAINER) npm rebuild bcrypt --build-from-source

.PHONY: y-i-front
y-i-front: ## Install dependencies for the frontend
	$(DOCKER_COMPOSE) run --rm --no-deps $(FRONT_CONTAINER) yarn install --ignore-scripts

##
## -- TESTS --
##

.PHONY: test-back
test-back: ## Run the tests for the backend
	$(DOCKER_COMPOSE) run --rm $(TEST_BACK_CONTAINER) yarn jest $(filter-out $@,$(MAKECMDGOALS)) --color
	$(DOCKER_COMPOSE) stop $(TEST_DATABASE_CONTAINER)

.PHONY: test-back-watch
test-back-watch: ## Run the tests for the backend with watch
	$(DOCKER_COMPOSE) run --rm $(TEST_BACK_CONTAINER) yarn jest:watch $(filter-out $@,$(MAKECMDGOALS)) --color
	$(DOCKER_COMPOSE) stop $(TEST_DATABASE_CONTAINER)

.PHONY: test-front
test-front: ## Run the tests for the front
	$(DOCKER_COMPOSE) run --rm $(FRONT_CONTAINER) yarn jest $(filter-out $@,$(MAKECMDGOALS)) --color

.PHONY: test-front-watch
test-front-watch: ## Run the tests for the front with watch
	$(DOCKER_COMPOSE) run --rm $(FRONT_CONTAINER) yarn jest:watch $(filter-out $@,$(MAKECMDGOALS)) --color

.PHONY: lint-back
lint-back: ## Run the linter for the backend
	$(DOCKER_COMPOSE) run --rm $(BACK_CONTAINER) yarn lint

.PHONY: lint-front
lint-front: ## Run the linter for the frontend
	$(DOCKER_COMPOSE) run --rm $(FRONT_CONTAINER) yarn lint

##
## -- DATABASE --
##

.PHONY: db-drop
db-drop: ## drop the database
	$(DOCKER_COMPOSE_RUN) --rm $(BACK_CONTAINER) yarn typeorm:drop
.PHONY: db-drop-e2e
db-drop-e2e: ## drop e2e database
	$(DOCKER_COMPOSE_RUN) --rm $(TEST_BACK_CONTAINER) yarn typeorm:drop

	
.PHONY: db-generate-migration
db-generate-migration: ## generate migration, put YOUR_NAME in this command to custom the migration name
	$(DOCKER_COMPOSE_RUN) --rm $(BACK_CONTAINER) yarn migration:generate ./src/migrations/$(filter-out $@,$(MAKECMDGOALS))

.PHONY: db-migrate-run
db-migrate-run: ## run migrations for dev database
	$(DOCKER_COMPOSE_RUN) --rm $(BACK_CONTAINER) yarn migration:run
.PHONY: db-migrate-run-e2e
db-migrate-run-e2e: ## run migrations for e2e database
	$(DOCKER_COMPOSE_RUN) --rm $(TEST_BACK_CONTAINER) yarn migration:run

.PHONY: db-revert-run
db-revert-run: ## revert migrations for dev database
	$(DOCKER_COMPOSE_RUN) --rm $(BACK_CONTAINER) yarn migration:revert
.PHONY: db-revert-run-e2e
db-revert-run-e2e: ## revert migrations for e2e database
	$(DOCKER_COMPOSE_RUN) --rm $(TEST_BACK_CONTAINER) yarn migration:revert

.PHONY: db-fixtures-load
db-fixtures-load: ## load fixtures
	$(DOCKER_COMPOSE_RUN) --rm $(BACK_CONTAINER) yarn fixtures:load

.PHONY: db-fixtures-clear-load
db-fixtures-clear-load: ## load fixtures
	$(DOCKER_COMPOSE_RUN) --rm $(BACK_CONTAINER) bash -c "yarn typeorm:drop && yarn migration:run && yarn fixtures:load"

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# ~~~ AUTO-DOCUMENTED HELP ~~~
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ARGS = $(filter-out $@,$(MAKECMDGOALS))
.DEFAULT_GOAL := help   # Show help without arguments
SPACE  = 40             # Space before description
%:                      # Recipe generate AGRS
	@:
help:                   # Recipe generate help with double hash prefix
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-${SPACE}s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help
##

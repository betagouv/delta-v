DOCKER_COMPOSE  = docker-compose
USER =  --user $$(id -u):$$(id -g)
DOCKER_COMPOSE_RUN  = $(DOCKER_COMPOSE) run $(USER)

FRONT_CONTAINER =  frontend-web-delta-v
STORYBOOK_CONTAINER =  storybook-delta-v
BACK_CONTAINER =  backend-api-delta-v
DATABASE_CONTAINER = database-delta-v
ADMIN_DATABASE_CONTAINER = adminer

TEST_BACK_CONTAINER =  e2e-test-backend-api-delta-v
TEST_DATABASE_CONTAINER =  e2e-test-database-delta-v

DATABASE_CONTAINERS =  $(DATABASE_CONTAINER) $(ADMIN_DATABASE_CONTAINER)
BACK_CONTAINERS =  $(BACK_CONTAINER) $(DATABASE_CONTAINERS)
SCRIPT_TO_RUN_BACK_LOCALLY=./localScripts/run-back-locally.sh
SCRIPT_TO_RUN_FRONT_LOCALLY=./localScripts/run-front-locally.sh
SCRIPT_TO_TEST_LOCALLY=./localScripts/run-test-locally.sh
export FOLDER_TO_TEST=$(word 2,$(MAKECMDGOALS))
export YARN_COMMAND=$(word 2,$(MAKECMDGOALS))

##
## -------------------------
## | Delta V - Dev         |
## -------------------------
##

##
## -- DOCKER MANAGER --
##
	
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

.PHONY: run-back-locally
#%% Create and start containers
run-back-locally:
	@echo "| Run start back locally |"
	$(DOCKER_COMPOSE) up --remove-orphans -d $(DATABASE_CONTAINERS)
	eval '$(SCRIPT_TO_RUN_BACK_LOCALLY) $(YARN_COMMAND)'
	@echo "Sleeping for 20s waiting for previous actions to complete"
	@sleep 20

.PHONY: run-front-locally
#%% Create and start containers
run-front-locally:
	@echo "| Run front locally |"
	$(DOCKER_COMPOSE) up --remove-orphans -d $(DATABASE_CONTAINERS)
	eval '$(SCRIPT_TO_RUN_FRONT_LOCALLY) $(YARN_COMMAND)'
	@echo "Sleeping for 20s waiting for previous actions to complete"
	@sleep 20

.PHONY: start-storybook-locally
#%% Create and start containers
start-storybook-locally:
	$(DOCKER_COMPOSE) up --remove-orphans -d $(DATABASE_CONTAINERS)
	eval '$(SCRIPT_TO_RUN_FRONT_LOCALLY) "yarn storybook"'
	@echo "Sleeping for 20s waiting for previous actions to complete"
	@sleep 20

	
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

.PHONY: y-i-front
y-i-front: ## Install dependencies for the frontend
	$(DOCKER_COMPOSE) run --rm --no-deps $(FRONT_CONTAINER) yarn install --ignore-scripts

##
## -- TESTS --
##

.PHONY: test-back-locally 
#%% run test back locally
test-back-locally:
	@echo "| Run test back locally |"
	$(DOCKER_COMPOSE) up --remove-orphans -d  $(TEST_BACK_CONTAINER)
	eval '$(SCRIPT_TO_TEST_LOCALLY) $(FOLDER_TO_TEST)'
	@echo "Sleeping for 20s waiting for previous actions to complete"
	@sleep 20

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
	$(DOCKER_COMPOSE_RUN) --rm $(BACK_CONTAINER) yarn migration:generate -n $(filter-out $@,$(MAKECMDGOALS))

.PHONY: db-migrate-run
db-migrate-run: ## run migrations for dev database
	$(DOCKER_COMPOSE_RUN) --rm $(BACK_CONTAINER) yarn migration:run
.PHONY: db-migrate-run-e2e
db-migrate-run-e2e: ## run migrations for e2e database
	$(DOCKER_COMPOSE_RUN) --rm $(TEST_BACK_CONTAINER) yarn migration:run

.PHONY: db-fixtures-load
db-fixtures-load: ## load fixtures
	$(DOCKER_COMPOSE_RUN) --rm $(BACK_CONTAINER) yarn fixtures:load

.PHONY: db-fixtures-clear-load
db-fixtures-clear-load: ## load fixtures
	$(DOCKER_COMPOSE_RUN) --rm $(BACK_CONTAINER) bash -c "yarn typeorm:drop && yarn migration:run && yarn fixtures:load"

.PHONY: db-fixtures-load-locally
#%% install dependencies for back
db-fixtures-load-locally:  ## load fixtures locally
	@echo "| Add Fixtures |"
	$(DOCKER_COMPOSE) up --remove-orphans -d  $(BACK_CONTAINER)
	eval '$(SCRIPT_TO_RUN_BACK_LOCALLY) "yarn typeorm:drop && yarn migration:run && yarn fixtures:load"'
	@echo "Sleeping for 20s waiting for previous actions to complete"
	@echo "| Fixtures added |"

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


yarn --production=false --ignore-scripts
yarn migration:run
yarn fixtures:load
yarn build
yarn --production=true --ignore-scripts
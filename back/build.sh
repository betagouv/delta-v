
yarn --production=false --ignore-scripts
yarn migration:run
yarn build
yarn --production=true --ignore-scripts

yarn install --production=false
yarn migration:run
yarn fixtures:load
yarn build
yarn install --production=true
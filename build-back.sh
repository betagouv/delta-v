cd back
yarn install --production=false
yarn build
yarn typeorm:drop
yarn migration:run
yarn fixtures:load
yarn install --production=true
cd ..
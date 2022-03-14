cd back
yarn install --production=false
# yarn typeorm:drop
yarn migration:run
yarn fixtures:load
yarn build
yarn install --production=true
cd ..
cd back
yarn install --production=false
yarn build
yarn migration:run
yarn install --production=true
cd ..
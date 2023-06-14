cd back
yarn install --production=false
yarn migration:run
yarn build
yarn install --production=true
cd ..
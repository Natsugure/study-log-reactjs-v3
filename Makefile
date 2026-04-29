deploy:
	pnpm run build
	firebase deploy

test:
	pnpm test
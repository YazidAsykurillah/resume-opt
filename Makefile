.PHONY: up down build rebuild shell artisan migrate fresh seed npm dev test tinker logs worker queue

# Start all services
up:
	docker compose up -d

# Stop all services
down:
	docker compose down

# Build Docker images
build:
	docker compose build

# Rebuild Docker images (no cache)
rebuild:
	docker compose build --no-cache

# Open shell in app container
shell:
	docker compose exec app bash

# Run artisan command (usage: make artisan cmd="migrate")
artisan:
	docker compose exec app php artisan $(cmd)

# Run database migrations
migrate:
	docker compose exec app php artisan migrate

# Fresh migrations with seeders
fresh:
	docker compose exec app php artisan migrate:fresh --seed

# Run database seeders
seed:
	docker compose exec app php artisan db:seed

# Run npm command (usage: make npm cmd="install")
npm:
	docker compose exec app npm $(cmd)

# Start Vite dev server
dev:
	docker compose exec app npm run dev

# Run tests
test:
	docker compose exec app php artisan test

# Open Tinker REPL
tinker:
	docker compose exec app php artisan tinker

# View logs
logs:
	docker compose logs -f

# View worker logs
worker:
	docker compose logs -f worker

# Restart queue worker
queue:
	docker compose restart worker

# Run composer command (usage: make composer cmd="require laravel/telescope")
composer:
	docker compose exec app composer $(cmd)

# Check service status
status:
	docker compose ps

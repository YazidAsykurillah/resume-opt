#!/bin/bash
set -e

echo "🚀 ResumeOpt - Starting container initialization..."

# Install Composer dependencies if vendor/autoload.php doesn't exist
if [ ! -f "vendor/autoload.php" ]; then
    echo "📦 Installing Composer dependencies..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# Install NPM dependencies if node_modules/vite doesn't exist
if [ ! -d "node_modules/vite" ]; then
    echo "📦 Installing NPM dependencies..."
    npm install
fi

# Generate application key if not set
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then
    if [ -f ".env" ] && grep -q "APP_KEY=$" .env; then
        echo "🔑 Generating application key..."
        php artisan key:generate --force
    fi
fi

# Clear and cache configuration
echo "⚙️  Optimizing configuration..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Run database migrations
echo "🗄️  Running database migrations..."
php artisan migrate --force 2>/dev/null || echo "⚠️  Migration skipped (database may not be ready yet). Run manually: php artisan migrate"

# Build frontend assets for production, or skip if dev server will be used
if [ "$APP_ENV" = "production" ]; then
    echo "🏗️  Building frontend assets..."
    npm run build
else
    echo "ℹ️  Development mode: Run 'npm run dev' separately for Vite HMR"
fi

echo "✅ ResumeOpt - Container initialization complete!"

# Execute the original command (php-fpm)
exec "$@"

#!/bin/bash

echo "🗄️  Setting up PostgreSQL database for oceans.app..."

# Database configuration
DB_NAME="oceans"
DB_USER="oceans_user"
DB_PASSWORD="oceans_password"

echo "📝 Creating database: $DB_NAME"
echo "👤 Creating user: $DB_USER"

# Create the database and user
psql postgres << EOF
-- Create user if it doesn't exist
DO \$\$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '$DB_USER') THEN
      CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASSWORD';
   END IF;
END
\$\$;

-- Create database if it doesn't exist
SELECT 'CREATE DATABASE $DB_NAME OWNER $DB_USER'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')\gexec

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
GRANT CREATE ON DATABASE $DB_NAME TO $DB_USER;
EOF

if [ $? -eq 0 ]; then
    echo "✅ Database setup completed successfully!"
    echo ""
    echo "📊 Database Details:"
    echo "   Database: $DB_NAME"
    echo "   User: $DB_USER"
    echo "   Password: $DB_PASSWORD"
    echo "   Host: localhost"
    echo "   Port: 5432"
    echo ""
    echo "🔗 Connection URL:"
    echo "   postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME"
    echo ""
    echo "📝 Update your apps/api/.env file with:"
    echo "   DATABASE_URL=\"postgresql://$DB_USER:$DB_PASSWORD@localhost:5432/$DB_NAME\""
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Update apps/api/.env with the DATABASE_URL above"
    echo "   2. Run 'yarn db:generate' to generate Prisma client"
    echo "   3. Run 'yarn db:push' to create database tables"
    echo "   4. Run 'yarn dev' to start the application"
else
    echo "❌ Database setup failed!"
    echo "Please check your PostgreSQL installation and try again."
    exit 1
fi 
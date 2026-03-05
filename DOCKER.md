# Deploy Credit Flow AI with Docker on a VPS

## Prerequisites

- Docker and Docker Compose on your VPS
- PostgreSQL (already running at `DATABASE_URL` or run your own)
- `.env` file with `DATABASE_URL` and `JWT_SECRET`

## Quick start

1. **On your VPS**, clone the repo and go to the project directory:
   ```bash
   cd /path/to/credit-flow-ai
   ```

2. **Create `.env`** (copy from your local or set variables):
   ```bash
   DATABASE_URL="postgresql://user:password@host:5432/dbname"
   JWT_SECRET="your-secret-key"
   ```

3. **Run database migrations** (one-time). From your dev machine (with `DATABASE_URL` pointing at your DB):
   ```bash
   npx prisma migrate deploy
   ```
   Or on the VPS with Prisma installed, set `DATABASE_URL` in `.env` and run the same command.

4. **Build and start the app:**
   ```bash
   docker compose up -d --build
   ```

5. **Open the app** at `http://YOUR_VPS_IP:3000`.

## Commands

| Command | Description |
|--------|-------------|
| `docker compose up -d --build` | Build and run in background |
| `docker compose logs -f app` | Follow app logs |
| `docker compose down` | Stop and remove containers |
| `docker compose pull && docker compose up -d` | Rebuild after git pull |

## Run migrations from host

If Prisma is installed on the VPS (or you run from CI), use:

```bash
export DATABASE_URL="postgresql://..."
npx prisma migrate deploy
```

Then restart the app: `docker compose restart app`.

## Build image only (no Compose)

```bash
docker build -t credit-flow-ai:latest .
docker run -d --name credit-flow-ai -p 3000:3000 --env-file .env credit-flow-ai:latest
```

## Notes

- The app listens on `0.0.0.0:3000` inside the container.
- Use a reverse proxy (e.g. Nginx or Caddy) and HTTPS in production.
- Keep `.env` only on the server; do not commit it.

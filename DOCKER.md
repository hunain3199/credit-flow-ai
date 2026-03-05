# Deploy Credit Flow AI with Docker on a VPS

## Prerequisites

- Docker and Docker Compose on your VPS (see [Install Docker](#install-docker-on-the-vps) if needed)
- **PostgreSQL already deployed on your VPS** (or elsewhere) — the app will connect to it via `DATABASE_URL`
- `.env` file with `DATABASE_URL` (pointing to your existing DB) and `JWT_SECRET`

## Deploy from the `comingsoon` branch

Use these steps to clone the repo on your VPS and run the **comingsoon** branch.

1. **Clone the repository** (replace with your actual repo URL):
   ```bash
   git clone https://github.com/YOUR_USERNAME/credit-flow-ai.git
   cd credit-flow-ai
   ```

2. **Switch to the comingsoon branch:**
   ```bash
   git checkout comingsoon
   ```

3. **Create `.env`** in the project root. Point `DATABASE_URL` to your **existing PostgreSQL** on the VPS (same server or another). Example if Postgres is on the same VPS:
   ```bash
   # If PostgreSQL is on the same VPS, use the host IP (e.g. 127.0.0.1 or your private IP) or host.docker.internal
   DATABASE_URL="postgresql://USER:PASSWORD@host.docker.internal:5432/DATABASE_NAME"
   JWT_SECRET="your-secret-key"
   ```
   **PostgreSQL on the same VPS:** From inside Docker, use the host so the container can reach Postgres. On Linux add `extra_hosts: ["host.docker.internal:host-gateway"]` under the `app` service in `docker-compose.yml`, then use `host.docker.internal` in `DATABASE_URL`; or use the host’s IP (e.g. `172.17.0.1` or your server’s private IP) instead of `localhost`.

4. **Run database migrations** (one-time). From your dev machine (with `DATABASE_URL` pointing at your DB):
   ```bash
   npx prisma migrate deploy
   ```
   Or on the VPS with Prisma installed, set `DATABASE_URL` in `.env` and run the same command.

5. **Build and start the app:**
   ```bash
   docker compose up -d --build
   ```

6. **Open the app** at `http://YOUR_VPS_IP:3000`.

---

## After clone, comingsoon branch, and .env (next steps)

You have: domain on Namecheap, Cloudflare nameservers, project cloned on VPS on `comingsoon` with `.env` created. Do the following.

### Step A: Run database migrations (one-time)

On the VPS (if Node/npx available) or from your computer with `DATABASE_URL` pointing to your DB:

```bash
cd /path/to/credit-flow-ai   # on VPS if running there
npx prisma migrate deploy
```

If you don’t have Node on the VPS, run this from your dev machine (use the same `DATABASE_URL` as in your VPS `.env`).

### Step B: Build and start the app

On the VPS:

```bash
cd /path/to/credit-flow-ai
docker compose up -d --build
```

Check: `http://YOUR_VPS_IP:3000` should show the app.

### Step C: Point your domain to the VPS (Cloudflare)

1. Log in to **Cloudflare** → select your domain.
2. Go to **DNS** → **Records**.
3. Add a record:
   - **Type:** `A`
   - **Name:** `@` (for root, e.g. `yourdomain.com`) or `www` (for `www.yourdomain.com`)
   - **IPv4 address:** your VPS public IP
   - **Proxy status:** Proxied (orange cloud) — recommended (Cloudflare SSL + DDoS protection)
4. Save. Wait a few minutes for DNS to update.

Then open `http://yourdomain.com:3000` (or `http://www.yourdomain.com:3000`). With Cloudflare proxied, you can use **SSL/TLS → Overview** and set encryption to **Flexible** (Cloudflare→visitor HTTPS, Cloudflare→VPS HTTP) so `https://yourdomain.com` works without changing the VPS.

### Step D: Serve on port 80/443 and use HTTPS (recommended)

So the site works at `https://yourdomain.com` (no `:3000`), put a reverse proxy on the VPS.

**Option 1 — Nginx (Ubuntu/Debian):**

```bash
sudo apt update && sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/credit-flow-ai
```

Paste (replace `yourdomain.com` and `YOUR_VPS_IP`):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/credit-flow-ai /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

In Cloudflare set SSL to **Flexible**. Then open `https://yourdomain.com` (no port).

**Option 2 — Caddy (auto HTTPS):**

```bash
sudo apt install -y debian-keyring debian-archive-keyring curl
curl -1sL 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sL 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install -y caddy
echo 'yourdomain.com { reverse_proxy 127.0.0.1:3000 }' | sudo tee /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

In Cloudflare set SSL to **Full** or **Full (strict)** if you use a certificate on the server.

---

## Quick start (any branch)

If you already have the repo and are on the branch you want: create `.env`, run migrations (see above), then `docker compose up -d --build`.

## Commands

| Command | Description |
|--------|-------------|
| `docker compose up -d --build` | Build and run in background |
| `docker compose logs -f app` | Follow app logs |
| `docker compose down` | Stop and remove containers |
| `docker compose up -d --build` | Rebuild after `git pull` on comingsoon |

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

---

## Install Docker on the VPS

If you see `docker: command not found`, install Docker and Docker Compose on the server first.

### Ubuntu / Debian

```bash
# Update and install prerequisites
sudo apt update
sudo apt install -y ca-certificates curl

# Add Docker’s official GPG key and repo
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# For Debian, use:
# echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Allow your user to run Docker without sudo (optional)
sudo usermod -aG docker $USER
# Log out and back in (or run: newgrp docker) for this to apply
```

### RHEL / CentOS / Fedora / Rocky / AlmaLinux

```bash
# Install Docker
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Allow your user to run Docker without sudo (optional)
sudo usermod -aG docker $USER
# Log out and back in (or run: newgrp docker) for this to apply
```

### Verify

```bash
docker --version
docker compose version
```

Then run your app from the project directory:

```bash
cd /path/to/credit-flow-ai
docker compose up -d --build
```

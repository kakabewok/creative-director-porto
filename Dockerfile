# ── Stage 1: Install dependencies & Build ──────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files dulu (layer cache — lebih efisien)
COPY package*.json ./

RUN npm ci

# Copy semua source code
COPY . .

# Build Next.js
RUN npm run build

# ── Stage 2: Production image ──────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy hasil build dari stage 1
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/app-manifest.json ./app-manifest.json
COPY --from=builder /app/icons ./icons

EXPOSE 3000

CMD ["npm", "start"]
# ==========================================
# Stage 1: Build Backend Dependencies
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /app

COPY backend/package*.json ./

RUN npm ci --omit=dev


# ==========================================
# Stage 2: Production Runtime
# ==========================================
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/node_modules ./node_modules

COPY backend/package*.json ./

# Copy backend application
COPY backend/ ./

EXPOSE 3000

HEALTHCHECK --interval=30s \
            --timeout=5s \
            --start-period=10s \
            --retries=3 \
            CMD wget --no-verbose \
                 --tries=1 \
                 --spider \
                 http://localhost:3000/api/health || exit 1

CMD ["node", "index.js"]
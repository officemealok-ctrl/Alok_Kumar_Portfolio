# ==========================================
# Stage 1: Build & Dependencies
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install production dependencies
RUN npm install --omit=dev


# ==========================================
# Stage 2: Runtime
# ==========================================
FROM node:18-alpine AS runner

WORKDIR /app

# Production environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules

# Copy backend package files
COPY backend/package*.json ./

# Copy backend source code
COPY backend/src/ ./src/

# Expose backend port
EXPOSE 3000

# Docker health check
HEALTHCHECK --interval=30s \
            --timeout=5s \
            --start-period=10s \
            --retries=3 \
            CMD wget --no-verbose \
                     --tries=1 \
                     --spider \
                     http://localhost:3000/api/health || exit 1

# Start backend
CMD ["node", "src/server.js"]
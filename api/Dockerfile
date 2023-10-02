FROM oven/bun
USER bun
WORKDIR /app
COPY --chown=bun:bun package*.* ./
RUN bun install
COPY --chown=bun:bun ./ ./
CMD [ "bun", "run", "dev" ]

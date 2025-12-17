-- CreateIndex
CREATE INDEX "sessions_auth_token_idx" ON "sessions"("auth_token");

-- CreateIndex
CREATE INDEX "sessions_refresh_token_idx" ON "sessions"("refresh_token");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

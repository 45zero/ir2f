import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // Connexion directe (port 5432, hors pgbouncer) — CLI uniquement (db push/migrate/generate).
  // Le pooler transaction-mode de DATABASE_URL (port 6543) bloque indéfiniment le schema-engine ;
  // l'appli, elle, continue d'utiliser DATABASE_URL directement (voir src/lib/prisma.ts), ce
  // fichier ne la concerne pas.
  datasource: {
    url: process.env["DIRECT_URL"]!,
  },
});

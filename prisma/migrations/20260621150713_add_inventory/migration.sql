-- CreateTable
CREATE TABLE "CombinationStock" (
    "combination_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "CombinationStock_combination_id_fkey" FOREIGN KEY ("combination_id") REFERENCES "ProductCombination" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StockMovement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" REAL NOT NULL,
    "total_price" REAL NOT NULL,
    "reason" TEXT NOT NULL DEFAULT '',
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StockMovement_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StockMovementLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movement_id" INTEGER NOT NULL,
    "combination_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" REAL NOT NULL,
    "total_price" REAL NOT NULL,
    CONSTRAINT "StockMovementLine_movement_id_fkey" FOREIGN KEY ("movement_id") REFERENCES "StockMovement" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "StockMovementLine_combination_id_fkey" FOREIGN KEY ("combination_id") REFERENCES "ProductCombination" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

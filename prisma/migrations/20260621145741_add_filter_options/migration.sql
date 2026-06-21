-- CreateTable
CREATE TABLE "FilterOption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "filter_id" INTEGER NOT NULL,
    CONSTRAINT "FilterOption_filter_id_fkey" FOREIGN KEY ("filter_id") REFERENCES "Filter" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

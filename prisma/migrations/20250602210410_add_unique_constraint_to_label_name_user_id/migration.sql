/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Label` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Label_name_userId_key" ON "Label"("name", "userId");

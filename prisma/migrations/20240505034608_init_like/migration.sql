-- AlterTable
ALTER TABLE "LikePost" ADD COLUMN     "commentsId" TEXT;

-- CreateTable
CREATE TABLE "LikeComments" (
    "likeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LikeComments_pkey" PRIMARY KEY ("likeId")
);

-- AddForeignKey
ALTER TABLE "LikeComments" ADD CONSTRAINT "LikeComments_likeId_fkey" FOREIGN KEY ("likeId") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikePost" ADD CONSTRAINT "LikePost_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "Comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

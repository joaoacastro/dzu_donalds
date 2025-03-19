-- CreateTable
CREATE TABLE "_OrderProductToRestaurant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_OrderProductToRestaurant_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_OrderProductToRestaurant_B_index" ON "_OrderProductToRestaurant"("B");

-- AddForeignKey
ALTER TABLE "_OrderProductToRestaurant" ADD CONSTRAINT "_OrderProductToRestaurant_A_fkey" FOREIGN KEY ("A") REFERENCES "OrderProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderProductToRestaurant" ADD CONSTRAINT "_OrderProductToRestaurant_B_fkey" FOREIGN KEY ("B") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

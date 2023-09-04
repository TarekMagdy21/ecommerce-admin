import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { BillboardCLient } from "./components/client";
import { BillboardColumn } from "./components/columns";

const page = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  const formattedBillBoards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardCLient data={formattedBillBoards} />
      </div>
    </div>
  );
};

export default page;

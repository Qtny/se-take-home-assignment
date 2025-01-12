import { useOrderStore } from "../store/orderStore";
import { Order } from "./ui/Order";

export function CompletedOrderPanel() {
    return (
        <section className="w-1/2 h-full px-1">
            {/* panel header */}
            <div className="flex justify-center items-center text-xl font-semibold rounded-t-md py-2 bg-yellow-600 text-white">
                Completed Orders
            </div>

            {/* panel body */}
            <div className="bg-yellow-100 h-[700px] flex flex-col justify-start items-start content-start flex-wrap gap-1 rounded-b-md relative overflow-hidden">
                {useOrderStore((state) => state.completedOrders).map((order) => {
                    return (
                        <Order key={order.id} order={order} />
                    )
                })}
            </div>
        </section>
    )
}

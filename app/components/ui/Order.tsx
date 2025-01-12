export function Order({ order }: OrderProps) {
    return (
        <div className={`font-semibold text-lg flex justify-center items-center h-fit py-2 w-28 border-2 ml-2 mt-2 rounded-md 
            ${order.type === "vip" ? "rounded-md border-pink-600" : "border-transparent"} 
            ${order.status === "processing" ? "bg-yellow-400" : "bg-yellow-200"}`}
        >{order.id}</div>
    )
}
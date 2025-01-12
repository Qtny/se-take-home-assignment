"use client"

import { useEffect, useState } from "react";
import { Headers } from "./components/Headers";
import { useOrderStore } from "./store/orderStore";
import { OrderBot } from "./OrderBot";
import { PendingOrderPanel } from "./components/PendingOrderPanel";
import { CompletedOrderPanel } from "./components/CompletedOrderPanel";
import { CustomButton } from "./components/ui/CustomButton";

export default function Home() {
  const addOrder = useOrderStore(state => state.addOrder);
  const addVipOrder = useOrderStore(state => state.addVipOrder);

  const [orderId, setOrderId] = useState(1);
  const [orderBots, setOrderBots] = useState<OrderBot[]>([]);

  // to pick up new orders
  useEffect(() => {
    orderBots.forEach((bot) => bot.startPreparing());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useOrderStore((state) => state.pendingOrders)]);

  function AddNewOrderButton() {
    function createOrder() {
      addOrder({
        id: orderId,
        type: "normal",
        status: "pending"
      })
      setOrderId((prev) => ++prev)
    }

    return (
      <CustomButton
        buttonText="New Order"
        clickFunction={createOrder}
      />
    )
  }

  function AddVIPOrderButton() {
    function createVipOrder() {
      addVipOrder({
        id: orderId,
        type: "vip",
        status: "pending"
      })
      setOrderId((prev) => ++prev)
    }

    return (
      <CustomButton
        buttonText="New VIP Order"
        clickFunction={createVipOrder}
      />
    )
  }

  function AddBotButton() {
    function createBot() {
      console.log("creating bot");
      setOrderBots(prev => {
        return [
          ...prev,
          new OrderBot()
        ]
      })
    }

    return (
      <CustomButton
        buttonText="+ Bot"
        clickFunction={createBot}
      />
    )
  }

  function RemoveBotButton() {
    function destroyBot() {
      console.log("destroying bot");
      const oldestBot = orderBots[0];
      oldestBot.stopPreparing();
      setOrderBots((prev) => prev.slice(1))
    }

    return (
      <CustomButton
        buttonText="- Bot"
        isDisabled={orderBots.length === 0}
        clickFunction={destroyBot}
      />
    )
  }

  return (
    <div className="h-screen w-screen p-4">
      <Headers />

      <div className="w-full">
        {/* panel screens */}
        <div className="flex">
          <PendingOrderPanel />
          <CompletedOrderPanel />
        </div>

      </div>
      <div className="py-4 flex justify-between items-center w-full">
        {/* order buttons */}
        <div className="space-x-4">
          <AddNewOrderButton />
          <AddVIPOrderButton />
        </div>

        <div className="flex gap-8 justify-center items-center">
          {/* Bot Counter */}
          <h3 className="font-semibold text-2xl">Bot Counter: {orderBots.length}</h3>

          {/* Bot Buttons */}
          <div className="space-x-4">
            <RemoveBotButton />
            <AddBotButton />
          </div>
        </div>
      </div>
    </div>
  );
}

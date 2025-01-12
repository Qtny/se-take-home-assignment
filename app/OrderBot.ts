import { useOrderStore } from "./store/orderStore";

const PROCESSING_TIME = 10000; // 10 seconds

export class OrderBot {
  private _orderId: number;
  private _status: "idle" | "working";
  private _timerId: NodeJS.Timeout | undefined;

  constructor() {
    this._orderId = 0;
    this._status = "idle";

    this.startPreparing();
  }

  public startPreparing() {
    // do nothing if bot is already working on one order
    if (this._status === "working") {
      return;
    }

    const orderStore = useOrderStore.getState();

    // check and process if any vip pending orders
    const vipOrders = orderStore.pendingOrders.filter(
      (o) => o.type === "vip" && o.status === "pending"
    );
    if (vipOrders.length > 0) {
      console.log("preparing VIP order");
      const orderId = vipOrders[0].id;
      this._orderId = orderId;
      this._status = "working";
      orderStore.startOrder(orderId);

      this._timerId = setTimeout(() => {
        orderStore.completeOrder(orderId);
        this._status = "idle";
        this.startPreparing();
      }, PROCESSING_TIME);
      return;
    }

    // check and process if any normal pending orders
    const normalPendingOrders = orderStore.pendingOrders.filter(
      (o) => o.type === "normal" && o.status === "pending"
    );
    if (normalPendingOrders.length > 0) {
      console.log("preparing normal order");
      const orderId = normalPendingOrders[0].id;
      this._orderId = orderId;
      this._status = "working";

      orderStore.startOrder(orderId);

      this._timerId = setTimeout(() => {
        orderStore.completeOrder(orderId);
        this._status = "idle";
        this.startPreparing();
      }, PROCESSING_TIME);
      return;
    }

    // do nothing if no pending orders
    return;
  }

  public stopPreparing() {
    // do nothing if bot is idle
    if (this._status === "idle") {
      return;
    }

    // clear timer to stop  upcoming jobs
    if (this._timerId !== undefined) {
      console.log("clearing timer");
      clearTimeout(this._timerId);
    }

    // cancel current order
    const orderStore = useOrderStore.getState();
    orderStore.cancelOrder(this._orderId);
  }
}

type CustomButtonProps = {
    buttonText: string;
    isDisabled?: boolean;
    clickFunction: () => void;
}

type OrderProps = {
    order: CustomerOrder
}

type CustomerOrder = {
    id: number;
    type: "vip" | "normal";
    status: "pending" | "processing" | "completed";
};

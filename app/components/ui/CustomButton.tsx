export function CustomButton({ buttonText, isDisabled, clickFunction }: CustomButtonProps) {
    return (
        <button
            className={`border rounded-lg text-lg min-w-24 text-white p-4 font-semibold ${isDisabled ? "bg-gray-500" : "bg-yellow-500 hover:bg-yellow-400"}`}
            onClick={clickFunction}
            disabled={isDisabled ?? false}
        >{buttonText}</button>
    )
}
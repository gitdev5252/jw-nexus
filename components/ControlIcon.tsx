function ControlIcon({
    icon,
    label,
    onClick,
    bgColor = "bg-gray-100",   // default color
    hoverColor = "hover:bg-gray-200", // default hover
}: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    bgColor?: string;
    hoverColor?: string;
}) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center gap-1 text-gray-700 hover:text-black"
        >
            <div className={`${bgColor} ${hoverColor} p-3 rounded-xl shadow-md`}>
                {icon}
            </div>
            <span className="text-xs mt-1 font-medium">{label}</span>
        </button>
    );
}

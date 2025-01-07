import { Link } from "react-router-dom";
import { ReactNode } from "react";

const CustomButton = ({
    text,
    icon,
    path = "",
    classNames,
    type,
    disabled,
    onClick = () => {},
}: {
    text: string;
    icon?: string | ReactNode;
    path?: string;
    disabled?: boolean;
    classNames?: string;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] | "clear-cart";
    onClick?: (
        e: React.MouseEvent<HTMLButtonElement>
        // | React.FormEvent<HTMLFormElement>
    ) => void;
}) => {
    const className = `flex items-center justify-center text-md sm:text-xl bg-orange-300/30 ${disabled ? "" : "hover:bg-orange-500/40 transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-yellow-300"} border-solid border-custom-01 border w-[8rem] h-[3rem] sm:w-[12rem] sm:h-[4rem] rounded-md shadow-sm ${classNames}`;

    const styles = {
        main: className,
        clearCart: `${className} bg-stone-100 hover:bg-stone-300`,
    };

    if (path) {
        return (
            <Link to={path} className={styles.main}>
                {text}
            </Link>
        );
    }

    if (type === "clear-cart") {
        return (
            <button onClick={onClick} className={styles.clearCart}>
                Clear Cart
            </button>
        );
    }

    return text === "" ? (
        <span className={`cursor-pointer ${classNames}`} onClick={onClick}>
            {icon}
        </span>
    ) : (
        <button
            type={type}
            disabled={disabled}
            className={styles.main}
            onClick={onClick}
        >
            {icon && <span className='text-sm mr-2'>{icon}</span>}
            {text}
        </button>
    );
};

export default CustomButton;

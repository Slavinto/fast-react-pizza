import { useEffect, useState } from "react";

const CustomInputField = ({
    label,
    name,
    isControlled = false,
    disabled = false,
    onChange,
    defaultValue = "",
    type = "text",
    placeholder = "",
    classNames = "",
    required = true,
    error = "",
}: {
    label: string;
    name: string;
    isControlled?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    classNames?: string;
    required?: boolean;
    error?: string;
}) => {
    // const [showError, setShowError] = useState(false);
    const [incomingError, setIncomingError] = useState("");

    useEffect(() => {
        if (error) {
            setIncomingError(error);

            const timeout = setTimeout(() => {
                setIncomingError("");
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [error]);

    const className = `shadow-md p-2 rounded-md placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-yellow-300 w-full ${classNames}`;
    return (
        <div className='relative flex flex-col gap-2 w-full items-center'>
            {label === "" ? null : (
                <label className='self-start'>{label}</label>
            )}
            {incomingError && (
                <p className='absolute w-full h-full -left-[105%] pl-4 text-start text-lg text-red-600 bg-red-50/90'>
                    {incomingError}
                </p>
            )}
            {isControlled ? (
                <input
                    disabled={disabled}
                    type={type}
                    name={name}
                    maxLength={30}
                    value={defaultValue}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    className={className}
                />
            ) : (
                <input
                    disabled={disabled}
                    type={type}
                    name={name}
                    maxLength={30}
                    defaultValue={defaultValue}
                    required={required}
                    placeholder={placeholder}
                    className={`shadow-md p-2 rounded-md placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-yellow-300 w-full ${classNames}`}
                />
            )}
        </div>
    );
};

export default CustomInputField;

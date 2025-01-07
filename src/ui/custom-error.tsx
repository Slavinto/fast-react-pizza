import { useNavigate, useRouteError } from "react-router";
import CustomButton from "./custom-button";

function CustomError() {
    const navigate = useNavigate();
    const errorOrResponse = useRouteError();
    let errorMessage = "";

    // console.log(errorOrResponse.statusText);
    if (errorOrResponse instanceof Error) {
        errorMessage = errorOrResponse.message;
    } else if (
        errorOrResponse &&
        typeof errorOrResponse === "object" &&
        "status" in errorOrResponse &&
        "statusText" in errorOrResponse &&
        typeof errorOrResponse.statusText === "string"
    ) {
        errorMessage = errorOrResponse.statusText;
    }

    return (
        <div className='mx-auto my-44 card-container bg-orange-300 max-w-[40rem] p-8 self-center flex-col text-center items-center gap-2'>
            <h1 className='text-3xl'>Something went wrong 😢</h1>
            <p className='text-xl'>
                Error:{" "}
                <span className='font-bold text-2xl'>{errorMessage}</span>
            </p>
            <CustomButton
                text='&larr; Go back'
                icon=''
                classNames='mt-4'
                onClick={() => navigate("/menu")}
            />
        </div>
    );
}

export default CustomError;

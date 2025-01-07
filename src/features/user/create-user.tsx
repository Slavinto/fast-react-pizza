import { useState } from "react";
import CustomButton from "../../ui/custom-button";
import { useNavigate } from "react-router-dom";
import { updateName } from "./user-slice";
import { useAppDispatch } from "../../utils/hooks/use-dispatch";

function CreateUser() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!username) return;
        dispatch(updateName({ name: username }));
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='card-container p-8 mt-10 items-center gap-4 mx-auto max-w-[40rem] flex-col'
        >
            <h2 className='sm:text-xl text-lg self-center'>👋 Welcome!</h2>
            <div className='flex gap-4 flex-col'>
                <p className='text-md sm:text-lg font-semibold'>
                    Please start by telling us your name:
                </p>
                <input
                    className='shadow-md p-2 rounded-md placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-yellow-300 w-full'
                    type='text'
                    placeholder='Your full name'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            {username !== "" && (
                <CustomButton
                    onClick={() => navigate("/menu")}
                    classNames='self-center'
                    text='Start ordering'
                />
            )}
        </form>
    );
}

export default CreateUser;

import CreateUser from "../features/user/create-user";
import UserGreet from "../features/user/user-greet";
import { getUser } from "../features/user/user-slice";
import { useAppSelector } from "../utils/hooks/use-selector";

function Home() {
    const { name } = useAppSelector(getUser);
    return (
        <div className='w-full'>
            <h1 className='text-center text-xl sm:text-3xl font-semibold mt-8'>
                The best pizza.
                <br />
                <span className='text-yellow-500'>
                    Straight out of the oven,{" "}
                    <br className='max-[390px]:block hidden' />
                    straight to you.
                </span>
            </h1>
            {name ? <UserGreet /> : <CreateUser />}
        </div>
    );
}

export default Home;

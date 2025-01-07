import CustomLink from "../../ui/custom-link";
import { useAppSelector } from "../../utils/hooks/use-selector";
import { getUser } from "./user-slice";

function UserGreet() {
    const { name } = useAppSelector(getUser);
    return (
        <div className='card-container flex flex-col gap-4 text-xl text-center mt-10 p-8 max-w-[40rem] mx-auto'>
            <p className='font-bold'>
                Hey, {name}! <br />
                Please consider ordering some more pizzas 😊
            </p>
            <CustomLink path='/menu' text='Browse our pizzas&rarr;' />
        </div>
    );
}

export default UserGreet;

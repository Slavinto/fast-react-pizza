import { useAppSelector } from "../../utils/hooks/use-selector";
import { getUser } from "./user-slice";

const UserName = () => {
    const { name } = useAppSelector(getUser);

    return name ? (
        <h3 className='sm:ml-auto text-sm font-semibold hidden md:block'>
            {name}
        </h3>
    ) : null;
};

export default UserName;

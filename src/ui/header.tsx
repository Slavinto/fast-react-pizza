import { Link } from "react-router-dom";
import SearchOrder from "../features/order/search-order";
import UserName from "../features/user/user-name";

const Header = () => {
    return (
        <header className='uppercase w-full rounded-b-xl bg-gradient-to-b from-orange-300 to-orange-100 flex items-center justify-between gap-8 p-8 flex-col sm:flex-row'>
            <Link className='tracking-wider lg:text-4xl text-2xl' to='/'>
                Fast React Pizza Co.
            </Link>
            <UserName />
            <SearchOrder />
        </header>
    );
};

export default Header;

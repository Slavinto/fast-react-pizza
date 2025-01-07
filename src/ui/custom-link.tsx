import { Link } from "react-router-dom";

const CustomLink = ({ text, path }: { text: string; path: string }) => {
    return (
        <Link
            className='text-blue-700 hover:text-blue-900 text-xl mb-4'
            to={path}
        >
            {text}
        </Link>
    );
};

export default CustomLink;

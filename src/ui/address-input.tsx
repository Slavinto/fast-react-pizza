import { BsGeoAlt } from "react-icons/bs";
import CustomButton from "./custom-button";
import CustomInputField from "./custom-input-field";
import { useAppSelector } from "../utils/hooks/use-selector";
import { fetchAddress, getUser } from "../features/user/user-slice";
import { useAppDispatch } from "../utils/hooks/use-dispatch";
import { UserStatus } from "../types/types";

const AddressInput = () => {
    const { address, status, error } = useAppSelector(getUser);
    const dispatch = useAppDispatch();
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor='address' className='self-start'>
                Address
            </label>
            <div className=' relative shadow-md rounded-md placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-yellow-300 w-full flex items-center divide-x-2 divide-stone-500/60'>
                <CustomInputField
                    disabled={status === UserStatus.Loading}
                    error={status === UserStatus.Error ? error : undefined}
                    defaultValue={address}
                    name='address'
                    label=''
                    classNames='w-full pr-10'
                />
                <CustomButton
                    type='button'
                    onClick={() => dispatch(fetchAddress())}
                    text=''
                    icon={<BsGeoAlt />}
                    classNames='absolute right-0 border-0 shadow-none p-2 text-xl'
                />
            </div>
        </div>
    );
};

export default AddressInput;

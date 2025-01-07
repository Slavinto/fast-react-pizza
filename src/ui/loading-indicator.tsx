import { useNavigation } from "react-router-dom";
import AbsoluteContainer from "./absolute-container";

const LoadingIndicator = () => {
    const navigation = useNavigation();
    const isLoading =
        navigation.state === "loading" || navigation.state === "submitting";

    return isLoading ? (
        <AbsoluteContainer>
            <div className='loader scale-150' />
        </AbsoluteContainer>
    ) : null;
};

export default LoadingIndicator;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAddress } from "../../services/api-geocoding";
import {
    ActionUserFetchedAddress,
    // ActionUserFetchedAddressSuccess,
    ActionUserOrderedPizza,
    ActionUserUpdatedName,
    UserActionTypes,
    UserState,
    UserStatus,
} from "../../types/types";
import { RootState } from "../../store/store";

function getPosition() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

export const fetchAddress = createAsyncThunk(
    UserActionTypes.UserFetchedAddress,
    async function () {
        // 1) We get the user's geolocation position
        const positionObj = (await getPosition()) as
            | GeolocationPosition
            | GeolocationPositionError;

        if (positionObj instanceof GeolocationPositionError) {
            throw new Error(positionObj.message);
        }
        const position = {
            latitude: positionObj.coords.latitude,
            longitude: positionObj.coords.longitude,
        };

        // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
        const addressObj = await getAddress(position);
        const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

        // 3) Then we return an object with the data that we are interested in
        // returned value will become the payload of the fullfilled state
        const output = { position, address };
        return output;
    }
);

const initialState: UserState = {
    id: "",
    name: "",
    phoneNumber: "",
    address: "",
    status: UserStatus.Idle,
    position: null,
    error: undefined,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateName: (
            state,
            action: PayloadAction<ActionUserUpdatedName["payload"]>
        ) => {
            state.name = action.payload.name;
        },
        orderPizza: (
            state,
            action: PayloadAction<ActionUserOrderedPizza["payload"]>
        ) => {
            state.id = Date.now().toString();
            state.name = action.payload.name;
            state.address = action.payload.address;
            state.phoneNumber = action.payload.phoneNumber;
            state.position = action.payload.position;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchAddress.pending, (state) => {
                state.status = UserStatus.Loading;
            })
            .addCase(
                fetchAddress.fulfilled,
                (
                    state,
                    action: PayloadAction<ActionUserFetchedAddress["payload"]>
                ) => {
                    state.status = UserStatus.Idle;
                    state.position = action.payload.position;
                    state.address = action.payload.address;
                }
            )
            .addCase(fetchAddress.rejected, (state, action) => {
                state.status = UserStatus.Error;
                state.error = action.error.message || undefined;
            }),
});

export const { updateName, orderPizza } = userSlice.actions;
export const getUser = (state: RootState) => state.user;
export default userSlice.reducer;

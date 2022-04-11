import { ContactType } from "@/types/ContactType";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

interface ContactState{
    data: ContactType[]
}

const initialState: ContactState = {
    data: []
}

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers:{
        setContacts:(state, action: PayloadAction<ContactType[]>) => {
            state.data = action.payload
        },
        addContact:(state, action: PayloadAction<ContactType>) => {
            state.data = [...state.data, action.payload]
        },
        editContact:(state, action: PayloadAction<ContactType>) => {
            console.log(action.payload, current(state))
            state.data = state.data.map(item => item.id == action.payload.id ? action.payload : item)
            console.log(current(state))
        },
        removeContact:(state, action: PayloadAction<number>) => {
            state.data = state.data.filter(item => item.id !== action.payload)
        }
    }
})

export const {setContacts, addContact, editContact, removeContact} = contactSlice.actions
export default contactSlice.reducer
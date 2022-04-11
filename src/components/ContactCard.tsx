import APIService from "@/services/APIService";
import { removeContact } from "@/stores/contactSlice";
import { ContactType } from "@/types/ContactType";
import { useWrite } from "@/useFetch";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";

export default function ContactCard({data, editEvent, triggerDetail}: {data:ContactType, editEvent: (id : number) => void, triggerDetail:(data: ContactType) => void}){

    const dispatch = useDispatch();
    
   async function confirmDelete(){
        if(confirm("Êtes-vous sur de vouloir supprimer ce contact ?")){
            const result = await APIService.deleteContact(data.id!)    
            if(result){
             dispatch(removeContact(data.id!));   
            }
        }
    }

    return <div onClick={(e) => {
        const target = e.target as HTMLButtonElement
        if(!target.classList.contains("button")){
            triggerDetail(data)
        }}} className="wrapperContact">
        <div className="contactContentName">
            <p className="contactName">{data.firstname}</p> 
            <p className="contactName">{data.lastname}</p>
        </div>
        <p>{data.birthday}</p>
        <p>{data.email}</p>
        <div className="wrapperButtonContact">
            <button className="button" onClick={() => editEvent(data.id!)}> Modifier </button>
            <button className="button" onClick={confirmDelete}> Supprimer </button>
        </div>   
    </div>
}

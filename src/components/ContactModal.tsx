import APIService from "@/services/APIService";
import { addContact, editContact} from "@/stores/contactSlice";
import { ContactType } from "@/types/ContactType";
import { FormEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export default function ContactModal({closeRequest, type, currentEditContact}: {closeRequest: () => void, type: "create" | "edit", currentEditContact: ContactType | null}){

    const [lastname, setLastname] = useState("")
    const [firstname, setFirstname] = useState("")
    const [email, setEmail] = useState("")
    const dispatch = useDispatch();

     async function submitCreateContact(e: FormEvent<HTMLFormElement>){
         e.preventDefault()
         const newContact = {
            firstname: firstname,
            lastname: lastname,
            email: email,
         }
         const result = await APIService.createContact(newContact)
         if(result){
          dispatch(addContact(result));   
          closeRequest();
         }
     }

     async function submitEditContact(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        const newContact = {
           id: currentEditContact?.id,
           firstname: firstname,
           lastname: lastname,
           email: email,
        }
        const result = await APIService.updateContact(newContact)
        console.log(result)    
        if(result){
         dispatch(editContact(result));   
         closeRequest();
        }
    }

    useEffect(() => {
        if(type == "edit"){
            setLastname(currentEditContact!.lastname)
            setFirstname(currentEditContact!.firstname)
            setEmail(currentEditContact!.firstname)
        }
    },[])

    return <div onClick={(e) => {
        if(e.target == document.querySelector('.modalBackground')){
            closeRequest()
        }
    }} className="modalBackground">
            <div className="containerModal">
                <h1 className="modalTitle"> {type == "create" ? "Créer un" : "Modifier le"} contact</h1>
                <div className="modalContent">
                    <form onSubmit={ type == "create" ? submitCreateContact : submitEditContact}>
                        <input className="modalInput" type="text" placeholder="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                        <input className="modalInput" type="text" placeholder="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                        <input className="modalInput" type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <button className="modalSubmit" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>

}
import APIService from "@/services/APIService";
import { ContactType } from "@/types/ContactType";
import { FormEvent, useState } from "react";

export default function ContactDetail({closeRequest, contactData}: {closeRequest: () => void, contactData: ContactType}){

    return <div onClick={(e) => {
        if(e.target == document.querySelector('.modalBackground')){
            closeRequest()
        }
    }} className="modalBackground">
            <div className="containerModal">
                <h1 className="modalTitle"> Détails du contact</h1>
                <div className="modalDetails">
                    <div className="modalDetailsContentName">
                        <p className="modalDetailTextName"> {contactData.lastname}</p>
                        <p className="modalDetailTextName">{contactData.firstname}</p>
                    </div>
                    <div className="modalDetailsContent">
                        <p>Adresse mail:</p>
                        <p className="modalDetailText">{contactData.email}</p>
                    </div>
                    <button className="modalDetailClose" onClick={closeRequest}>
                            X
                    </button>
                </div>
            </div>
        </div>

}

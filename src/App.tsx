import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useRead } from "./useFetch";
import { RootState } from "./store"
import { setContacts } from "./stores/contactSlice";
import { ContactType } from "./types/ContactType";
import ContactCard from "./components/ContactCard";
import Search from "./components/Search";
import ContactModal from "./components/ContactModal";
import Pagination from "./components/Pagination";
import APIService from "./services/APIService";
import ContactDetail from "./components/ContactDetail";

function App() {

  const dispatch = useDispatch()
  const url = "http://localhost:3001/contacts"
  const getContacts = useRead<ContactType[]>(url)
  const contacts = useSelector((state: RootState) => state.contact.data) 
  const [filteredList, setFilteredList] = useState<ContactType[]>([]) 
  const [search,setSearch] = useState("")
  const [currentEditContact,setCurrentEditContact] = useState<ContactType | null>(null) 
  const [modalStatus, setModalStatus] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [contactDetailStatus, setContactDetailStatus] = useState<ContactType | null>(null)
  const itemPerPage = 3
  const [itemCount, setItemCount] = useState(0)
  
  useEffect(() => {
    if(getContacts.status == "success"){
        dispatch(setContacts(getContacts.data))
    }
  },[getContacts])

  useEffect(() => {
    if(search == ""){
      setFilteredList(contacts.slice((currentPage - 1) * itemPerPage,currentPage * itemPerPage))
      setItemCount(contacts.length)
    } else {
      const match = contacts.filter((contact) => contact.firstname.includes(search) || contact.lastname.includes(search) || contact.email.includes(search))
      setFilteredList(match.slice((currentPage - 1) * itemPerPage,currentPage * itemPerPage))
      setItemCount(match.length)
    }
  },[search, contacts, currentPage])

  function doSearch(search:string){
    setSearch(search)
    setModalStatus(false)
    setContactDetailStatus(null)
    setCurrentPage(1)
  }

  function closeRequest(){
    setModalStatus(false)
  }

  function closeDetail(){
    setContactDetailStatus(null)
  }

  function getDetailContact(contact : ContactType){
    setContactDetailStatus(contact)
    setModalStatus(false)
  }

  function switchPage(pageNumber: number){
    setCurrentPage(pageNumber)
  }

  function editEvent(id: number){
    setCurrentEditContact(contacts.find(contact => contact.id == id)!)
    setModalStatus(true)
  }

  return <div className="container">
  <header>
    <h1>Bibliothèque de contacts</h1>
    <button className="createButton" onClick={() => {
      setModalStatus(true)
      setCurrentEditContact(null)}}>Ajouter un contact</button>
  </header>
  <main>
    <Search onSearch={doSearch}/>
    <div className="contacts">
      {filteredList.map(contact => {
        return <ContactCard triggerDetail={getDetailContact} key={contact.id} data={contact} editEvent={editEvent}/>
      })}
    </div>
   {contactDetailStatus && <ContactDetail closeRequest={closeDetail} contactData={contactDetailStatus}/> }
  </main>

  {modalStatus && <ContactModal closeRequest={closeRequest} type={currentEditContact ? "edit" : "create"} currentEditContact={currentEditContact} />}

  <Pagination currentPage={currentPage} totalPage={Math.ceil(itemCount / itemPerPage)} switchPage={switchPage}/>
  </div>
}

export default App

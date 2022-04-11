import { useEffect, useState } from "react"

export default function Search({onSearch}: {onSearch: (search:string) => void}){
   const [search,setSearch] = useState("")

   useEffect(() => {
    onSearch(search)
   },[search])

    return <input className="searchBar" type="text" placeholder="Rechercher contact" value={search} onChange={(e) => setSearch(e.target.value)} />
}
import { PaginationProps } from "@/types/PaginationProps"

export default function Pagination({currentPage, totalPage, switchPage}: PaginationProps){
    const pages = []
    for (let i = 1; i <= totalPage; i++){
        pages.push(
            <button key={i} onClick={() => switchPage(i)} disabled={currentPage === i}>{i}</button>
        )
    }
    return <div className="pagination">
        <button className="paginatioPrevious" onClick={() => switchPage(currentPage-1)} disabled={currentPage === 1}>Précédent</button>
        <div className="buttonPagination">
            {pages}
        </div>
        <button className="paginationNext" onClick={() => switchPage(currentPage+1)} disabled={currentPage === totalPage}>Suivant</button>
    </div>
}
export interface PaginationProps{
    currentPage: number;
    totalPage: number;
    switchPage: (page: number) => void
}
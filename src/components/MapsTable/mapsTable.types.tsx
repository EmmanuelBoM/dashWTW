export interface IPropTypes {
    getTableProps:any,
    getTableBodyProps:any,
    headerGroups:any,
    globalFilter:any,
    state:any,
    setGlobalFilter:any,
    rows:any,
    prepareRow:any
}

export interface IData {
    id:number,
    placeName: string, 
    city: string, 
    progress: number,
    isNumeric: boolean
};
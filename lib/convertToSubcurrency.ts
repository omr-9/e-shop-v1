function converToSubcurrency(totalPriceWithVat:number, factor =100){
    return Math.round(totalPriceWithVat * factor)
}
export default converToSubcurrency
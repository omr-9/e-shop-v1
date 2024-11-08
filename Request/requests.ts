export async function getAllCategory() {
    const categoryRes = await fetch('https://fakestoreapi.com/products/categories')
    return categoryRes.json()
    
}
export async function getAllProducts() {
    const productsRes = await fetch("https://fakestoreapi.com/products")
    return productsRes.json()
    
}
export async function getSinglePorduct(id:string) {
    const singlePorductRes = await fetch(`https://fakestoreapi.com/products/${id}`)
    return singlePorductRes.json()
}
export async function getProductByCategory(category:string) {
    const productByCategoryRes = await fetch(`https://fakestoreapi.com/products/category/${category}`)
    return productByCategoryRes.json()
}
// export async function getProductsInSpecifiCategory(specifiCategory:string) {
//     const specifiCategoryRes = await fetch(`https://fakestoreapi.com/products/category/${specifiCategory}`)
//     return specifiCategoryRes.json()
// }
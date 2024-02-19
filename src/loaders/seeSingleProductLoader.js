export default async function seeSingleProductLoader({params}){
 try {
    return {productId:params.productId}
 } catch (error) {
    console.log(error);
 }
}
export default async function productsInStock({params}){
  try {
    const {userUid} = params
    return {userUid}
  } catch (error) {
    console.log(error);
    throw new Error("Server error")
  }
}
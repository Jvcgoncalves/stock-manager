export default async function userSingInIdLoader({params}){
  try {
    const {userUid} = params 
    return {userUid}
  } catch (error) {
    throw new Error("server problems")
  }
}
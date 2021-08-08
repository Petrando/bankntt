//import fetchJson from "../../lib/fetchJson";
import withSession from "../../lib/session";
import { connectToDatabase } from "../../lib/mongodb";

export default withSession(async (req, res) => {
  const { username, password } = await req.body;
  const url = `https://api.github.com/users/${username}`;  

  try {
    const adminFromMongo = await getAdminLogin({username, password});
    // we check that the user exists on GitHub and store some data in session    
    //const { login, avatar_url: avatarUrl } = await fetchJson(url);    
    //const user = { isLoggedIn: true, login, avatarUrl };
    const user = { isLoggedIn: adminFromMongo.length>0?true:false, ...adminFromMongo[0] }
    req.session.set("user", user);
    await req.session.save();    
    res.json(user);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});

export const getAdminLogin = async ({username, password}:{username:string, password:string}) => {
  const { db } = await connectToDatabase();
  
  const admin = await db
    .collection("admins")
    .find({username, password})        
    .toArray();

  return admin;
}

import { useGlobalContext } from '@/context/GlobalProvider';
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
import { Redirect } from 'expo-router';
// Init your React Native SDK
const client = new Client();

export const appwriteconfig ={
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.Divyansh.aiusense',
    projectID: '676baf00001624931a82',
    databaseId: '676bb75f002774b08f3c',
    userCollectionID:'676bb76b000fa5242cd5'
}



client
    .setEndpoint(appwriteconfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteconfig.projectID) // Your project ID
    .setPlatform(appwriteconfig.platform) // Your application ID or bundle ID.
;
const account = new Account(client)
const avatar = new Avatars(client)
const db = new Databases(client)

export const createUser =async (UserName='',email='',password='')=>{
    
    try {
        const newAcc = await account.create(
            ID.unique(),
            email,
            password,
            UserName
        )

        if(!newAcc) throw Error()

        const avatarUrl = avatar.getInitials(UserName)

        

        await signIn(email,password)


        const newuser = await db.createDocument(
            appwriteconfig.databaseId,
            appwriteconfig.userCollectionID,
            ID.unique(),
            {
              accountID: newAcc.$id,
              email,
              UserName,
              avatar: avatarUrl
            }
        )
        
    } catch (error) {
        console.error()
        console.log(error,'Error in appwrite')
        throw new Error()
    }

    
}


export const signIn = async (email = '', password = '') => {
    try {
      // Check if there's an active session before trying to delete it
    //   const sessions = await account.listSessions();
    //   if (sessions?.sessions?.length) {
    //     // Loop through active sessions and delete them
    //     await Promise.all(sessions.sessions.map((session) => account.deleteSession(session.$id)));
    //   }
  
      // Create a new session with email and password
      // await account.deleteSession('current')
      // await account.deleteSessions();
      const newSession = await account.createEmailPasswordSession(email, password);
      
      // Return the new session details
      return newSession;
    } catch (error) {
      // Log the error to help identify issues
      console.error('Error during sign-in:', error);
  
      // Handle specific error cases based on Appwrite error codes
      // if (error.code === 401) {
      //   throw new Error('Invalid email or password. Please try again.');
      // }
  
      // if (error.code === 500) {
      //   throw new Error('Server error. Please try again later.');
      // }
  
      // Catch-all error handling
      throw new Error('Unexpected error occurred. Please check your network or try again later.');
    }
  };

  export const settingLog=async()=>{
    try{
    const currSess = await account.get()
    return true
    }catch(error){
     return false
    }
  }
  
  export const getCurrentUser = async () => {
    try {
      // Fetch account details
      const currentAcc = await account.get();
  
      if (!currentAcc) throw new Error('No account found');
  
      // Fetch user document associated with the account
      const currentUserResponse = await db.listDocuments(
        appwriteconfig.databaseId,
        appwriteconfig.userCollectionID,
        [Query.equal('accountID', currentAcc.$id)]
      );
  
      if (!currentUserResponse || currentUserResponse.documents.length === 0) {
        throw new Error('No user document found');
      }
  
      // Extract the user document
      const userDoc = currentUserResponse.documents[0];
  
      // Return a combined user object
      return {
        // $id: userDoc.$id,
        email: currentAcc.email,
        name: userDoc.name,
        account: currentAcc.$id,
        ...userDoc, // Include other fields dynamically from the user document
      };
    } catch (error) {
      console.log('Error in getCurrentUser:', error);
      return null; // Return null in case of error
    }
  };
  

export const logOut=async()=>{
  try {
    await account.deleteSessions();
  } catch (error) {
    throw new Error();
    
  }
}
import firebase from '@/plugins/firebase'
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

export async function getUser(userId) {
  const user = await db
    .collection('users')
    .doc(userId)
    .get()
    .then(doc => {
      return doc.data()
    }).catch(function(error) {
      console.log("Error getting user in usecase:", error);
    })
  const storageRef = storage.ref()
  const profileImgRef = storageRef.child(user.profileImgPath)
  const profileImg = await profileImgRef.getDownloadURL()
  return {
    profileImg,
    ...user
  }
}

export async function createUser() {
}

export async function updateUser(user, dto) {
  await db.collection('users')
    .doc(user.userId)
    .update({
      ...dto,
      updatedAt: serverTimestamp
    }).catch(function(error) {
      console.log("Error updating user in usecase:", error);
    })
}

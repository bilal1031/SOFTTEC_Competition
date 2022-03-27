// import { auth, fbAuthProvider } from "../firebase";
// import { appIdFb } from "./APIKeys";
// import * as Facebook from "expo-facebook";

// export const facebookAuth = async () => {
//   try {
//     await Facebook.initializeAsync({
//       appId: appIdFb,
//     });
//     const { type, token, expirationDate, permissions, declinedPermissions } =
//       await Facebook.logInWithReadPermissionsAsync({
//         permissions: ["public_profile"],
//       });

//     if (type === "success") {
//       const credential = fbAuthProvider.credential(token);
//       auth
//         .signInWithCredential(credential)
//         .then((u) => {
//           dispatch(loadData());
//           return u;
//         })
//         .then(async (userCredential) => {
//           const user = userCredential.user;
//         })
//         .catch((error) => {
//           alert(error);
//         }); // Handle Errors here.
//       console.log("Successfull");
//     }
//   } catch ({ message }) {
//     alert(`Facebook Login Error: ${message}
//     Try other method to login.`);
//   }
// };

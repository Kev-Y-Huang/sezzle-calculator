import React, { useContext, useEffect, useState } from "react";
import app, { auth } from "../firebase.js";
import firebase from "firebase";
import generate from "project-name-generator";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        // User is signed out.
        setAuthUser(null);
        auth
            .signInAnonymously()
            .then((cred) => {
              const userId = cred.user.uid;
              app
                  .database()
                  .ref("/users/" + userId)
                  .set({
                    username: generate().spaced,
                    date_created: firebase.database.ServerValue.TIMESTAMP,
                  });
            })
            .catch(() => {
              alert("Unable to connect to the server. Please try again later.");
            });
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!authUser) {
      setUser(null);
      return;
    }
    const userRef = firebase.database().ref(`/users/${authUser.uid}`);

    function update(snapshot) {
      setUser({
        ...snapshot.val(),
        id: authUser.uid,
      });
      setLoading(false);
    }

    userRef.on("value", update);
    return () => {
      userRef.off("value", update);
    };
  }, [authUser]);

  const value = {
    authUser,
    user
  };

  return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
  );
}

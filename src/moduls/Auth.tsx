import { createContext, useContext, useEffect, useState } from "react";
import * as authHelper from "./AuthHelper";
import * as pokeHelper from "./PokeHelper";

const initAuthContextPropsState :IAuthContext = {
  saveAuth: () => {},
  auth: authHelper.getAuth(),

  currentUser: undefined,
  setCurrentUser: () => {},
  
  savePoke: () => {},
  poke: authHelper.getAuth(),
  myPokemon: undefined,
  setMyPokemon: () => {},

  logout: () => {},
}

interface IAuthContext {
  auth: any;
  currentUser: any;
  setCurrentUser: any;
  logout: any;
  saveAuth: any;
  savePoke: any;
  poke: any;
  myPokemon?: any;
  setMyPokemon?: any;
}

const AuthContext = createContext<IAuthContext>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>();

  const [poke, setPoke] = useState<any>();
  const [myPokemon, setMyPokemon] = useState<any>();

  const saveAuth = (auth: any) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const savePoke = (poke: any) => {
    setPoke(poke);
    if (poke) {
      pokeHelper.setPoke(poke);
    } else {
      pokeHelper.removePoke();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);

    setMyPokemon(undefined);
    savePoke(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, logout, savePoke, poke, myPokemon, setMyPokemon }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit = ({ children }: any) => {
  const { auth, logout, setCurrentUser, setMyPokemon }: any = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  
  useEffect(() => {
    const newauth = authHelper.getAuth()
    const newpoke = pokeHelper.getPoke()

    if (newauth) {
      setCurrentUser(newauth);
    } else {
      logout();
      setShowSplashScreen(false);
    }

    if (newpoke) {
      setMyPokemon(newpoke);
    }

  }, []);

  // return showSplashScreen ? <>loading</> : <>{children}</>;
  return children;
};

export { AuthProvider, AuthInit, useAuth };

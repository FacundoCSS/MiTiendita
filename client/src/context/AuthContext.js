import {useState,useContext, createContext, useEffect} from 'react';
import {getToken, loadShopRequest, registerShopRequest, loginShopRequest, logoutRequest} from '../api/auth'
import Loading from '../components/Loading'

const context = createContext()

export const useAuth = ()=>{
    const newContext = useContext(context)
    return newContext
}

const initialState = {
    token: getToken(),
    auth: false,
    shop: null,
    isLoading: true,
  };

const AuthProvider = ({children}) => {
    
    const [state, setState] = useState(initialState)

    const register = async (shop)=>{
        try {
            const data = await registerShopRequest(shop)
            setState({...data, auth: !!data.shop})
            return data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const login = async (shop)=> {
        try {
            const data = await loginShopRequest(shop)
            setState({
                token: data.token, 
                user: data.shop,
                auth: !!data.shop})
            return data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const logout = async ()=>{
        await logoutRequest()
        setState({ ...initialState, isLoading: false })
    }


    useEffect(()=>{
        loadShopRequest()
            .then((shop)=>{
                setState({
                    shop: shop,
                    isLoading: false,
                    auth: !!shop,
                  });
                })
                .catch((err) => {
                  setState({
                    ...initialState,
                    isLoading: false,
                  });
                });
            }, []);

    if (state.isLoading) {
        return <Loading />;
    }


      return (
        <context.Provider value={{
            state,
            register,
            login,
            logout
        }}>
            {children}
        </context.Provider>
    );

}

export default AuthProvider
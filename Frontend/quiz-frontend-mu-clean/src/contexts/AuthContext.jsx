import {createContext, useState} from 'react';


export const AuthContext = createContext();




export const AuthProvider = ({children}) => {
    const[user, setUser] = useState(null);
    const[token, setToken] = useState(null);
    const[isLoading, setIsLoading] = useState(false);

    const login = (userData, authToken) => {
        //API Call

        setIsLoading(true);
        setUser(userData);
        setToken(authToken);


        setTimeout(() => {
            if (usernameOrEmail && password) {

                const fakeUser = {
                    id: 1,
                    username: usernameOrEmail.includes('@') ? usernameOrEmail.split('@')[0] : usernameOrEmail,
                    email: usernameOrEmail.includes('@') ? usernameOrEmail : `${usernameOrEmail}@example.com`,
                    role: usernameOrEmail === 'admin' ? 'admin' : 'user'
                };








                const fakeToken = ' fake-jwt-token';
                +Date.now();
                setUser(fakeUser);
                setToken(fakeToken);
                console.log('Login successful:', fakeUser, fakeToken);
            } else {
                console.log('Login failed: Missing username/email or password');

            }

            setIsLoading(false);
        }, 1000);
    };



    const logout = () => {
        setUser(null);
        setToken(null);
        console.log('User logged out');

    };

    const isAuthenticated = user != null;

    const value = {
        user,
        token,
        isLoading ,
        isAuthenticated,
        login,
        logout
    };





    return (
        <AuthContext.Provider value={{value}}>
            {children}
        </AuthContext.Provider>
    );

}
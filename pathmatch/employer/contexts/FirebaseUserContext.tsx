import {
    ReactNode,
    createContext,
    useContext,
    useCallback,
    useState,
    useEffect,
} from 'react';
import {
    User,
    UserCredential,
    applyActionCode,
    confirmPasswordReset,
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateEmail,
} from '@firebase/auth';
import firebaseApp from '@/firebase/config';

type FirebaseUserContextType = {
    firebaseUser: User | undefined;
    comfirmPasswordReset: (code: string, newPassword: string) => Promise<void>;
    createUser: (email: string, password: string) => Promise<UserCredential>;
    resetPassword: () => Promise<void>;
    sendVerificationEmail: (user: User) => Promise<void>;
    signOut: () => Promise<void>;
    updateUserEmail: (newEmail: string) => Promise<void>;
    verifyEmail: (code: string) => Promise<void>;
    reloadUser: () => Promise<void>;
};

const FirebaseUserContext = createContext<FirebaseUserContextType>({
    firebaseUser: undefined,
    comfirmPasswordReset: () => {
        throw new Error('FirebaseUserContext not initialized');
    },
    createUser: () => {
        throw new Error('FirebaseUserContext not initialized');
    },
    resetPassword: () => {
        throw new Error('FirebaseUserContext not initialized');
    },
    sendVerificationEmail: () => {
        throw new Error('FirebaseUserContext not initialized');
    },
    signOut: () => {
        throw new Error('FirebaseUserContext not initialized');
    },
    updateUserEmail: () => {
        throw new Error('FirebaseUserContext not initialized');
    },
    verifyEmail: () => {
        throw new Error('FirebaseUserContext not initialized');
    },
    reloadUser: () => {
        throw new Error('FirebaseUserContext not initialized');
    },
});

export const auth = getAuth(firebaseApp);

export const useFirebaseUserContext = () => useContext(FirebaseUserContext);

const FirebaseUserProvider = ({ children }: { children: ReactNode }) => {
    const [firebaseUser, setFirebaseUser] = useState<User | undefined>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setFirebaseUser(user);
            } else {
                setFirebaseUser(undefined);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const comfirmPasswordReset = useCallback(
        async (code: string, newPassword: string) => {
            if (firebaseUser?.email) {
                return await confirmPasswordReset(auth, code, newPassword);
            }
        },
        [firebaseUser],
    );

    const createUser = useCallback(async (email: string, password: string) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }, []);

    const sendVerificationEmail = useCallback(async (user: User) => {
        if (user) {
            await sendEmailVerification(user, {
                url:
                    `${window?.location?.origin}/action` ??
                    'https://employers.pathmatch.com/action',
            });
        }
    }, []);

    const resetPassword = useCallback(async () => {
        if (firebaseUser?.email) {
            return await sendPasswordResetEmail(auth, firebaseUser.email);
        }
    }, [firebaseUser]);

    const updateUserEmail = useCallback(
        async (newEmail: string) => {
            if (firebaseUser) {
                return await updateEmail(firebaseUser, newEmail);
            }
        },
        [firebaseUser],
    );

    const signOut = useCallback(async () => {
        await auth.signOut();
    }, []);

    const verifyEmail = useCallback(async (code: string) => {
        return await applyActionCode(auth, code);
    }, []);

    const reloadUser = useCallback(async () => {
        if (firebaseUser) {
            await firebaseUser.reload();
            setFirebaseUser(firebaseUser);
        }
    }, [firebaseUser]);

    return (
        <FirebaseUserContext.Provider
            value={{
                firebaseUser,
                comfirmPasswordReset,
                createUser,
                sendVerificationEmail,
                signOut,
                resetPassword,
                updateUserEmail,
                verifyEmail,
                reloadUser,
            }}
        >
            {children}
        </FirebaseUserContext.Provider>
    );
};

export default FirebaseUserProvider;

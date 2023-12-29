import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import { authService } from '../../services/auth-service';
import { User } from '../../models';

const UserContext = createContext<{user: User | undefined, setUser: Dispatch<SetStateAction<User | undefined>>}>({user: undefined, setUser: () => { return; }});

export function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | undefined>(authService.currentUser);

  useEffect(() => {
    authService.setHandler(setUser);

    return () => {
      authService.setHandler(undefined);
    };
  }, []);

  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
}

export function useCurrentUser() {
  return useContext(UserContext);
}

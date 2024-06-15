import { useStorageState } from './useStorageState';

export const useIsOnboarded = () => {
    const [[isLoading, isOnboarded], setIsOnboarded] = useStorageState("isOnboarded8");
    return {
        isOnboarded: isOnboarded !== null && isOnboarded !== undefined, 
        setIsOnboarded: () => setIsOnboarded("true"),
        isLoading
    }
}
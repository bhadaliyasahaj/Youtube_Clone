import { InjectionToken } from "@angular/core";

export const localStorageToken = new InjectionToken<any>('local storage',{
    providedIn:'root',
    factory: () => {
        // Check if we are in a browser environment
        if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage; // Use window.localStorage for better clarity
        }
        // Return a mock object if running in a non-browser environment
        return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
            clear: () => {},
            key: (index: number): string | null => null,
            length: 0,
        } as unknown as Storage; // Cast to Storage
    }
});
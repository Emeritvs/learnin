export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    role: string;
    theme: {
        color1: string;
        color2: string;
        color3: string;
    }
}

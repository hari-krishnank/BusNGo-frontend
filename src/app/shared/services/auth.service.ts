import { Injectable } from '@angular/core';

export type UserType = 'user' | 'owner' | 'admin' | 'staff' | null;

@Injectable({
    providedIn: 'root'
})
export class SessionManagementService {
    private currentUserType: UserType = null;

    setCurrentUserType(userType: UserType) {
        this.currentUserType = userType;
    }

    getCurrentUserType(): UserType {
        return this.currentUserType;
    }

    clearCurrentUserType() {
        this.currentUserType = null;
    }
}
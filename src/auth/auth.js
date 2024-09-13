import React from 'react'
import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService extends React.Component {
    client = new Client()
    account;
    constructor() {
        super();
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login(email, password)
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return this.account.get()
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            return this.account.deleteSessions('current');
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService()

export default authService
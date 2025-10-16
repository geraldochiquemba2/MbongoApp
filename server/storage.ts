import { type User, type InsertUser, type NewsletterSubscriber, type InsertNewsletterSubscriber, type Wallet, type InsertWallet, type SubWallet, type InsertSubWallet, type WalletTransaction, type InsertWalletTransaction } from "@shared/schema";
import { randomUUID } from "crypto";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  sessionStore: session.Store;
  getUser(id: string): Promise<User | undefined>;
  getUserByPhone(phone: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  subscribeNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscriber(email: string): Promise<NewsletterSubscriber | undefined>;
  getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  unsubscribeNewsletter(email: string): Promise<boolean>;
  reactivateNewsletterSubscriber(email: string): Promise<boolean>;
  
  getOrCreateWallet(userId: string): Promise<Wallet>;
  getWallet(userId: string): Promise<Wallet | undefined>;
  getSubWallets(walletId: string): Promise<SubWallet[]>;
  createSubWallet(subWallet: InsertSubWallet): Promise<SubWallet>;
  getSubWallet(id: string): Promise<SubWallet | undefined>;
  updateSubWalletBalance(subWalletId: string, amount: string): Promise<void>;
  addTransaction(transaction: InsertWalletTransaction): Promise<WalletTransaction>;
  getTransactions(subWalletId: string): Promise<WalletTransaction[]>;
}

export class MemStorage implements IStorage {
  public sessionStore: session.Store;
  private users: Map<string, User>;
  private newsletterSubscribers: Map<string, NewsletterSubscriber>;
  private wallets: Map<string, Wallet>;
  private subWallets: Map<string, SubWallet>;
  private transactions: Map<string, WalletTransaction>;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    this.users = new Map();
    this.newsletterSubscribers = new Map();
    this.wallets = new Map();
    this.subWallets = new Map();
    this.transactions = new Map();
    
    this.initializeTestUser();
  }
  
  private async initializeTestUser() {
    const { scrypt, randomBytes } = await import("crypto");
    const { promisify } = await import("util");
    const scryptAsync = promisify(scrypt);
    
    const password = "123456";
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    const hashedPassword = `${buf.toString("hex")}.${salt}`;
    
    const testUserId = randomUUID();
    const testUser: User = {
      id: testUserId,
      name: "Geraldo Abreu",
      phone: "923456789",
      password: hashedPassword,
      createdAt: new Date()
    };
    
    this.users.set(testUser.id, testUser);
    
    // Criar carteira com saldo inicial de 50.000 Kz
    const walletId = randomUUID();
    const wallet: Wallet = {
      id: walletId,
      userId: testUserId,
      totalBalance: "50000.00",
      createdAt: new Date(),
    };
    this.wallets.set(walletId, wallet);
    
    // Criar subcarteira de exemplo com saldo inicial
    const subWalletId = randomUUID();
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 6); // Meta para 6 meses
    
    const subWallet: SubWallet = {
      id: subWalletId,
      walletId: walletId,
      name: "Reserva para Ações BODIVA",
      goal: "Acumular capital para investir em ações de empresas consolidadas na BODIVA, com foco em empresas do setor financeiro e energia.",
      targetAmount: "100000.00",
      currentAmount: "50000.00",
      targetDate: targetDate,
      investmentType: "acoes",
      createdAt: new Date(),
    };
    this.subWallets.set(subWalletId, subWallet);
    
    // Adicionar transação inicial
    const transactionId = randomUUID();
    const transaction: WalletTransaction = {
      id: transactionId,
      subWalletId: subWalletId,
      amount: "50000.00",
      type: "deposit",
      description: "Depósito inicial - Saldo de boas-vindas",
      createdAt: new Date(),
    };
    this.transactions.set(transactionId, transaction);
    
    console.log("✅ Usuário de teste criado:");
    console.log("   Nome: Geraldo Abreu");
    console.log("   Telefone: 923456789");
    console.log("   Senha: 123456");
    console.log("   Carteira: 50.000,00 Kz");
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.phone === phone,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async subscribeNewsletter(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const id = randomUUID();
    const subscriber: NewsletterSubscriber = {
      ...insertSubscriber,
      id,
      subscribedAt: new Date(),
      active: 1,
    };
    this.newsletterSubscribers.set(insertSubscriber.email, subscriber);
    return subscriber;
  }

  async getNewsletterSubscriber(email: string): Promise<NewsletterSubscriber | undefined> {
    return this.newsletterSubscribers.get(email);
  }

  async getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return Array.from(this.newsletterSubscribers.values()).filter(sub => sub.active === 1);
  }

  async unsubscribeNewsletter(email: string): Promise<boolean> {
    const subscriber = this.newsletterSubscribers.get(email);
    if (subscriber) {
      subscriber.active = 0;
      return true;
    }
    return false;
  }

  async reactivateNewsletterSubscriber(email: string): Promise<boolean> {
    const subscriber = this.newsletterSubscribers.get(email);
    if (subscriber) {
      subscriber.active = 1;
      return true;
    }
    return false;
  }

  async getOrCreateWallet(userId: string): Promise<Wallet> {
    const existingWallet = Array.from(this.wallets.values()).find(
      (wallet) => wallet.userId === userId
    );
    
    if (existingWallet) {
      return existingWallet;
    }
    
    const id = randomUUID();
    const wallet: Wallet = {
      id,
      userId,
      totalBalance: "0",
      createdAt: new Date(),
    };
    this.wallets.set(id, wallet);
    return wallet;
  }

  async getWallet(userId: string): Promise<Wallet | undefined> {
    return Array.from(this.wallets.values()).find(
      (wallet) => wallet.userId === userId
    );
  }

  async getSubWallets(walletId: string): Promise<SubWallet[]> {
    return Array.from(this.subWallets.values()).filter(
      (subWallet) => subWallet.walletId === walletId
    );
  }

  async createSubWallet(insertSubWallet: InsertSubWallet): Promise<SubWallet> {
    const id = randomUUID();
    const subWallet: SubWallet = {
      ...insertSubWallet,
      id,
      currentAmount: "0",
      createdAt: new Date(),
    };
    this.subWallets.set(id, subWallet);
    return subWallet;
  }

  async getSubWallet(id: string): Promise<SubWallet | undefined> {
    return this.subWallets.get(id);
  }

  async updateSubWalletBalance(subWalletId: string, amount: string): Promise<void> {
    const subWallet = this.subWallets.get(subWalletId);
    if (subWallet) {
      const currentAmount = parseFloat(subWallet.currentAmount);
      const additionalAmount = parseFloat(amount);
      subWallet.currentAmount = (currentAmount + additionalAmount).toFixed(2);
      
      const wallet = this.wallets.get(subWallet.walletId);
      if (wallet) {
        const walletBalance = parseFloat(wallet.totalBalance);
        wallet.totalBalance = (walletBalance + additionalAmount).toFixed(2);
      }
    }
  }

  async addTransaction(insertTransaction: InsertWalletTransaction): Promise<WalletTransaction> {
    const id = randomUUID();
    const transaction: WalletTransaction = {
      ...insertTransaction,
      id,
      description: insertTransaction.description ?? null,
      createdAt: new Date(),
    };
    this.transactions.set(id, transaction);
    
    await this.updateSubWalletBalance(transaction.subWalletId, transaction.amount);
    
    return transaction;
  }

  async getTransactions(subWalletId: string): Promise<WalletTransaction[]> {
    return Array.from(this.transactions.values())
      .filter((transaction) => transaction.subWalletId === subWalletId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

import { storage as pgStorage } from "./pgStorage";
export const storage = pgStorage;

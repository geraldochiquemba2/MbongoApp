
import { type User, type InsertUser, type NewsletterSubscriber, type InsertNewsletterSubscriber, type Wallet, type InsertWallet, type SubWallet, type InsertSubWallet, type WalletTransaction, type InsertWalletTransaction, users, newsletterSubscribers, wallets, subWallets, walletTransactions } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import type { IStorage } from "./storage";

const MemoryStore = createMemoryStore(session);

export class PgStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.phone, phone)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    const user = result[0];
    
    // Criar carteira com saldo inicial de 50.000 Kz
    await db.insert(wallets).values({
      userId: user.id,
      totalBalance: "50000.00",
    });
    
    return user;
  }

  async subscribeNewsletter(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const result = await db.insert(newsletterSubscribers).values(insertSubscriber).returning();
    return result[0];
  }

  async getNewsletterSubscriber(email: string): Promise<NewsletterSubscriber | undefined> {
    const result = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, email)).limit(1);
    return result[0];
  }

  async getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.active, 1));
  }

  async unsubscribeNewsletter(email: string): Promise<boolean> {
    const result = await db.update(newsletterSubscribers)
      .set({ active: 0 })
      .where(eq(newsletterSubscribers.email, email))
      .returning();
    return result.length > 0;
  }

  async reactivateNewsletterSubscriber(email: string): Promise<boolean> {
    const result = await db.update(newsletterSubscribers)
      .set({ active: 1 })
      .where(eq(newsletterSubscribers.email, email))
      .returning();
    return result.length > 0;
  }

  async getOrCreateWallet(userId: string): Promise<Wallet> {
    const existing = await db.select().from(wallets).where(eq(wallets.userId, userId)).limit(1);
    
    if (existing[0]) {
      return existing[0];
    }
    
    const result = await db.insert(wallets).values({
      userId,
      totalBalance: "50000.00",
    }).returning();
    
    return result[0];
  }

  async getWallet(userId: string): Promise<Wallet | undefined> {
    const result = await db.select().from(wallets).where(eq(wallets.userId, userId)).limit(1);
    return result[0];
  }

  async getSubWallets(walletId: string): Promise<SubWallet[]> {
    return await db.select().from(subWallets).where(eq(subWallets.walletId, walletId));
  }

  async createSubWallet(insertSubWallet: InsertSubWallet): Promise<SubWallet> {
    const result = await db.insert(subWallets).values(insertSubWallet).returning();
    return result[0];
  }

  async getSubWallet(id: string): Promise<SubWallet | undefined> {
    const result = await db.select().from(subWallets).where(eq(subWallets.id, id)).limit(1);
    return result[0];
  }

  async updateSubWalletBalance(subWalletId: string, amount: string): Promise<void> {
    const subWallet = await this.getSubWallet(subWalletId);
    if (!subWallet) return;
    
    const currentAmount = parseFloat(subWallet.currentAmount);
    const additionalAmount = parseFloat(amount);
    const newAmount = (currentAmount + additionalAmount).toFixed(2);
    
    await db.update(subWallets)
      .set({ currentAmount: newAmount })
      .where(eq(subWallets.id, subWalletId));
    
    const wallet = await db.select().from(wallets).where(eq(wallets.id, subWallet.walletId)).limit(1);
    if (wallet[0]) {
      const walletBalance = parseFloat(wallet[0].totalBalance);
      const newWalletBalance = (walletBalance + additionalAmount).toFixed(2);
      
      await db.update(wallets)
        .set({ totalBalance: newWalletBalance })
        .where(eq(wallets.id, subWallet.walletId));
    }
  }

  async addTransaction(insertTransaction: InsertWalletTransaction): Promise<WalletTransaction> {
    const result = await db.insert(walletTransactions).values(insertTransaction).returning();
    const transaction = result[0];
    
    await this.updateSubWalletBalance(transaction.subWalletId, transaction.amount);
    
    return transaction;
  }

  async getTransactions(subWalletId: string): Promise<WalletTransaction[]> {
    return await db.select().from(walletTransactions)
      .where(eq(walletTransactions.subWalletId, subWalletId))
      .orderBy(walletTransactions.createdAt);
  }
}

export const storage = new PgStorage();

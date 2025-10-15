import { type User, type InsertUser, type NewsletterSubscriber, type InsertNewsletterSubscriber } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  subscribeNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscriber(email: string): Promise<NewsletterSubscriber | undefined>;
  getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  unsubscribeNewsletter(email: string): Promise<boolean>;
  reactivateNewsletterSubscriber(email: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private newsletterSubscribers: Map<string, NewsletterSubscriber>;

  constructor() {
    this.users = new Map();
    this.newsletterSubscribers = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
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
}

export const storage = new MemStorage();

import { 
  users, 
  transactions, 
  notifications, 
  documentVerifications, 
  paymentSubmissions, 
  marketData,
  type User, 
  type InsertUser, 
  type UpdateUser,
  type Transaction, 
  type InsertTransaction, 
  type UpdateTransaction,
  type Notification, 
  type InsertNotification, 
  type UpdateNotification,
  type DocumentVerification, 
  type InsertDocumentVerification, 
  type UpdateDocumentVerification,
  type PaymentSubmission, 
  type InsertPaymentSubmission, 
  type UpdatePaymentSubmission,
  type MarketData, 
  type InsertMarketData 
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: UpdateUser): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;

  // Transaction operations
  getTransaction(id: number): Promise<Transaction | undefined>;
  getTransactionsByUserId(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, updates: UpdateTransaction): Promise<Transaction | undefined>;
  deleteTransaction(id: number): Promise<boolean>;

  // Notification operations
  getNotification(id: number): Promise<Notification | undefined>;
  getNotificationsByUserId(userId: number): Promise<Notification[]>;
  getUnreadNotificationsByUserId(userId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  updateNotification(id: number, updates: UpdateNotification): Promise<Notification | undefined>;
  markNotificationAsRead(id: number): Promise<boolean>;
  markAllNotificationsAsRead(userId: number): Promise<boolean>;
  deleteNotification(id: number): Promise<boolean>;

  // Document verification operations
  getDocumentVerification(id: number): Promise<DocumentVerification | undefined>;
  getDocumentVerificationsByUserId(userId: number): Promise<DocumentVerification[]>;
  createDocumentVerification(verification: InsertDocumentVerification): Promise<DocumentVerification>;
  updateDocumentVerification(id: number, updates: UpdateDocumentVerification): Promise<DocumentVerification | undefined>;
  deleteDocumentVerification(id: number): Promise<boolean>;

  // Payment submission operations
  getPaymentSubmission(id: number): Promise<PaymentSubmission | undefined>;
  getPaymentSubmissionsByUserId(userId: number): Promise<PaymentSubmission[]>;
  createPaymentSubmission(submission: InsertPaymentSubmission): Promise<PaymentSubmission>;
  updatePaymentSubmission(id: number, updates: UpdatePaymentSubmission): Promise<PaymentSubmission | undefined>;
  deletePaymentSubmission(id: number): Promise<boolean>;

  // Market data operations
  getMarketData(symbol: string): Promise<MarketData | undefined>;
  getAllMarketData(): Promise<MarketData[]>;
  createOrUpdateMarketData(data: InsertMarketData): Promise<MarketData>;
  deleteMarketData(symbol: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private transactions: Map<number, Transaction>;
  private notifications: Map<number, Notification>;
  private documentVerifications: Map<number, DocumentVerification>;
  private paymentSubmissions: Map<number, PaymentSubmission>;
  private marketData: Map<string, MarketData>;
  private currentUserId: number;
  private currentTransactionId: number;
  private currentNotificationId: number;
  private currentDocumentId: number;
  private currentPaymentId: number;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.notifications = new Map();
    this.documentVerifications = new Map();
    this.paymentSubmissions = new Map();
    this.marketData = new Map();
    this.currentUserId = 1;
    this.currentTransactionId = 1;
    this.currentNotificationId = 1;
    this.currentDocumentId = 1;
    this.currentPaymentId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = {
      id,
      email: insertUser.email,
      firstName: insertUser.firstName,
      lastName: insertUser.lastName,
      phone: insertUser.phone,
      country: insertUser.country,
      currency: insertUser.currency,
      accountTier: insertUser.accountTier || 'Bronze',
      isVerified: insertUser.isVerified || false,
      invested: insertUser.invested || '0.00',
      profit: insertUser.profit || '0.00',
      bonus: insertUser.bonus || '0.00',
      balance: insertUser.balance || '0.00',
      btcEquivalent: insertUser.btcEquivalent || '0.00000000',
      depositAddress: insertUser.depositAddress || null,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: UpdateUser): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser: User = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  // Transaction operations
  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(t => t.userId === userId);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentTransactionId++;
    const now = new Date();
    const transaction: Transaction = {
      id,
      userId: insertTransaction.userId,
      type: insertTransaction.type,
      amount: insertTransaction.amount,
      status: insertTransaction.status || 'pending',
      description: insertTransaction.description || null,
      reference: insertTransaction.reference || null,
      createdAt: now,
      updatedAt: now,
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async updateTransaction(id: number, updates: UpdateTransaction): Promise<Transaction | undefined> {
    const transaction = this.transactions.get(id);
    if (!transaction) return undefined;

    const updatedTransaction: Transaction = {
      ...transaction,
      ...updates,
      updatedAt: new Date(),
    };
    this.transactions.set(id, updatedTransaction);
    return updatedTransaction;
  }

  async deleteTransaction(id: number): Promise<boolean> {
    return this.transactions.delete(id);
  }

  // Notification operations
  async getNotification(id: number): Promise<Notification | undefined> {
    return this.notifications.get(id);
  }

  async getNotificationsByUserId(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(n => n.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getUnreadNotificationsByUserId(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(n => n.userId === userId && !n.isRead)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = this.currentNotificationId++;
    const notification: Notification = {
      id,
      userId: insertNotification.userId,
      type: insertNotification.type,
      title: insertNotification.title,
      message: insertNotification.message,
      isRead: insertNotification.isRead || false,
      createdAt: new Date(),
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async updateNotification(id: number, updates: UpdateNotification): Promise<Notification | undefined> {
    const notification = this.notifications.get(id);
    if (!notification) return undefined;

    const updatedNotification: Notification = {
      ...notification,
      ...updates,
    };
    this.notifications.set(id, updatedNotification);
    return updatedNotification;
  }

  async markNotificationAsRead(id: number): Promise<boolean> {
    const notification = this.notifications.get(id);
    if (!notification) return false;

    const updatedNotification: Notification = {
      ...notification,
      isRead: true,
    };
    this.notifications.set(id, updatedNotification);
    return true;
  }

  async markAllNotificationsAsRead(userId: number): Promise<boolean> {
    let updated = false;
    for (const [id, notification] of this.notifications.entries()) {
      if (notification.userId === userId && !notification.isRead) {
        const updatedNotification: Notification = {
          ...notification,
          isRead: true,
        };
        this.notifications.set(id, updatedNotification);
        updated = true;
      }
    }
    return updated;
  }

  async deleteNotification(id: number): Promise<boolean> {
    return this.notifications.delete(id);
  }

  // Document verification operations
  async getDocumentVerification(id: number): Promise<DocumentVerification | undefined> {
    return this.documentVerifications.get(id);
  }

  async getDocumentVerificationsByUserId(userId: number): Promise<DocumentVerification[]> {
    return Array.from(this.documentVerifications.values())
      .filter(d => d.userId === userId)
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  async createDocumentVerification(insertVerification: InsertDocumentVerification): Promise<DocumentVerification> {
    const id = this.currentDocumentId++;
    const verification: DocumentVerification = {
      id,
      userId: insertVerification.userId,
      documentType: insertVerification.documentType,
      frontImageUrl: insertVerification.frontImageUrl,
      backImageUrl: insertVerification.backImageUrl,
      status: insertVerification.status || 'pending',
      submittedAt: new Date(),
      reviewedAt: null,
      reviewNotes: insertVerification.reviewNotes || null,
    };
    this.documentVerifications.set(id, verification);
    return verification;
  }

  async updateDocumentVerification(id: number, updates: UpdateDocumentVerification): Promise<DocumentVerification | undefined> {
    const verification = this.documentVerifications.get(id);
    if (!verification) return undefined;

    const updatedVerification: DocumentVerification = {
      ...verification,
      ...updates,
    };
    this.documentVerifications.set(id, updatedVerification);
    return updatedVerification;
  }

  async deleteDocumentVerification(id: number): Promise<boolean> {
    return this.documentVerifications.delete(id);
  }

  // Payment submission operations
  async getPaymentSubmission(id: number): Promise<PaymentSubmission | undefined> {
    return this.paymentSubmissions.get(id);
  }

  async getPaymentSubmissionsByUserId(userId: number): Promise<PaymentSubmission[]> {
    return Array.from(this.paymentSubmissions.values())
      .filter(p => p.userId === userId)
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  async createPaymentSubmission(insertSubmission: InsertPaymentSubmission): Promise<PaymentSubmission> {
    const id = this.currentPaymentId++;
    const submission: PaymentSubmission = {
      id,
      userId: insertSubmission.userId,
      amount: insertSubmission.amount,
      screenshotUrl: insertSubmission.screenshotUrl,
      status: insertSubmission.status || 'pending',
      submittedAt: new Date(),
      processedAt: null,
      processingNotes: insertSubmission.processingNotes || null,
    };
    this.paymentSubmissions.set(id, submission);
    return submission;
  }

  async updatePaymentSubmission(id: number, updates: UpdatePaymentSubmission): Promise<PaymentSubmission | undefined> {
    const submission = this.paymentSubmissions.get(id);
    if (!submission) return undefined;

    const updatedSubmission: PaymentSubmission = {
      ...submission,
      ...updates,
    };
    this.paymentSubmissions.set(id, updatedSubmission);
    return updatedSubmission;
  }

  async deletePaymentSubmission(id: number): Promise<boolean> {
    return this.paymentSubmissions.delete(id);
  }

  // Market data operations
  async getMarketData(symbol: string): Promise<MarketData | undefined> {
    return this.marketData.get(symbol);
  }

  async getAllMarketData(): Promise<MarketData[]> {
    return Array.from(this.marketData.values());
  }

  async createOrUpdateMarketData(insertData: InsertMarketData): Promise<MarketData> {
    const existing = this.marketData.get(insertData.symbol);
    const id = existing?.id || this.marketData.size + 1;
    
    const data: MarketData = {
      id,
      symbol: insertData.symbol,
      price: insertData.price,
      change24h: insertData.change24h,
      changePercent24h: insertData.changePercent24h,
      volume24h: insertData.volume24h || null,
      lastUpdated: new Date(),
    };
    this.marketData.set(insertData.symbol, data);
    return data;
  }

  async deleteMarketData(symbol: string): Promise<boolean> {
    return this.marketData.delete(symbol);
  }
}

export const storage = new MemStorage();

import React from 'react';
import { DEFAULT_USER, UserCredentials } from './default-user';

export interface RegisteredUser {
  mobileNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  pin: string;
  birthdate?: string;
  address?: string;
}

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: 'send' | 'receive' | 'transfer' | 'bill';
  date: string;
  group: 'Today' | 'Yesterday';
  refNumber?: string;
}

export interface InboxNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'transaction' | 'promo';
  read?: boolean;
}

type Listener = () => void;

class GlobalState {
  private listeners = new Set<Listener>();

  public registeredUser: RegisteredUser | null = null;
  public activeUser: UserCredentials | null = null;
  public isLoggedIn: boolean = false;
  
  // Starting balance
  public balance: number = 500.00;

  // Transactions list with generic, fake mock records
  public transactions: Transaction[] = [
    {
      id: 'tx_jollibee',
      title: 'Pay via Scanned QR',
      subtitle: 'To Jollibee',
      amount: -180.00,
      type: 'send',
      date: 'Jun 14, 2026 2:20 PM',
      group: 'Today',
      refNumber: '0041848659112',
    },
    {
      id: 'tx_1',
      title: 'Send Money',
      subtitle: 'To Juan D.',
      amount: -150.00,
      type: 'send',
      date: '1:50 PM',
      group: 'Today',
      refNumber: '0041852918501',
    },
    {
      id: 'tx_2',
      title: 'Send Money',
      subtitle: 'From Maria L.',
      amount: 200.00,
      type: 'receive',
      date: '1:07 PM',
      group: 'Today',
      refNumber: '0041852918502',
    },
    {
      id: 'tx_3',
      title: 'Send Money',
      subtitle: 'To Pedro S.',
      amount: -300.00,
      type: 'send',
      date: '12:34 PM',
      group: 'Today',
      refNumber: '0041852918503',
    },
    {
      id: 'tx_4',
      title: 'Cashin via Instapay',
      subtitle: 'Via Online banking',
      amount: 1000.00,
      type: 'receive',
      date: '11:44 AM',
      group: 'Today',
      refNumber: '0041852918504',
    },
    {
      id: 'tx_5',
      title: 'Pay via Scanned QR',
      subtitle: 'To Coffee Shop',
      amount: -120.00,
      type: 'send',
      date: '1:49 AM',
      group: 'Today',
      refNumber: '0041852918505',
    },
    {
      id: 'tx_6',
      title: 'Pay via Scanned QR',
      subtitle: 'To Supermarket',
      amount: -450.00,
      type: 'send',
      date: '1:29 AM',
      group: 'Today',
      refNumber: '0041852918506',
    },
    {
      id: 'tx_7',
      title: 'Send Money',
      subtitle: 'From Alex G.',
      amount: 80.00,
      type: 'receive',
      date: '11:45 AM',
      group: 'Yesterday',
      refNumber: '0041852918507',
    },
  ];

  // Inbox Notifications with generic, fake mock records
  public notifications: InboxNotification[] = [
    {
      id: 'notif_1',
      title: 'Express Send Notification',
      body: 'You have received PHP 1200.00 from LI*...',
      time: 'a few hours ago',
      type: 'transaction',
      read: false,
    },
    {
      id: 'notif_2',
      title: 'SAVE MORE, WITHDRAW F...',
      body: 'Access your money anytime, anywhere...',
      time: 'yesterday 1:18 PM',
      type: 'promo',
      read: false,
    },
    {
      id: 'notif_3',
      title: 'Dividend Alert: SMC and P...',
      body: 'SMC, Petron preferred shares, and B...',
      time: 'yesterday 12:11 PM',
      type: 'promo',
      read: false,
    },
    {
      id: 'notif_4',
      title: 'SAVE MORE, WITHDRAW FRE...',
      body: 'Access your money anytime, anywhere—n...',
      time: 'Jun 16, 2026',
      type: 'promo',
      read: false,
    },
    {
      id: 'notif_5',
      title: 'Successful Payment via QR',
      body: 'You have paid P1,000.00 via GCash to 747 L...',
      time: 'Jun 16, 2026',
      type: 'transaction',
      read: false,
    },
    {
      id: 'notif_6',
      title: 'Successful Payment via QR',
      body: 'You have paid P1,000.00 via GCash to 747 L...',
      time: 'Jun 16, 2026',
      type: 'transaction',
      read: false,
    },
    {
      id: 'notif_7',
      title: 'Can peace talks lift PSEi?',
      body: 'Iran-US talks lowered oil prices, giving hop...',
      time: 'Jun 16, 2026',
      type: 'promo',
      read: false,
    },
    {
      id: 'notif_8',
      title: 'GCash Funds Received',
      body: 'You have received 385.00 of GCash from P...',
      time: 'Jun 16, 2026',
      type: 'transaction',
      read: false,
    },
    {
      id: 'notif_9',
      title: 'Express Send Notification',
      body: 'You have received PHP 300.00 of GCash fr...',
      time: 'Jun 05, 2026',
      type: 'transaction',
      read: false,
    },
    {
      id: 'notif_10',
      title: 'Express Send Notification',
      body: 'You have sent PHP 159.00 to KY*A RE**E T....',
      time: 'Jun 04, 2026',
      type: 'transaction',
      read: false,
    },
    {
      id: 'notif_11',
      title: 'Your Buy Load Transaction Up...',
      body: 'You have paid P37.00 of GCash to purchase...',
      time: 'Jun 04, 2026',
      type: 'transaction',
      read: false,
    },
    {
      id: 'notif_12',
      title: 'Express Send Notification',
      body: 'You have sent PHP 139.00 to AL****O JO*E...',
      time: 'Jun 11, 2026',
      type: 'transaction',
      read: true,
    },
    {
      id: 'notif_13',
      title: 'Express Send Notification',
      body: 'You have sent PHP 110.00 to MA****R P. +...',
      time: 'Jun 04, 2026',
      type: 'transaction',
      read: true,
    },
  ];

  getUser(mobileNumber: string): UserCredentials | null {
    if (this.registeredUser && this.registeredUser.mobileNumber === mobileNumber) {
      return {
        mobileNumber: this.registeredUser.mobileNumber,
        pin: this.registeredUser.pin,
        firstName: this.registeredUser.firstName,
        lastName: this.registeredUser.lastName,
        email: this.registeredUser.email,
        birthdate: this.registeredUser.birthdate || DEFAULT_USER.birthdate,
        address: this.registeredUser.address || DEFAULT_USER.address,
        balance: this.balance,
      };
    }
    if (DEFAULT_USER.mobileNumber === mobileNumber) {
      return {
        ...DEFAULT_USER,
        balance: this.balance,
      };
    }
    return null;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    this.listeners.forEach((l) => l());
  }

  setRegisteredUser(user: RegisteredUser | null) {
    this.registeredUser = user;
    if (user) {
      this.activeUser = {
        mobileNumber: user.mobileNumber,
        pin: user.pin,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthdate: user.birthdate || DEFAULT_USER.birthdate,
        address: user.address || DEFAULT_USER.address,
        balance: this.balance,
      };
    } else {
      this.activeUser = null;
    }
    this.notify();
  }

  setActiveUser(user: UserCredentials | null) {
    this.activeUser = user;
    this.notify();
  }

  updateEmail(email: string) {
    if (this.registeredUser) {
      this.registeredUser.email = email;
    }
    if (this.activeUser) {
      this.activeUser.email = email;
    }
    this.notify();
  }

  updatePin(pin: string) {
    if (this.registeredUser) {
      this.registeredUser.pin = pin;
    }
    if (this.activeUser) {
      this.activeUser.pin = pin;
    }
    // Keep the default user's PIN in sync so the change persists
    // across sessions when no registered user exists.
    if (DEFAULT_USER) {
      DEFAULT_USER.pin = pin;
    }
    this.notify();
  }

  setLoggedIn(status: boolean) {
    this.isLoggedIn = status;
    this.notify();
  }

  setBalance(amount: number) {
    this.balance = amount;
    if (this.activeUser) {
      this.activeUser.balance = amount;
    }
    this.notify();
  }

  addTransaction(tx: Omit<Transaction, 'id' | 'date' | 'group' | 'refNumber'> & { refNumber?: string }) {
    const timeString = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const newTx: Transaction = {
      ...tx,
      id: `tx_${Date.now()}`,
      date: timeString,
      group: 'Today',
      refNumber: tx.refNumber || `0041${Math.floor(100000000 + Math.random() * 900000000).toString()}`,
    };
    this.transactions = [newTx, ...this.transactions];
    this.notify();
  }

  addNotification(notif: Omit<InboxNotification, 'id' | 'time'>) {
    const newNotif: InboxNotification = {
      ...notif,
      id: `notif_${Date.now()}`,
      time: 'Just now',
    };
    this.notifications = [newNotif, ...this.notifications];
    this.notify();
  }

  markNotificationAsRead(id: string) {
    const notif = this.notifications.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
      this.notify();
    }
  }

  reset() {
    this.registeredUser = null;
    this.activeUser = null;
    this.isLoggedIn = false;
    this.balance = 500.00;
    this.transactions = [
      {
        id: 'tx_jollibee',
        title: 'Pay via Scanned QR',
        subtitle: 'To Jollibee',
        amount: -180.00,
        type: 'send',
        date: 'Jun 14, 2026 2:20 PM',
        group: 'Today',
        refNumber: '0041848659112',
      },
      {
        id: 'tx_1',
        title: 'Send Money',
        subtitle: 'To Juan D.',
        amount: -150.00,
        type: 'send',
        date: '1:50 PM',
        group: 'Today',
        refNumber: '0041852918501',
      },
      {
        id: 'tx_2',
        title: 'Send Money',
        subtitle: 'From Maria L.',
        amount: 200.00,
        type: 'receive',
        date: '1:07 PM',
        group: 'Today',
        refNumber: '0041852918502',
      },
      {
        id: 'tx_3',
        title: 'Send Money',
        subtitle: 'To Pedro S.',
        amount: -300.00,
        type: 'send',
        date: '12:34 PM',
        group: 'Today',
        refNumber: '0041852918503',
      },
      {
        id: 'tx_4',
        title: 'Cashin via Instapay',
        subtitle: 'Via Online banking',
        amount: 1000.00,
        type: 'receive',
        date: '11:44 AM',
        group: 'Today',
        refNumber: '0041852918504',
      },
      {
        id: 'tx_5',
        title: 'Pay via Scanned QR',
        subtitle: 'To Coffee Shop',
        amount: -120.00,
        type: 'send',
        date: '1:49 AM',
        group: 'Today',
        refNumber: '0041852918505',
      },
      {
        id: 'tx_6',
        title: 'Pay via Scanned QR',
        subtitle: 'To Supermarket',
        amount: -450.00,
        type: 'send',
        date: '1:29 AM',
        group: 'Today',
        refNumber: '0041852918506',
      },
      {
        id: 'tx_7',
        title: 'Send Money',
        subtitle: 'From Alex G.',
        amount: 80.00,
        type: 'receive',
        date: '11:45 AM',
        group: 'Yesterday',
        refNumber: '0041852918507',
      },
    ];
    this.notifications = [
      {
        id: 'notif_1',
        title: 'Express Send Notification',
        body: 'You have received PHP 1200.00 from LI*...',
        time: 'a few hours ago',
        type: 'transaction',
        read: false,
      },
      {
        id: 'notif_2',
        title: 'SAVE MORE, WITHDRAW F...',
        body: 'Access your money anytime, anywhere...',
        time: 'yesterday 1:18 PM',
        type: 'promo',
        read: false,
      },
      {
        id: 'notif_3',
        title: 'Dividend Alert: SMC and P...',
        body: 'SMC, Petron preferred shares, and B...',
        time: 'yesterday 12:11 PM',
        type: 'promo',
        read: false,
      },
      {
        id: 'notif_4',
        title: 'SAVE MORE, WITHDRAW FRE...',
        body: 'Access your money anytime, anywhere—n...',
        time: 'Jun 16, 2026',
        type: 'promo',
        read: false,
      },
      {
        id: 'notif_5',
        title: 'Successful Payment via QR',
        body: 'You have paid P1,000.00 via GCash to 747 L...',
        time: 'Jun 16, 2026',
        type: 'transaction',
        read: false,
      },
      {
        id: 'notif_6',
        title: 'Successful Payment via QR',
        body: 'You have paid P1,000.00 via GCash to 747 L...',
        time: 'Jun 16, 2026',
        type: 'transaction',
        read: false,
      },
      {
        id: 'notif_7',
        title: 'Can peace talks lift PSEi?',
        body: 'Iran-US talks lowered oil prices, giving hop...',
        time: 'Jun 16, 2026',
        type: 'promo',
        read: false,
      },
      {
        id: 'notif_8',
        title: 'GCash Funds Received',
        body: 'You have received 385.00 of GCash from P...',
        time: 'Jun 16, 2026',
        type: 'transaction',
        read: false,
      },
      {
        id: 'notif_9',
        title: 'Express Send Notification',
        body: 'You have received PHP 300.00 of GCash fr...',
        time: 'Jun 05, 2026',
        type: 'transaction',
        read: false,
      },
      {
        id: 'notif_10',
        title: 'Express Send Notification',
        body: 'You have sent PHP 159.00 to KY*A RE**E T....',
        time: 'Jun 04, 2026',
        type: 'transaction',
        read: false,
      },
      {
        id: 'notif_11',
        title: 'Your Buy Load Transaction Up...',
        body: 'You have paid P37.00 of GCash to purchase...',
        time: 'Jun 04, 2026',
        type: 'transaction',
        read: false,
      },
      {
        id: 'notif_12',
        title: 'Express Send Notification',
        body: 'You have sent PHP 139.00 to AL****O JO*E...',
        time: 'Jun 11, 2026',
        type: 'transaction',
        read: true,
      },
      {
        id: 'notif_13',
        title: 'Express Send Notification',
        body: 'You have sent PHP 110.00 to MA****R P. +...',
        time: 'Jun 04, 2026',
        type: 'transaction',
        read: true,
      },
    ];
    this.notify();
  }
}

export const globalState = new GlobalState();

export function useGlobalState() {
  const [state, setState] = React.useState({
    registeredUser: globalState.registeredUser,
    activeUser: globalState.activeUser,
    isLoggedIn: globalState.isLoggedIn,
    balance: globalState.balance,
    transactions: globalState.transactions,
    notifications: globalState.notifications,
  });

  React.useEffect(() => {
    return globalState.subscribe(() => {
      setState({
        registeredUser: globalState.registeredUser,
        activeUser: globalState.activeUser,
        isLoggedIn: globalState.isLoggedIn,
        balance: globalState.balance,
        transactions: globalState.transactions,
        notifications: globalState.notifications,
      });
    });
  }, []);

  return state;
}

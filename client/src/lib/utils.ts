import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function formatBTC(amount: number): string {
  return `₿${amount.toFixed(5)}`;
}

export function formatPercentage(value: number): string {
  const formatted = value.toFixed(2);
  return `${value >= 0 ? '+' : ''}${formatted}%`;
}

export function generateDepositAddress(): string {
  // Generate a mock Bitcoin address for demonstration
  return '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2';
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function generateTransactionId(): string {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
}

export const countries = [
  { value: 'US', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'IN', label: 'India' },
  { value: 'JP', label: 'Japan' },
  { value: 'BR', label: 'Brazil' },
  { value: 'MX', label: 'Mexico' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' },
  { value: 'RU', label: 'Russia' },
  { value: 'CN', label: 'China' },
  { value: 'KR', label: 'South Korea' },
  { value: 'SG', label: 'Singapore' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'CH', label: 'Switzerland' },
];

export const currencies = [
  { value: 'USD', label: 'USD - US Dollar' },
  { value: 'EUR', label: 'EUR - Euro' },
  { value: 'GBP', label: 'GBP - British Pound' },
  { value: 'CAD', label: 'CAD - Canadian Dollar' },
  { value: 'AUD', label: 'AUD - Australian Dollar' },
  { value: 'JPY', label: 'JPY - Japanese Yen' },
  { value: 'NGN', label: 'NGN - Nigerian Naira' },
  { value: 'ZAR', label: 'ZAR - South African Rand' },
  { value: 'INR', label: 'INR - Indian Rupee' },
  { value: 'BRL', label: 'BRL - Brazilian Real' },
  { value: 'MXN', label: 'MXN - Mexican Peso' },
  { value: 'CHF', label: 'CHF - Swiss Franc' },
  { value: 'CNY', label: 'CNY - Chinese Yuan' },
  { value: 'KRW', label: 'KRW - South Korean Won' },
  { value: 'SGD', label: 'SGD - Singapore Dollar' },
  { value: 'AED', label: 'AED - UAE Dirham' },
];

export const accountTiers = [
  {
    name: 'Bronze',
    price: 500,
    color: 'orange',
    features: [
      '24x7 Support',
      'Professional Charts',
      'Trading Alerts',
      'Trading Central Bronze',
      'No Bonus',
      'No Live Trading With Experts',
      'No SMS & Email Alerts'
    ],
    current: true
  },
  {
    name: 'Silver',
    price: 1500,
    color: 'slate',
    features: [
      '24x7 Support',
      'Professional Charts',
      'Trading Alerts',
      'Trading Central Silver',
      '$500 USD Bonus',
      'No Live Trading With Experts',
      'No SMS & Email Alerts'
    ],
    popular: true
  },
  {
    name: 'Gold',
    price: 3000,
    color: 'yellow',
    features: [
      '24x7 Support',
      'Professional Charts',
      'Trading Alerts',
      'Trading Central Gold',
      '$850 USD Bonus',
      'Live Trading With Experts',
      'SMS & Email Alerts'
    ],
    recommended: true
  },
  {
    name: 'Platinum',
    price: 4500,
    color: 'gray',
    features: [
      '24x7 Support',
      'Professional Charts',
      'Trading Alerts',
      'Trading Central Gold',
      '$1,500 USD Bonus',
      'Live Trading With Experts',
      'SMS & Email Alerts'
    ],
    premium: true
  },
  {
    name: 'Diamond',
    price: 50000,
    color: 'cyan',
    features: [
      '24x7 Support',
      'Professional Charts',
      'Trading Alerts',
      'Trading Central Gold',
      '$35,000 USD Bonus',
      'Live Trading With Experts',
      'Priority Support'
    ],
    exclusive: true
  }
];

import type { CustomerDetails } from "@/types/order";

export interface CartItemLike {
  name: string;
  material: string;
  price: number;
  quantity: number;
}

export function formatWhatsAppBusinessNumber(raw?: string): string {
  let num = (raw || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923719145871").replace(/[^0-9]/g, "");
  if (num.startsWith("0")) {
    num = "92" + num.slice(1);
  }
  return num;
}

export function generateWhatsAppOrderMessage(
  items: CartItemLike[],
  customer: CustomerDetails
): string {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const orderId = customer.orderId || `CK-${Math.floor(10000 + Math.random() * 90000)}`;

  let message = `*NEW ORDER — CUFFKINGS ATELIER*\n`;
  message += `*Order Reference:* #${orderId}\n\n`;
  message += `*Customer Details:*\n`;
  message += `• Name: ${customer.name}\n`;
  message += `• Phone: ${customer.phone}\n`;
  message += `• Delivery Address: ${customer.address}\n`;
  message += `• City: ${customer.city}\n`;
  if (customer.paymentMethod) {
    message += `• Payment Method: ${customer.paymentMethod}\n`;
  }
  if (customer.notes && customer.notes.trim()) {
    message += `• Special Notes: ${customer.notes.trim()}\n`;
  }
  message += `\n*Order Items (${items.reduce((s, i) => s + i.quantity, 0)} total):*\n`;

  items.forEach((item, index) => {
    message += `\n${index + 1}. *${item.name}*\n`;
    message += `   • Material: ${item.material}\n`;
    message += `   • Quantity: ${item.quantity}\n`;
    message += `   • Price: Rs. ${item.price.toLocaleString()}\n`;
    message += `   • Subtotal: Rs. ${(item.price * item.quantity).toLocaleString()}\n`;
  });

  message += `\n*Total Amount: Rs. ${subtotal.toLocaleString()}*\n`;
  message += `*Delivery:* Standard Nationwide Delivery\n\n`;
  message += `Please confirm this order and advise the estimated delivery schedule. Thank you!`;

  return message;
}

export function generateWhatsAppURL(
  items: CartItemLike[],
  customer: CustomerDetails
): string {
  const businessNumber = formatWhatsAppBusinessNumber();
  const message = generateWhatsAppOrderMessage(items, customer);
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${businessNumber}?text=${encodedMessage}`;
}

export interface InquiryDetails {
  name: string;
  inquiryType: string;
  message: string;
}

export function generateInquiryWhatsAppURL(inquiry: InquiryDetails): string {
  const businessNumber = formatWhatsAppBusinessNumber();

  let text = `*New Inquiry — CuffKings Atelier*\n\n`;
  text += `*Client Name:* ${inquiry.name}\n`;
  text += `*Inquiry Type:* ${inquiry.inquiryType}\n\n`;
  text += `*Message:*\n${inquiry.message}\n\n`;
  text += `Sent from the CuffKings website contact page.`;

  return `https://wa.me/${businessNumber}?text=${encodeURIComponent(text)}`;
}

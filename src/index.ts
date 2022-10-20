import {invoices} from './invoices.js';
import {plays} from './plays.js';
import { InvoiceUtilities } from './InvoiceUtilities.js';
import { Invoice, Play } from './types.js';

const invoicesJSON: Invoice[] = JSON.parse(invoices);
const playsJSON: Record<string, Play> = JSON.parse(plays);

console.log(InvoiceUtilities.printInvoice(invoicesJSON, playsJSON));

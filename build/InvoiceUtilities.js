export class InvoiceUtilities {
    static printInvoice(invoices, plays) {
        let totalAmount = 0; //  monto total
        let volumeCredits = 0;
        let result = `Detalle de factura para ${invoices[0].customer}\n`; // customer(cliente) currency(moneda)
        for (let perf of invoices[0].performances) { // performarce(actuación) construir lo que se va sacando por la consola
            const play = plays[perf.playID];
            const thisAmount = InvoiceUtilities.CalculatePaymentAmount(perf.audience, play.type);
            const thisCredits = InvoiceUtilities.CalculateCredits(perf.audience, play.type);
            // print line for this order
            result += `${play.name}: ${InvoiceUtilities.format(thisAmount / 100)} (${perf.audience} asientos)\n`;
            // add volume credits
            volumeCredits += thisCredits;
            totalAmount += thisAmount;
        }
        result += `Total a pagar ${InvoiceUtilities.format(totalAmount / 100)}\n`;
        result += `Has ganado ${volumeCredits} creditos\n`;
        return result;
    }
    static CalculateCredits(audience, playType) {
        let thisCredits = Math.max(audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === playType)
            thisCredits += Math.floor(audience / 5);
        return thisCredits;
    }
    static CalculatePaymentAmount(audience, playType) {
        let thisAmount = 0;
        switch (playType) {
            case "tragedy":
                thisAmount = 40000;
                if (audience > 30) {
                    thisAmount += 1000 * (audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (audience > 20) {
                    thisAmount += 10000 + 500 * (audience - 20);
                }
                thisAmount += 300 * audience;
                break;
            default:
                throw new Error(`Tipo desconocido: ${playType}`);
        }
        return thisAmount;
    }
}
InvoiceUtilities.format = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format; // format es una función que te permite formatear números

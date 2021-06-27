const AffiliateFormat = require('./AffiliateFormat');
const BillFormat = require('./BillFormat');

class BarcodeValidation {
    strBarcode = "";
    currentBarcodeLength = 0;
    barcodeFormat;

    constructor(strBarcode) {
        this.strBarcode = strBarcode;
        this.currentBarcodeLength = strBarcode.length;

        if(this.currentBarcodeLength == BillFormat.barcodeLength) {
            this.barcodeFormat = new BillFormat(this.strBarcode);
        } else if(this.currentBarcodeLength == AffiliateFormat.barcodeLength) {
            this.barcodeFormat = new AffiliateFormat(this.strBarcode);
        } else {
            throw "Barcode format undefined.";
        }
    };

    getConvertedBarcode() {
        return this.barcodeFormat.getConvertedBarcode();
    };

    getAmount() {
        return this.barcodeFormat.getFormattedAmount();
    };

    getExpirationDate() {
        return this.barcodeFormat.getFormattedExpirationDate();
    };

    getBarcode() {
        return this.strBarcode;
    };

};

module.exports = BarcodeValidation;
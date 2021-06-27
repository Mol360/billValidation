class AffiliateFormat {
    static barcodeLength = 48;
    strBarcode = "";

    constructor(strBarcode) {
        this.strBarcode = strBarcode;
    };

    getText(){
        return "affiliateFormat";
    };
};

module.exports = AffiliateFormat;
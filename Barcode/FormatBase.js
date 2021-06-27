class FormatBase {
    static TEN_MODULE = 10;
    static ELEVEN_MODULE = 11;
    
    barcodeLength;
    strBillPattern;
    objBillPattern;

    constructor(strBarcode, barcodeLength) {
        this.strBarcode = strBarcode;
        this.barcodeLength = barcodeLength;
    };

    isBarcodeLengthValid() {
        if(this.strBarcode.length < this.barcodeLength) {
            throw "Barcode length not valid";
        }
    };
    
    prepareBillPattern() {
        for(var i = 0; i < this.strBillPattern.length; i++) {
            this.objBillPattern[this.strBillPattern[i]] += this.strBarcode[i];
        }
    };
};

module.exports = FormatBase;
class BillFormat {
    static barcodeLength = 47;
    strBarcode = "";

    constructor(strBarcode) {
        this.strBarcode = strBarcode;
    };

    getText(){
        return "billFormat";
    };
};

module.exports = BillFormat;
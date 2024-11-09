package de.unistuttgart.t2.modulith.ui.domain;

/**
 * Definition of the JSP model attribute 'details'.
 * It is used to complete an order.
 *
 * @author maumau
 */
public class PaymentDetails {

    private String cardNumber;
    private String cardOwner;
    private String checksum;

    
    // Coursework Exercise 1.B. -> Add properties to Payment Details
    private String cardType;
    private String cardExpiry;
    private String cardOwnerLastname;
    private String cardOwnerAddress;

    public PaymentDetails() {
    }

    public PaymentDetails(String cardNumber, String cardOwner, String checksum, String cardType, String cardExpiry, String cardOwnerLastname, String cardOwnerAddress) {
        this.cardNumber = cardNumber;
        this.cardOwner = cardOwner;
        this.checksum = checksum;

        // Exercise 1.B. -> Add properties to Payment Details -> Constructor
        this.cardType = cardType;
        this.cardExpiry = cardExpiry;
        this.cardOwnerLastname = cardOwnerLastname;
        this.cardOwnerAddress = cardOwnerAddress;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardOwner() {
        return cardOwner;
    }

    public void setCardOwner(String cardOwner) {
        this.cardOwner = cardOwner;
    }

    public String getChecksum() {
        return checksum;
    }

    public void setChecksum(String checksum) {
        this.checksum = checksum;
    }

    // Exercise 1.B -> Setters and getters for new properties
    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getCardExpiry() {
        return cardExpiry;
    }

    public void setCardExpiry(String cardExpiry) {
        this.cardExpiry = cardExpiry;
    }

    public String getCardOwnerLastname() {
        return cardOwnerLastname;
    }

    public void setCardOwnerLastname(String cardOwnerLastname) {
        this.cardOwnerLastname = cardOwnerLastname;
    }

    public String getCardOwnerAddress() {
        return cardOwnerAddress;
    }

    public void setCardOwnerAddress(String cardOwnerAddress) {
        this.cardOwnerAddress = cardOwnerAddress;
    }

    // Exercise 1.B. -> toString() method
    @Override
    public String toString() {
        return "PaymentDetails [cardNumber=" + cardNumber + ", cardOwner=" + cardOwner + ", checksum=" + checksum + ", cardType=" + cardType + ", cardExpiry=" + cardExpiry + ", cardOwnerLastname=" + cardOwnerLastname + ", cardOwnerAddress=" + cardOwnerAddress + "]";
    }
}

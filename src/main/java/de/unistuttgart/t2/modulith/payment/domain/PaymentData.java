package de.unistuttgart.t2.modulith.payment.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * All information that must be sent to the payment provider. This includes information about the credit cart and the
 * total amount of money to be paid.
 *
 * @author maumau
 */
public class PaymentData {

    @JsonProperty("cardNumber")
    private String cardNumber;
    @JsonProperty("cardOwner")
    private String cardOwner;
    @JsonProperty("checksum")
    private String checksum;
    @JsonProperty("total")
    private double total;

    // Coursework Exercise 1.B. -> Add properties to Payment Data
    @JsonProperty("cardType")
    private String cardType;

    @JsonProperty("cardExpiry")
    private String cardExpiry;

    @JsonProperty("cardOwnerLastname")
    private String cardOwnerLastname;

    @JsonProperty("cardOwnerAddress")
    private String cardOwnerAddress;

    public PaymentData() {
    }

    @JsonCreator
    public PaymentData(String cardNumber, String cardOwner, String checksum, double total, String cardType, String cardExpiry, String cardOwnerLastname, String cardOwnerAddress) {
        this.cardNumber = cardNumber;
        this.cardOwner = cardOwner;
        this.checksum = checksum;
        this.total = total;

        // Exercise 1.B. -> Add properties to Payment Data -> Constructor
        this.cardType = cardType;
        this.cardExpiry = cardExpiry;
        this.cardOwnerLastname = cardOwnerLastname;
        this.cardOwnerAddress = cardOwnerAddress;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public String getCardOwner() {
        return cardOwner;
    }

    public String getChecksum() {
        return checksum;
    }

    // Exercise 1.B. -> Add properties to Payment Data -> Getters
    public String getCardType() {
        return cardType;
    }

    public String getCardExpiry() {
        return cardExpiry;
    }

    public String getCardOwnerLastname() {
        return cardOwnerLastname;
    }

    public String getCardOwnerAddress() {
        return cardOwnerAddress;
    }
}

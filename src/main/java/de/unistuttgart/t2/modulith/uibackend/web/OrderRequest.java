package de.unistuttgart.t2.modulith.uibackend.web;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Request to order all Items in a users cart.
 * <p>
 * Holds the payment information and the sessionId to identify the user's cart. The products to be ordered will be
 * retrieved from the cart module, and the sessionId is in that session object that is always there.
 *
 * @author maumau
 */
public final class OrderRequest {

    @JsonProperty("cardNumber")
    private String cardNumber;
    @JsonProperty("cardOwner")
    private String cardOwner;
    @JsonProperty("checksum")
    private String checksum;
    @JsonProperty("sessionId")
    private String sessionId;

    // Coursework Exercise 1.B. -> Add properties to Order Request
    @JsonProperty("cardType")
    private String cardType;

    @JsonProperty("cardExpiry")
    private String cardExpiry;

    @JsonProperty("cardOwnerLastname")
    private String cardOwnerLastname;

    @JsonProperty("cardOwnerAddress")
    private String cardOwnerAddress;

    // Default no-argument constructor
    public OrderRequest() {
    }

    public OrderRequest(String cardNumber, String cardOwner, String checksum, String sessionId, String cardType, String cardExpiry, String cardOwnerLastname, String cardOwnerAddress) {
        this.cardNumber = cardNumber;
        this.cardOwner = cardOwner;
        this.checksum = checksum;
        this.sessionId = sessionId;

        // Exercise 1.B. -> Add properties to Order Request -> Constructor
        this.cardType = cardType;
        this.cardExpiry = cardExpiry;
        this.cardOwnerLastname = cardOwnerLastname;
        this.cardOwnerAddress = cardOwnerAddress;
    }

    @JsonAnySetter
    public void update(String cardNumber, String cardOwner, String checksum, String sessionId, String cardType, String cardExpiry, String cardOwnerLastname, String cardOwnerAddress) {
        this.cardNumber = cardNumber;
        this.cardOwner = cardOwner;
        this.checksum = checksum;
        this.sessionId = sessionId;

        // Exercise 1.B. -> Add properties to Order Request -> Update Request Data
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

    public String getSessionId() {
        return sessionId;
    }

    // Exercise 1.B. -> Add properties to Order Request -> Getter
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

package de.unistuttgart.t2.modulith.payment;

import de.unistuttgart.t2.modulith.payment.domain.PaymentData;
import io.github.resilience4j.retry.Retry;
import io.github.resilience4j.retry.RetryConfig;
import io.github.resilience4j.retry.RetryRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

/**
 * Contacts a payment provider, e.g. some credit institute, to execute the payment.
 *
 * @author maumau
 * @author davidkopp
 */
@Service
public class PaymentService {

    private final boolean enabled;
    private final String providerUrl;
    private final RestTemplate template;
    private final Logger LOG = LoggerFactory.getLogger(getClass());

    // retry stuff
    RetryConfig config = RetryConfig.custom().maxAttempts(2).build();
    RetryRegistry registry = RetryRegistry.of(config);
    Retry retry = registry.retry("paymentRetry");

    @Autowired
    public PaymentService(@Value("${t2.payment.provider.enabled:true}") boolean enabled,
                          @Value("${t2.payment.provider.dummy.url}") String providerUrl,
                          @Value("${t2.payment.provider.timeout:5}") int timeout) {
        this.enabled = enabled;
        this.providerUrl = providerUrl;

        RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder();
        this.template = restTemplateBuilder.setConnectTimeout(Duration.ofSeconds(timeout))
            .setReadTimeout(Duration.ofSeconds(timeout)).build();
    }

    public PaymentService(String providerUrl, RestTemplate restTemplate) {
        this.enabled = true;
        this.providerUrl = providerUrl;
        this.template = restTemplate;
    }

    /**
     * Contact some payment provider to execute the payment. The call might either timeout, or the payment itself might
     * fail, or it is successful.
     */
    
    // Coursework Exercise 1.B. -> Necessary changes to confirm order
    public void doPayment(String cardNumber, String cardOwner, String checksum, double total, String cardType, String cardExpiry, String cardOwnerLastName, String cardOwnerAddress) throws PaymentFailedException {
        if (!enabled) {
            LOG.warn("Connecting to payment provider is disabled by configuration for testing purposes! " +
                "Returning as payment was successful.");
            return;
        }

        try {
            // Coursework Exercise 1.B. -> Necessary changes to confirm order
            PaymentData paymentData = new PaymentData(cardNumber, cardOwner, checksum, total,  cardType, cardExpiry, cardOwnerLastName, cardOwnerAddress);
            Retry.decorateSupplier(retry, () -> template.postForObject(providerUrl, paymentData, Void.class)).get();
        } catch (RestClientException e) {
            LOG.error("Payment failed! Error: {}", e.getMessage());
            throw new PaymentFailedException("Payment failed", e);
        }
    }
}

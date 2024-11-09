package de.unistuttgart.t2.modulith.order;

import de.unistuttgart.t2.modulith.cart.CartService;
import de.unistuttgart.t2.modulith.inventory.InventoryService;
import de.unistuttgart.t2.modulith.order.repository.OrderItem;
import de.unistuttgart.t2.modulith.order.repository.OrderRepository;
import de.unistuttgart.t2.modulith.payment.PaymentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import static de.unistuttgart.t2.modulith.TestData.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
public class OrderServiceTests {

    @Mock
    CartService cartService;

    @Mock
    InventoryService inventoryService;

    @Mock
    PaymentService paymentService;

    @Mock
    OrderRepository orderRepository;

    OrderService orderService;

    @BeforeEach
    public void beforeEach() {
        this.orderService = new OrderService(cartService, inventoryService, paymentService, orderRepository);
    }

    @Test
    public void confirmOrderSucceeds() throws Exception {

        when(cartService.getCart(sessionId)).thenReturn(cartResponse());
        when(inventoryService.getProducts(anyCollection())).thenReturn(inventoryResponseOneProductInList());
        when(orderRepository.save(any())).thenReturn(new OrderItem(sessionId));

        orderService.confirmOrder(sessionId, "cardNumber", "cardOwner", "checksum", "cardType", "cardExpiry", "cardOwnerLastname", "cardOwnerAddress");

        verify(cartService, times(1)).getCart(sessionId);
        verify(paymentService, times(1)).doPayment(anyString(), anyString(), anyString(), anyDouble(), anyString(), anyString(), anyString(), anyString());
        verify(inventoryService, times(1)).commitReservations(sessionId);
        verify(cartService, times(1)).deleteCart(sessionId);
    }
}

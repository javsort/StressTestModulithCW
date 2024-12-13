from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time, json

FRONT_END_URL = "http://localhost:5173"

# Task D. Write a Selenium test that adds two different types of tea to the cart and then checks out.

def performUiTest(
    tea_array: dict,
    think_time: int
):
    # Initialize the WebDriver
    driver = webdriver.Chrome()  # Replace with the path to your ChromeDriver if necessary
    wait = WebDriverWait(driver, 10)

    # Open the application
    driver.get(FRONT_END_URL)  # Replace with your local or deployed URL
    
    try:
        # First close news, pops up automatically on first visit
        news_close_button = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button[data-testid='news-button']")))
        news_close_button.click()

        time.sleep(think_time)

        # Select the teas -> a.2) Select the teas to test with and add them to the cart
        for x in tea_array:
            print(f"Selecting tea '{x['tea_name']}'...")
    
            time.sleep(think_time)
    
            tea_card = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, f"div[data-testid='{x['card_check']}']")))
            driver.execute_script("arguments[0].scrollIntoView();", tea_card)
            tea_card.find_element(By.CSS_SELECTOR, "button").click()

            print(f"Tea '{x['tea_name']}' selected")
            time.sleep(think_time)

            # Add 2 units of the first tea
            quantity_dropdown = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "select[data-testid='product-quantity']")))
            quantity_dropdown.send_keys(x["expected_units"])

            print(f"Quantity set to {x['expected_units']}")

            add_to_cart_button = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button[data-testid='add-to-cart']")))
            add_to_cart_button.click()

            print(f"Added tea '{x}' to cart: {add_to_cart_button}\n")

            # Navigate back to products page
            driver.find_element(By.CSS_SELECTOR, "button[data-testid='continue-shopping']").click()

        # Open cart overlay, and then go to cart
        # First close news, pops up automatically on first visit
        cart_button = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button[data-testid='cart-button']")))
        cart_button.click()

        checkout_button = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button[data-testid='checkout-button']")))
        checkout_button.click()
        
        time.sleep(think_time)

        cart_button = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button[data-testid='cart-button']")))
        cart_button.click()

        # Once in cart, verify cart properties -> b) Verify the cart properties
        for x in tea_array:
            time.sleep(think_time)
            print(f"Looking for tea '{x['tea_name']}' in cart for variable: {x['units_check']}")
            cart_tea_quantity_dropdown = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, f"select[data-testid='{x['units_check']}']")))

            # After getting the dropdown, get the selected value
            cart_tea_quantity = cart_tea_quantity_dropdown.get_attribute("value")

            assert cart_tea_quantity == str(x["expected_units"]), f"Tea '{x['tea_name']}' quantity mismatch in cart. Expected {x['expected_units']}, got {cart_tea_quantity}."
            print(f"Tea '{x['tea_name']}' quantity in cart verified\n")

        print("Successfully verified cart quantities \nPerforming purchase...")

        # Proceed to checkout
        checkout_button = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button[data-testid='proceed-to-checkout']")))
        checkout_button.click()
        time.sleep(think_time)

        # Fill in details for checkout -> c) Fill in the shipping and payment details and place the order

        # Fill in shipping details
        first_name_input = driver.find_element(By.CSS_SELECTOR, "input[data-testid='user-first-name']")
        first_name_input.clear()
        first_name_input.send_keys("Michael")

        last_name_input = driver.find_element(By.CSS_SELECTOR, "input[data-testid='user-last-name']")
        last_name_input.clear()
        last_name_input.send_keys("Scarn")
        
        address_input = driver.find_element(By.CSS_SELECTOR, "input[data-testid='user-address']")
        address_input.clear()
        address_input.send_keys("123 Dundler Mifflin Way")

        print("Shipping details filled in")

        # Fill in payment details
        select_card_dropdown = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, f"select[data-testid='card-type']")))
        select_card_dropdown.send_keys("Visa")

        card_num_input = driver.find_element(By.CSS_SELECTOR, "input[data-testid='card-number']")
        card_num_input.clear()
        card_num_input.send_keys("4111111111111111")

        card_exp_input = driver.find_element(By.CSS_SELECTOR, "input[data-testid='card-expiry-date']")
        card_exp_input.clear()
        card_exp_input.send_keys("05/2027")

        checksum_input = driver.find_element(By.CSS_SELECTOR, "input[data-testid='card-checksum']")
        checksum_input.clear()
        checksum_input.send_keys("123")

        print("Payment details filled in \nPlacing order...")

        # Confirm order
        time.sleep(think_time)
        place_order_button = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "button[data-testid='place-order']")))
        place_order_button.click()

        print("Order placed successfully \nAsserting order success...")

        # Verify order success
        time.sleep(think_time)
        order_confirmation = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "p[data-testid='successful-payment']"))).text
        assert "Thank you for your purchase! You can go back to the shop now." in order_confirmation, "Order confirmation failed"

        print("Order confirmation successful \nTest completed successfully!!!")

    finally:
        # Clean up
        driver.quit()

def main():
    
    # Set up small dictionary to setup test variables -> a.1) Select the teas to test with
    tea_array = [
        {
            "tea_name": "Earl-Grey-(loose)",
            "card_check": "product-card-Earl-Grey-(loose)",
            "units_check": "cart-item-Earl-Grey-(loose)-units",
            "expected_units": 2
        },
        {
            "tea_name": "Darjeeling-(loose)",
            "card_check": "product-card-Darjeeling-(loose)",
            "units_check": "cart-item-Darjeeling-(loose)-units",
            "expected_units": 3
        }
    ]

    think_time = 1

    # Wait for 500ms
    time.sleep(0.5)

    # Print the test variables
    print("Test variables:")
    for x in tea_array:
        print(json.dumps(x, indent=4))

    # Run the test after setting up the variables
    performUiTest(tea_array, think_time)

if __name__ == "__main__":
    main()
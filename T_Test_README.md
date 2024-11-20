
# Coursework 1 - Internet Applications Engineering

## How to run the t-test

> ⚠️ **ATTENTION!**
> The Stress Tests for this project were ran on Gatling 3.12.0. Even though there's a newer version, it is adviced to still not modify the test version to ensure proper functionality.

### Configuration A
To run configuration A, it is sufficient to first:
- Run the script `re_build_n_contain.bat`
- And once the containers are fully running, run `run_t_test.bat` file to begin the test

### Configuration B
To run configuration B, it is sufficient to first:
- Uncomment the `Thread.sleep();` argument at line 111 at [UIBackendService.java](./src/main/java/de/unistuttgart/t2/modulith/uibackend/UIBackendService.java) 
- Re-run the script `re_build_n_contain.bat`
- And once the containers are running again, run the `run_t_test.bat` script in a separate terminal with no extra arguments, predefined values should work for both tests. 

**Consult the secion below to find out what each .bat file is for:**

## .bat files and what they do:
- `re_build_n_contain.bat` :
    - Un-deploy the containers (if existent)
    - Re-build the maven project
    - And finally, re-deploy the containers on docker
    - How to run:
    ```
    ./re_build_n_contain.bat
    ```

- `run_t_test.bat` :
    - Perform a curl request to modulith to /restock the TeaStore
    - Assign arguments for the following values:
        - `itemsAmt`
            - How many items a user will add during the test run
            - Default to: 6 
        - `testLen`
            - Length of the test
            - Default to: 300
        - `usersPerSec`
            - The starting amount of users per sec for ramp up
            - Default to: 1
        - `maxUsersPerSec`
            - The maximum amount of users per sec during ramp up
            - Default to: 25
        - `thinkTime`
            - Think time between scenario ChainBuilders
            - Default to: 2
        - The values for these aspects of the test can be altered at the .bat file, but to reproduce results similar to the ones in the report, these should not be altered. 
    - And then, initialize the test with: 
    ```
    ./run_t_test.bat
    ```

## Classes modified during development for different tasks:
### Exercise 1.B. Extend methods to confirm order:
- Main Classes:
    - [OrderService.java](./src/main/java/de/unistuttgart/t2/modulith/order/OrderService.java)
    - [PaymentService.java](./src/main/java/de/unistuttgart/t2/modulith/payment/PaymentService.java)
    - [PaymentData.java](./src/main/java/de/unistuttgart/t2/modulith/payment/domain/PaymentData.java)
    - [PaymentDetails.java](./src/main/java/de/unistuttgart/t2/modulith/ui/domain/PaymentDetails.java)
    - [UIController.java](./src/main/java/de/unistuttgart/t2/modulith/ui/web/UIController.java)
    - [UIBackendService.java](./src/main/java/de/unistuttgart/t2/modulith/uibackend/UIBackendService.java)
    - [OrderRequest.java](src/main/java/de/unistuttgart/t2/modulith/uibackend/web/OrderRequest.java)
    - [UIBackendController.java](./src/main/java/de/unistuttgart/t2/modulith/uibackend/web/UIBackendController.java)
- Test Classes:
    - [OrderConfirmIntegrationTests.java](./src/test/java/de/unistuttgart/t2/modulith/order/OrderConfirmIntegrationTests.java)
    - [OrderDBTests.java](./src/test/java/de/unistuttgart/t2/modulith/order/OrderDBTests.java)
    - [OrderServiceTests.java](./src/test/java/de/unistuttgart/t2/modulith/order/OrderServiceTests.java)
    - [PaymentRequestTests.java](./src/test/java/de/unistuttgart/t2/modulith/payment/PaymentRequestTests.java)
    - [UIBackendControllerTests.java](./src/test/java/de/unistuttgart/t2/modulith/uibackend/UIBackendControllerTests.java)
    - [UIBackendServiceTests.java](./src/test/java/de/unistuttgart/t2/modulith/uibackend/UIBackendServiceTests.java)

### Exercise 1.D. Load Test Setup:
- Gatling Stress Test class:
    - [StressTestSimu.java](./src/test/java/de/unistuttgart/t2/modulith/gatling_test/StressTestSimu.java)
- Endpoint Added for SessionId:
    - [UiBackEndController.java](./src/main/java/de/unistuttgart/t2/modulith/uibackend/web/UIBackendController.java) - Lines 43 - 48
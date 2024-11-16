package de.unistuttgart.t2.modulith.gatling_test;

//import io.gatling.core.scenario.Simulation;

import io.gatling.javaapi.core.ChainBuilder; 
import io.gatling.javaapi.core.ScenarioBuilder; 
import io.gatling.javaapi.core.Simulation; 
import io.gatling.javaapi.http.HttpProtocolBuilder; 
import static io.gatling.javaapi.core.CoreDsl.*; 
import static io.gatling.javaapi.http.HttpDsl.*;


/*
 * Coursework 1.C. - T2 - Modulith
 * This class is used to simulate the stress test for the application.
 * 
*/
public class StressTestSimu extends Simulation {

    // The time to wait between each action - based on student Id last digit -> 7
    private int thinkTime = 7;

    private int itemsAmt = Integer.parseInt(System.getProperty("itemsAmt", "6"));


    // A. Browse the items
    ChainBuilder browse = exec(
        http("Browse Items")
            .get("/products")
            .check(status().is(200))
            .check(jsonPath("$[0].id").exists().saveAs("randomItemId"))
            .check(header("JSESSIONID").saveAs("sessionId"))
    );

    // B. Add a random item to the cart (CONFIGURABLE by randomItemId)
    /*ChainBuilder addRandomToCart = exec(
        http("Add an amount of random items to Cart")
            .post("/cart/#{randomItemId}")  // Use the extracted value from browse
            .body(StringBody("{ \"id\": \"#{randomItemId}\", \"content\": { \"key\": 1 }, \"creationDate\": \"2024-11-16T00:00:00Z\" }"))
            .asJson()
            .check(status().is(201))
    );*/

    ChainBuilder addRandomToCart = repeat(itemsAmt).on(
        exec(
            http("Add an amount of random items to Cart")
                .post("/cart/#{randomItemId}")  // Use the extracted value from browse
                .body(StringBody("{ \"id\": \"#{randomItemId}\", \"content\": { \"key\": 1 }, \"creationDate\": \"2024-11-16T00:00:00Z\" }"))
                .asJson()
                .check(status().is(201))
        )
    );

    // C. Confirm the cart
    ChainBuilder confirm = exec(
        http("Confirm Cart")
            .post("/confirm")
            .body(StringBody( "{ " +
            "\"cardONumber\": \"1234567890123456\", " +
            "\"cardOwner\": \"John\", " +
            "\"checksum\": \"123\", " +
            "\"sessionId\": \"#{sessionId}\", " +
            "\"cardType\": \"MasterCard\", " +
            "\"cardOwnerLastname\": \"Hernandez\", " +
            "\"cardOwnerAddress\": \"Stuttgart\"" +	
            "}"))
            .asJson()
            .check(status().is(200))
    );

    // ~. Think -> placed somewhere in the middle of the scenario
    ChainBuilder think = exec(pause(java.time.Duration.ofSeconds(thinkTime)));

    HttpProtocolBuilder httpProtocol = http
    .baseUrl("http://localhost:8081")
    .acceptHeader("application/json")
    .contentTypeHeader("application/json")
    .userAgentHeader("Gatling/StressTest")
    .inferHtmlResources();

    ScenarioBuilder stressTest = scenario("Stress Test")
    .exec(browse)
    .exec(think)
    .exec(addRandomToCart)
    .exec(think)
    .exec(confirm);
    
    /*ScenarioBuilder stressTestInOnemethod = scenario("Stress Test II")
    .exec(
        http("Browse Items")
            .get("/products")
            .check(status().is(200))
    )
    .pause(java.time.Duration.ofSeconds(thinkTime))

    .exec(
        http("Add an amount of random items to Cart")
        .post("/cart/add")
        .formParam("id", String.valueOf(randomItemId))
        .check(status().is(200))
    )
    .pause(java.time.Duration.ofSeconds(thinkTime))

    .exec(
        http("Confirm Cart")
            .get("/cart/confirm")
            .check(status().is(200))
    );*/

    {
        setUp(
            stressTest.injectOpen(
                constantUsersPerSec(10).during(60).randomized()
            ).protocols(httpProtocol)
        );
    }
}

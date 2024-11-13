package de.unistuttgart.t2.modulith.gatling_test;

import io.gatling.core.scenario.Simulation;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;

import java.util.concurrent.ThreadLocalRandom;

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;

/*
 * Coursework 1.C. - T2 - Modulith
 * This class is used to simulate the stress test for the application.
 * 
*/
public class StressTestSimu extends Simulation {

    // The time to wait between each action - based on student Id last digit -> 7
    private int thinkTime = 7;

    private int randomLowerBound = 1;
    private int randomUpperBound = 1000;

    private int randomItemId = ThreadLocalRandom.current().nextInt(randomLowerBound, randomUpperBound);

    // A. Browse the items
    ChainBuilder browse = exec(
        http("Browse Items")
            .get("/products"),
            pause(1),
            .check(status().is(200))
    );

    // B. Add a random item to the cart (CONFIGURABLE by randomItemId)
    ChainBuilder addRandomToCart = exec();

    // C. Confirm the cart
    ChainBuilder confirm = exec();

    // ~. Think -> placed somewhere in the middle of the scenario
    ChainBuilder think = exec(pause(thinkTime));

    HttpProtocolBuilder httpProtocol = http.baseUrl("http://localhost:8081");


    ScenarioBuilder stressTest = scenario("Stress Test")
        .exec(browse)
        .exec(think)
        .exec(addRandomToCart)
        .exec(confirm);

    {
        setUp(
            stressTest.inject(constantUsersPerSec(10).during(60))
        ).protocol(httpProtocol);
    }
}

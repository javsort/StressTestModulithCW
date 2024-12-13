# Coursework 2 - Internet Applications Engineering - UI Selenium Test

## Build Modulith and Front-end:
With the docker daemon running, either:
- Run the .bat file `re_build_n_contain.bat`, if on Windows
- Run the .sh file `re_build_n_contain.sh`, if on Linux / Mac

Both scripts perform the following operations:
1. Bring any existing modulith image down
2. Re-install and build the maven project
3. Build the docker image
4. Open a separate terminal to install npm dependencies and run the front-end
    - It is pre-determined to run on the port: `5173`, so be sure to have it open when running the script.
5. Bring-up the docker image just built


> ⚠️ **ATTENTION!**
> If running on linux, remember to grant permissions to the script before running it with: `chmod +x re_build_n_contain.sh` so the script is runnable.

## How to Run the Selenium Test
Before running the Selenium test, please verify you've installed it in your Python distribution through `pip`
It can be installed as long as you have Python in Environment Variables and pip installed with it with the following command:

```sh
pip install selenium
```

Once both the front-end and back-end are running properly, and you've ensured selenium is installed, run the following command with a terminal open under [**`'./src/test/selenium_test/'`**](./src/test/selenium_test/):
```sh
python -m front_end_test
```

> ⚠️ **ATTENTION!**
> Depending on your python distribution, the command to run python scripts might be different, so also consider this before running the script

## Test data:
The test will aim to satisfy the proper purchase of the following Tea Objects with their respective amounts:
```JSON
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
```
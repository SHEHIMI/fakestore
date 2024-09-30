# Read the csv file and calculate the probability of beating the boss from the given params
# Reference: https://www.geeksforgeeks.org/python-read-csv-using-pandas-read_csv/
import pandas as pd


# Function to calculate the probability of beating the boss using the dataset from a CSV file
def probability_to_beat_boss(card_suit, animal, fruit, csv):
    data = pd.read_csv(csv)
    # Filter the dataset based on the player's characteristics
    filtered_data = data[
        (data["Card Suit"] == card_suit)
        & (data["Animal Name"] == animal)
        & (data["Fruit"] == fruit)
    ]

    # Calculate the overall success rate if no match found in dataset
    if len(filtered_data) == 0:
        overall_success_rate = data["Result"].mean() * 100
        return overall_success_rate

    # Calculate the average percentage of true results in filtered dataset from the csv
    success_rate = filtered_data["Result"].mean() * 100
    return success_rate


if __name__ == "__main__":
    # Inputs
    card_suit = "Apple"
    animal = "Lion"
    fruit = "Mango"

    # Path to the CSV file on machine
    csv_file = "C:\\Users\\User\\Downloads\\prediction.csv"

    # Probability with given params
    probability = probability_to_beat_boss(card_suit, animal, fruit, csv_file)
    print(f"{probability:.2f}%")

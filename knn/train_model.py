import pymongo
from collections import defaultdict

import numpy as np
import random
import pandas as pd
from sklearn.model_selection import train_test_split

from sklearn.preprocessing import OneHotEncoder

from sklearn.neighbors import KNeighborsClassifier

import pickle

def get_attributes_options() -> dict:
    '''Read in MongoDB data to determine the possible values for each attribute.

    Arguments:
        None.

    Returns:
        attributes_options (dict): Maps attribute names to the list-cast set of possible values.
    '''
    # Connect to MongoDB and get a list of product objects.
    client = pymongo.MongoClient('mongodb://localhost:27017')
    capstone_crusaders_db = client['capstone-crusaders']
    products_collection = capstone_crusaders_db['products']
    products = products_collection.find().to_list()

    # Create a set of possible values for each attribute.
    attributes_options = defaultdict(set)
    for product in products:
        for attribute in product:

            if attribute == '_id':
                continue

            attributes_options[attribute].add(product[attribute])

    # Convert the sets into lists and return the total dict.
    return {attribute: list(attributes_options[attribute]) for attribute in attributes_options}

def create_data(
        attributes_options: dict
        ) -> tuple:
    '''Fabricate data to classify by category and productName.

    Arguments:
        attributes_options (dict): Map of attribute names to the list of possible values.

    Returns:
        X (pd.DataFrame): X training data.
        y (np.ndarray): y training data.
    '''
    # This will keep track of categories.
    category_number = 0

    # Save the data as numpy arrays.
    X = {attribute: np.array([]) for attribute in attributes_options}
    y = np.array([])

    # Create a new category for every (category, productName) pair. Everything else will be random.
    for category in attributes_options['category']:
        for productName in attributes_options['productName']:

            for _ in range(100):

                X['category'] = np.append(X['category'], [category])
                X['productName'] = np.append(X['productName'], [productName])

                X['size'] = np.append(X['size'], [random.choice(attributes_options['size'])])
                X['color'] = np.append(X['color'], [random.choice(attributes_options['color'])])
                X['price'] = np.append(X['price'], [random.choice(attributes_options['price'])])

                y = np.append(y, category_number)

            # Create a new category for the next (category, productName) pair.
            category_number += 1

    return pd.DataFrame(X), y

def transform_data(
        X: pd.DataFrame,
        ) -> tuple:
    '''Transform the categorical X data.

    Arguments:
        X (pd.DataFrame): Training X data.

    Returns:
        X_encoded (pd.DataFrame): Encoded training X data.
    '''
    enc = OneHotEncoder()
    X_encoded = enc.fit_transform(X_train)

    return X_encoded

if __name__ == '__main__':

    attributes_options = get_attributes_options()

    X_train, y_train = create_data(attributes_options)

    X_train_encoded = transform_data(X_train)

    model = KNeighborsClassifier()
    model.fit(X_train_encoded, y_train)

    with open(f'model.pkl', 'wb') as f:
        pickle.dump(model, f)
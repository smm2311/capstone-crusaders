import pymongo
from collections import defaultdict

import numpy as np
import random
import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.metrics import accuracy_score

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
            attributes_options[attribute].add(product[attribute])

    return {attribute: list(attributes_options[attribute]) for attribute in attributes_options}

def create_data(
        attributes_options: dict
        ) -> tuple:
    '''Fabricate data to classify by category and productName.

    Arguments:
        attributes_options (dict): Map of attribute names to the list of possible values.

    Returns:
        X_train_encoded:
        X_test_encoded:
        y_train_encoded:
        y_test_encoded:
    '''
    category_number = 0

    X = {attribute: np.array([]) for attribute in attributes_options}
    y = np.array([])

    for category in attributes_options['category']:
        for productName in attributes_options['productName']:

            for _ in range(100):

                X['category'] = np.append(X['category'], [category])
                X['productName'] = np.append(X['productName'], [productName])

                X['size'] = np.append(X['size'], [random.choice(attributes_options['size'])])
                X['color'] = np.append(X['color'], [random.choice(attributes_options['color'])])
                X['_id'] = np.append(X['_id'], [random.choice(attributes_options['_id'])])
                X['price'] = np.append(X['price'], [random.choice(attributes_options['price'])])

                y = np.append(y, category_number)

            category_number += 1

if __name__ == '__main__':

    attributes_options = get_attributes_options()
    X_train, X_test, y_train, y_test = create_data(attributes_options)
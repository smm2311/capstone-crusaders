from flask import Flask, jsonify
import pymongo
from bson.objectid import ObjectId
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
import pickle
import numpy as np
import random

app = Flask(__name__)

def serialize_doc(doc):
    doc['_id'] = str(doc['_id'])
    return doc

@app.route('/recommend/<product_id>', methods=["GET"])
def recommend(product_id):

    # Connect to the local MongoDB capstone-crusaders/products collection.
    client = pymongo.MongoClient('mongodb://localhost:27017')
    capstone_crusaders_db = client['capstone-crusaders']
    products_collection = capstone_crusaders_db['products']

    # Get a list of all products and convert it to a dataframe.
    products = pd.DataFrame(products_collection.find().to_list())
    client.close()

    # Get a copy of the IDs.
    ids = products['_id']

    # Get rid of the IDs from the data that will be put into the model.
    X = products.drop(['_id'], axis=1)

    # Encode the data.
    enc = OneHotEncoder()
    products_encoded = enc.fit_transform(X)

    # Load in the KNN model.
    with open('..\\knn\\model.pkl', 'rb') as f:
        model = pickle.load(f)

    # Classify each product.
    categories = model.predict(products_encoded)

    # Find out which category corresponds to the passed object id.
    recommended_category = categories[ids[ids == ObjectId(product_id)].index[0]]

    # Determine which indexes in the DFs correspond to the recommended category.
    recommended_category_indexes = np.where(categories == recommended_category)[0].tolist()

    recommended_product_indexes = set()
    while len(recommended_product_indexes) < 3:
        recommended_product_indexes.add(random.choice(recommended_category_indexes))

    recommended_products = [serialize_doc(products.iloc[i].to_dict()) for i in recommended_product_indexes]

    return jsonify(recommended_products)

if __name__ == '__main__':
    app.run(debug=True)
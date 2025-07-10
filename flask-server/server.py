from flask import Flask
import pymongo
from bson.objectid import ObjectId
import pandas as pd

app = Flask(__name__)

@app.route('/recommend/<product_id>', methods=["GET"])
def recommend(product_id):

    # Get the product's info from mongoDB.
    client = pymongo.MongoClient('mongodb://localhost:27017')
    capstone_crusaders_db = client['capstone-crusaders']
    prodcuts_collection = capstone_crusaders_db['products']

    product_raw = prodcuts_collection.find_one({'_id': ObjectId(product_id)})

    client.close()

    product = {key: [product_raw[key]] for key in product_raw}

    product_df = pd.DataFrame(product)
    print(product)
    print(product_df)

    # Read in the trained KNN model.

    # Run the KNN model on the product's info.

    return [{}]

if __name__ == '__main__':
    app.run(debug=True)
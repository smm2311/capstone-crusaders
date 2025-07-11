from flask import Flask
import pymongo
from bson.objectid import ObjectId
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
import pickle

app = Flask(__name__)

@app.route('/recommend/<product_id>', methods=["GET"])
def recommend(product_id):

    # Get the product's info from mongoDB.
    client = pymongo.MongoClient('mongodb://localhost:27017')
    capstone_crusaders_db = client['capstone-crusaders']
    products_collection = capstone_crusaders_db['products']

    products = products_collection.find().to_list()

    products_df = pd.DataFrame(products)

    ids = products_df['_id']

    products_clean = products_df.drop(['_id', 'price'], axis=1)

    preprocessor = ColumnTransformer(
        transformers=[
            ('onehot', OneHotEncoder(), ['category', 'productName', 'color', 'size'])
        ],
        remainder='passthrough'
    )

    products_encoded = preprocessor.fit_transform(products_clean)

    with open('..\\knn\\category_model.pkl', 'rb') as f:
        model = pickle.load(f)

    print(products_df)
    print(model.predict(products_encoded))
    # print(products_encoded)

    # product_raw = products_collection.find_one({'_id': ObjectId(product_id)})

    client.close()

    return [{}]

if __name__ == '__main__':
    app.run(debug=True)
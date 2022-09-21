
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.models import Model
import numpy as np
from PIL import Image
import tensorflow as tf
from pathlib import Path
from tempfile import NamedTemporaryFile
import csv
import os

gpus = tf.config.experimental.list_physical_devices('GPU')
for gpu in gpus:
  tf.config.experimental.set_memory_growth(gpu, True)


class FeatureExtractor:
    def __init__(self):
        # Use VGG-16 as the architecture and ImageNet for the weight
        base_model = VGG16(weights='imagenet')
        # Customize the model to return features from fully-connected layer
        self.model = Model(inputs=base_model.input, outputs=base_model.get_layer('fc1').output)
    
    def extract(self, img):
        # Resize the image
        img = img.resize((224, 224))
        # Convert the image color space
        img = img.convert('RGB')
        # Reformat the image
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)
     
        # Extract Features
        feature = self.model.predict(x)[0]
        return feature 



arr = []
arr2 =[]
for x in range(1,20):
    img=Image.open('../outputali/' +str(x)+'.jpg')
    im=FeatureExtractor().extract(img)
    arr.append(im)
    # print(arr[0])
    for m in range(1,60):
        # if(x>=1):
        img2=Image.open('../outputamz/' +str(m)+'.jpg')
        im2=FeatureExtractor().extract(img2)
        arr2.append(im2)

        z=arr[x-1]
        y=arr2[m-1]
        # def eucledian_distance(x,y):
        eucl_dist = np.linalg.norm(z - y)

        


        # filepath = Path('../output/amazon.csv')  # CSV file to update.

        # with open(filepath, 'r', newline='') as csv_file, \
        #     NamedTemporaryFile('w', newline='', dir=filepath.parent, delete=False) as tmp_file:

        #     reader = csv.reader(csv_file)
        #     writer = csv.writer(tmp_file)

        #     # Replace value in the first column of the first 5 rows.
        #     for data_value in range(1, 20):
        #         row = next(reader)
        #         row[2] = data_value
        #         writer.writerow(row)

        #     writer.writerows(reader)  # Copy remaining rows of original file.

        # # Replace original file with updated version.
        # os.replace(tmp_file.name, filepath)
        
        print("----- EUCL DIST -----")
        print(str(x)+".jpg"+ "  "+ str(m)+".jpg")
        print(eucl_dist)
        print("----- EUCL DIST -----")
        # return eucl_dist

# def append(fname, data):
#     with open(fname) as f:
#         reader = csv.reader(f)
#         data = list(reader) + list(data)
#     with open(fname, 'w') as f:
#         writer = csv.writer(f)
#         writer.writerows(data)
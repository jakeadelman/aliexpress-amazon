
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
import sys
import pymysql
import matplotlib.image as mpimg
import json

db = pymysql.connect(
    host = "localhost",
    user = "root",
    passwd = "password",
    database = "imagesDB"
)

print(db)
cursor = db.cursor()

gpus = tf.config.list_physical_devices('GPU')
if gpus:
  # Restrict TensorFlow to only allocate 1GB of memory on the first GPU
  try:
    tf.config.set_logical_device_configuration(
        gpus[0],
        [tf.config.LogicalDeviceConfiguration(memory_limit=14324)])
    logical_gpus = tf.config.list_logical_devices('GPU')
    print(len(gpus), "Physical GPUs,", len(logical_gpus), "Logical GPUs")
  except RuntimeError as e:
    # Virtual devices must be set before GPUs have been initialized
    print(e)

ali = {}
amz={}
num = 0
for line in sys.stdin:
    if num==0:
        amz = json.loads(line.rstrip())
    else:
        ali = json.loads(line.rstrip())    
    num+=1
 
print("Done")


print("HERE")
with tf.device('GPU:0'):
    class FeatureExtractor:
        def __init__(self):
            # Use VGG-16 as the architecture and ImageNet for the weight
            base_model = VGG16(weights='imagenet')
            # Customize the model to return features from fully-connected layer
            self.model = Model(inputs=base_model.input,
                            outputs=base_model.get_layer('fc1').output)

        def extract(self, img):
            # Resize the image
            img = img.resize((224, 224))
            # img = np.resize(img, 224*224)
            # Convert the image color space
            img = img.convert('RGB')
            # Reformat the image
            x = image.img_to_array(img)
            x = np.expand_dims(x, axis=0)
            x = preprocess_input(x)

            # Extract Features
            feature = self.model.predict(x)[0]
            return feature

    # print(sys.argv)
    # ali = json.loads(sys.argv[6])
    # amz = json.loads(sys.argv[7])
    arr = []
    arr2 = []
    # base_id = int(sys.argv[1])
    for x in range(0,int(sys.argv[4])):
        print("HERE2")
        path_ali = './outputali/' +sys.argv[5]+ str(x)+'.jpg'
        # img = Image.open('./outputali/' +sys.argv[5]+ str(x)+'.jpg')
        img = Image.open(path_ali)
        im = FeatureExtractor().extract(img)
        print("HERE4")
        arr.append(im)
        # print(arr[0])
        for m in range(0, int(sys.argv[3])):
            # if(x>=1):
            path_amz = './outputamz/' + sys.argv[5]+str(m)+'.jpg'
            img2 = Image.open(path_amz)
            im2 = FeatureExtractor().extract(img2)
            arr2.append(im2)

            z = arr[x-1]
            y = arr2[m-1]
            # def eucledian_distance(x,y):
            eucl_dist = np.linalg.norm(z - y)
          
            print("HERE3")
            print("----- EUCL DIST -----")
            print(path_ali + "  " + path_amz)
            
            print(eucl_dist)
            cursor.execute('INSERT INTO imgs (ali_img_link,amz_img_link,eucl_dist) values (%s,%s,%s)',(ali[x].image.imgUrl, amz[m].thumbnail, int(eucl_dist)))
            # cursor.execute('UPDATE imgs SET eucl_dist = %s WHERE id = %s;',(int(eucl_dist), base_id))
            print(cursor._executed)
            db.commit()
            print("----- EUCL DIST -----")
            # return eucl_dist

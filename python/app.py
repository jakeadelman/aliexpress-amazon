

# config = tf.ConfigProto()
# config.gpu_options.allow_growth = True
# session = tf.Session(config=config)
# os.environ['TF_FORCE_GPU_ALLOW_GROWTH'] = 'true'
    # Read images (of size 255 x 255) from file.
# im1 = tf.image.decode_image(tf.io.read_file('../outputali/0.png'))
# im2 = tf.image.decode_image(tf.io.read_file('../outputamz/0.png'))
    # tf.shape(im1)  # `img1.png` has 3 channels; shape is `(255, 255, 3)`
    # tf.shape(im2)  # `img2.png` has 3 channels; shape is `(255, 255, 3)`
    # # Add an outer batch for each image.
    # im1 = tf.expand_dims(im1, axis=0)
    # im2 = tf.expand_dims(im2, axis=0)
    # # Compute SSIM over tf.uint8 Tensors.
    # ssim1 = tf.image.ssim(im1, im2, max_val=255, filter_size=11,
    #                         filter_sigma=1.5, k1=0.01, k2=0.03)

    # # Compute SSIM over tf.float32 Tensors.
    # im1 = tf.image.convert_image_dtype(im1, tf.float32)
    # im2 = tf.image.convert_image_dtype(im2, tf.float32)
    # ssim2 = tf.image.ssim(im1, im2, max_val=1.0, filter_size=11,
    #                         filter_sigma=1.5, k1=0.01, k2=0.03)
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import VGG16, preprocess_input
from tensorflow.keras.models import Model
import numpy as np
from PIL import Image


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

arr =[]
for x in range(1,60):
    img=Image.open('../outputali/' +str(x)+'.jpg')
    im=FeatureExtractor().extract(img)
    arr.append(im)
    print(arr[0])
    if(x==2):
        z=arr[x-1]
        y=arr[x]
        # def eucledian_distance(x,y):
        eucl_dist = np.linalg.norm(z - y)
        print(eucl_dist)
        # return eucl_dist
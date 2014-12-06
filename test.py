#!/usr/bin/python

import sys
from flask import jsonify 
import json
import numpy as np
import pickle
from sklearn import neighbors, datasets
import sys, thread, time, random



def CenterData(X):
    allXCoordinates = X[0,::3]
    meanValue = allXCoordinates.mean()
    X[0,::3] = allXCoordinates - meanValue

    allYCoordinates = X[0,1::3]
    meanValue = allYCoordinates.mean()
    X[0,1::3] = allYCoordinates - meanValue

    allZCoordinates = X[0,2::3]
    meanValue = allZCoordinates.mean()
    X[0,2::3] = allZCoordinates - meanValue
    return X
 
clf = pickle.load( open("userData/classifier.p", "rb") ) # Load data from saved classifier
testData = np.zeros((1,30),dtype='f')

testData = sys.args[1].split(',')

for i in range(0,30):
    testData[0,i] = float(a[i]);

testData = CenterData(testData)

predictedClass = clf.predict( testData ) # Finds the predicted sign language number    

num = int(predictedClass[0])
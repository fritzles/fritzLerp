#!/usr/bin/python

import sys
from flask import jsonify 
import json
import numpy

# for arg in sys.argv:
# 	print arg
 
json_input = json.load(sys.argv[1])
print json_input

# numpy.array(list(map(float,json('fingers').split())))
 
try:
    decoded = json.loads(json_input)
 
    # pretty printing of json-formatted string
    print json.dumps(decoded, sort_keys=True, indent=4)
 
    print "JSON parsing example: ", decoded
    print "Complex JSON parsing example: ", decoded


    # return jsonify()
 
except (ValueError, KeyError, TypeError):
    print "JSON format error"



print 'Number of arguments:', len(sys.argv), 'arguments.'
print 'Argument List:', str(sys.argv)



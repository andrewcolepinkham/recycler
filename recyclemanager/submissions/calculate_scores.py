#########################################################
# Holds value and weights for types of recycling 
# value: represents the value of each 1 unit of recycling 
# amount:_weighted is a value that can be used as a 
#           multiplying to the amount donated to weigh 
#                       it as needed 
#########################################################

POINTS = { 
    "Mixed Recycling" : {
        "value" : 5, 
        "amount_weighted" : 1, 
    
    } , 
    "Aluminium Cans" : {
        "value" : 4, 
        "amount_weighted" : 1
    } , 
    "Sorted Recycling" : {
        "value" : 3, 
        "amount_weighted" : 1
    } , 
}
# UNITS TO DIVIDE BY 
UNITS ={
    "Number of Objects" : 2, 
    "Weight(lbs)": 1, 
    "Money" : 1,
    "":1,
    
}

#########################################################
# FUNCTION TO CALCULATE NUMBER OF POINTS
# takes in: 
#       type-- string representation of type of drop off 
#       amount -- integer representing amount donated 
# returns: integer value representing the amount of points 
#            OR returns an error reporting the type is not 
#                                       reconginzed 
##########################################################
def score_calculator(type, amount, unit): 

    try: 
       return POINTS[type]['value'] * (( amount * POINTS[type]['amount_weighted'])/UNITS[unit]) 
    except: 
       print(("%s is not a reconginzed type of recycling or %s is not a reconginzed type of unit" % (type, unit) ))
       return ("%s is not a reconginzed type of recycling or %s is not a reconginzed type of unit" % (type, unit) )

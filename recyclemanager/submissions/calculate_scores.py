POINTS = { 
    "Mixed Recycling" : {
        "value" : 5, 
        "amount_weighted" : 1
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

#########################################################
# FUNCTION TO CALCULATE NUMBER OF POINTS
# takes in: 
#       type-- string representation of type of drop off 
#       amount -- integer representing amount donated 
# returns: integer value representing the amount of points 
##########################################################
def score_calculator(type, amount=0): 

    try: 
       
       return POINTS[type]['value'] * ( amount * POINTS[type]['amount_weighted'])
    except: 
       return print("%s is not a reconginzed type of recycling")

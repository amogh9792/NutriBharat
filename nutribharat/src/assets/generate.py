import json, random

# -------------------------
# Base Food Categories
# -------------------------
categories = {
    "Staples": [
        ("Roti","piece",1,"Veg"),("Paratha","piece",1,"Veg"),("Idli","piece",1,"Veg"),
        ("Dosa","piece",1,"Veg"),("Rice","g",100,"Vegan"),("Biryani","g",100,"Non-Veg"),
        ("Khichdi","g",100,"Veg"),("Upma","g",100,"Veg"),("Poha","g",100,"Vegan"),
        ("Pav Bhaji","g",100,"Veg"),("Thepla","piece",1,"Veg"),("Poori","piece",1,"Veg"),
        ("Dal Tadka","g",100,"Veg"),("Rajma","g",100,"Veg"),("Chole","g",100,"Veg"),
        ("Sambhar","g",100,"Veg"),("Kadhi","g",100,"Veg")
    ],
    "Proteins": [
        ("Paneer","g",100,"Veg"),("Tofu","g",100,"Vegan"),("Soya Chunks","g",100,"Vegan"),
        ("Egg","piece",1,"Eggetarian"),("Chicken Curry","g",100,"Non-Veg"),
        ("Chicken Grilled","g",100,"Non-Veg"),("Fish Curry","g",100,"Non-Veg"),
        ("Mutton Curry","g",100,"Non-Veg"),("Prawns Masala","g",100,"Non-Veg"),
        ("Dal Makhani","g",100,"Veg"),("Sprouts","g",100,"Vegan")
    ],
    "Dairy": [
        ("Milk (Full Cream)","ml",100,"Veg"),("Milk (Skimmed)","ml",100,"Veg"),
        ("Curd","g",100,"Veg"),("Butter","g",10,"Veg"),("Cheese","g",20,"Veg"),
        ("Ghee","g",10,"Veg"),("Buttermilk","ml",200,"Veg"),("Paneer Bhurji","g",100,"Veg")
    ],
    "Fruits": [
        ("Apple","piece",1,"Vegan"),("Banana","piece",1,"Vegan"),("Mango","piece",1,"Vegan"),
        ("Orange","piece",1,"Vegan"),("Papaya","g",100,"Vegan"),("Grapes","g",100,"Vegan"),
        ("Watermelon","g",100,"Vegan"),("Pineapple","g",100,"Vegan"),
        ("Guava","piece",1,"Vegan"),("Strawberry","g",100,"Vegan"),("Kiwi","piece",1,"Vegan"),
        ("Pear","piece",1,"Vegan"),("Peach","piece",1,"Vegan"),("Dates","g",50,"Vegan")
    ],
    "Vegetables": [
        ("Potato","g",100,"Vegan"),("Sweet Potato","g",100,"Vegan"),
        ("Onion","g",100,"Vegan"),("Tomato","g",100,"Vegan"),
        ("Spinach","g",100,"Vegan"),("Broccoli","g",100,"Vegan"),
        ("Cauliflower","g",100,"Vegan"),("Carrot","g",100,"Vegan"),
        ("Beetroot","g",100,"Vegan"),("Cabbage","g",100,"Vegan"),
        ("Okra","g",100,"Vegan"),("Capsicum","g",100,"Vegan"),
        ("Brinjal","g",100,"Vegan"),("Methi","g",100,"Vegan"),("Cucumber","g",100,"Vegan")
    ],
    "Nuts & Seeds": [
        ("Almonds","g",30,"Vegan"),("Cashews","g",30,"Vegan"),
        ("Walnuts","g",30,"Vegan"),("Pistachios","g",30,"Vegan"),
        ("Peanuts","g",30,"Vegan"),("Chia Seeds","g",30,"Vegan"),
        ("Flax Seeds","g",30,"Vegan"),("Sunflower Seeds","g",30,"Vegan"),
        ("Sesame Seeds","g",30,"Vegan")
    ],
    "Beverages": [
        ("Tea","ml",100,"Veg"),("Coffee","ml",100,"Veg"),
        ("Green Tea","ml",100,"Veg"),("Juice (Orange)","ml",200,"Vegan"),
        ("Juice (Apple)","ml",200,"Vegan"),("Smoothie (Banana)","ml",200,"Veg"),
        ("Lassi","ml",200,"Veg"),("Coconut Water","ml",200,"Vegan"),
        ("Milkshake","ml",200,"Veg"),("Cold Drink","ml",200,"Vegan")
    ],
    "Global": [
        ("Pizza","g",100,"Non-Veg"),("Burger","g",100,"Non-Veg"),
        ("Pasta","g",100,"Veg"),("Sandwich","piece",1,"Veg"),
        ("Shawarma","g",100,"Non-Veg"),("Falafel","piece",1,"Vegan"),
        ("Tacos","piece",1,"Non-Veg"),("Sushi","piece",1,"Non-Veg"),
        ("French Fries","g",100,"Vegan"),("Noodles","g",100,"Veg")
    ]
}

regions = ["North","South","West","East","Coastal","Global"]
variations = [""," (Fried)"," (Grilled)"," (Boiled)"," (Steamed)"," (Roasted)"," (Spicy)"," (Plain)"]

# -------------------------
# Nutrient ranges by category
# -------------------------
def nutrient_ranges(category):
    if category=="Staples": return (70,300,2,6,10,60,1,10)
    if category=="Proteins": return (100,400,7,30,0,15,1,20)
    if category=="Dairy": return (40,400,2,10,0,12,1,40)
    if category=="Fruits": return (30,120,0,2,5,30,0,1)
    if category=="Vegetables": return (20,80,1,5,2,15,0,1)
    if category=="Nuts & Seeds": return (150,700,10,30,5,30,20,60)
    if category=="Beverages": return (5,250,0,8,0,30,0,5)
    if category=="Global": return (150,600,5,20,10,70,5,25)
    return (100,300,2,10,10,40,1,10)

# -------------------------
# Generate foods
# -------------------------
foods=[]; seen=set(); food_id=1
target_records=2000

while len(foods)<target_records:
    before=len(foods)
    for category,items in categories.items():
        for (name,unit,base_qty,dietType) in items:
            if len(foods)>=target_records: break
            variation=random.choice(variations)
            food_name=name+variation
            if food_name in seen: continue
            seen.add(food_name)

            cal_min,cal_max,p_min,p_max,c_min,c_max,f_min,f_max=nutrient_ranges(category)

            food={
                "id":food_id,
                "name":food_name,
                "region":random.choice(regions),
                "veg": False if dietType in ["Non-Veg","Eggetarian"] else True,
                "dietType":dietType,
                "baseQuantity":base_qty,
                "unit":unit,
                "calories":random.randint(cal_min,cal_max),
                "protein":round(random.uniform(p_min,p_max),1),
                "carbs":round(random.uniform(c_min,c_max),1),
                "fat":round(random.uniform(f_min,f_max),1)
            }
            foods.append(food); food_id+=1
    # break if no new foods were added → prevents infinite loop
    if len(foods)==before:
        break

# -------------------------
# Save JSON
# -------------------------
with open("foods.json","w",encoding="utf-8") as f:
    json.dump(foods,f,indent=2,ensure_ascii=False)

print(f"✅ foods.json with {len(foods)} unique realistic records created")

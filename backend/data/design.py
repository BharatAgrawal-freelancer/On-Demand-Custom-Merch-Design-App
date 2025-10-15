import json
import random
from faker import Faker
from bson.objectid import ObjectId

fake = Faker()

NUM_DESIGNS = 50  # number of fake designs to generate

# pre-generate owner IDs
BASE_USER_OID = int("68e8dc22f2e09380bff7d000", 16)
owner_ids = [ObjectId(hex(BASE_USER_OID + i)[2:]) for i in range(31)]  # 0-30

# pre-generate product IDs
BASE_PRODUCT_OID = int("68e8fc766f70bddf23f2ceb0", 16)
product_ids = [ObjectId(hex(BASE_PRODUCT_OID + i)[2:]) for i in range(3)]  # 0-2

# pre-generate design IDs (to assign in user_designs)
BASE_DESIGN_OID = int("68e8dc22f2e09380baa00000", 16)
existing_design_ids = [ObjectId(hex(BASE_DESIGN_OID + i)[2:]) for i in range(97)]  # 0-96

def oid_json(obj):
    """Custom JSON serializer for ObjectId to MongoDB $oid format."""
    if isinstance(obj, ObjectId):
        return {"$oid": str(obj)}
    raise TypeError(f"Type {type(obj)} not serializable")

designs = []

for i in range(NUM_DESIGNS):
    owner = random.choice(owner_ids)
    product_ref = random.choice(product_ids)
    
    # assign 1-3 existing design IDs randomly
    user_designs_sample = random.sample(existing_design_ids, k=random.randint(1,3))
    
    design = {
        "_id": ObjectId(),  # new ObjectId for this design
        "title": fake.sentence(nb_words=3),
        "owner": owner,
        "productRef": product_ref,
        "customUpload": {
            "imageUrl": fake.image_url(width=800, height=800),
            "meta": {
                "format": "jpg",
                "sizeKB": random.randint(100, 500)
            }
        },
        "overlays": [],
        "tags": [fake.word() for _ in range(3)],
        "aiPrompt": fake.sentence(nb_words=6),
        "aiSuggestions": [],
        "collaborators": [],
        "public": random.choice([True, False]),
        "publishedAt": None,
        "likes": [],
        "commentsCount": 0,
        "versions": [],
        "metadata": {
            "createdFromTemplate": random.choice([True, False]),
            "colorScheme": random.choice(["dark", "light", "vibrant"])
        },
        "createdAt": fake.date_time_this_year().isoformat(),
        "updatedAt": fake.date_time_this_year().isoformat(),
        "user_designs": user_designs_sample
    }
    
    designs.append(design)

# save JSON with $oid format
with open("fake_designs.json", "w") as f:
    json.dump(designs, f, default=oid_json, indent=2)

print(f"{NUM_DESIGNS} fake designs generated in fake_designs.json with $oid format")

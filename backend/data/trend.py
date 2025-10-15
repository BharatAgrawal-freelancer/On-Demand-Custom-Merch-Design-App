import json
import random
from faker import Faker
from bson.objectid import ObjectId
from datetime import datetime, timedelta

fake = Faker()

NUM_TRENDS = 20  # number of fake trends

# pre-generate design IDs
BASE_DESIGN_OID = int("68e8dc22f2e09380baa00000", 16)
design_ids = [ObjectId(hex(BASE_DESIGN_OID + i)[2:]) for i in range(97)]  # 0-96

used_tags = set()

def oid_json(obj):
    """Custom JSON serializer for ObjectId to MongoDB $oid format."""
    if isinstance(obj, ObjectId):
        return {"$oid": str(obj)}
    raise TypeError(f"Type {type(obj)} not serializable")

trends = []

for _ in range(NUM_TRENDS):
    # ensure unique tag
    tag = fake.word()
    while tag in used_tags:
        tag = fake.word()
    used_tags.add(tag)
    
    # random example designs
    example_designs = random.sample(design_ids, k=random.randint(2, 5))
    
    trend = {
        "_id": ObjectId(),
        "tag": tag,
        "score": random.randint(10, 1000),
        "sources": [fake.url() for _ in range(random.randint(1, 3))],
        "lastSeenAt": (datetime.now() - timedelta(days=random.randint(0, 30))).isoformat(),
        "exampleDesigns": example_designs,
        "createdAt": datetime.now().isoformat(),
        "updatedAt": datetime.now().isoformat()
    }
    
    trends.append(trend)

# save JSON with $oid format
with open("fake_trends.json", "w") as f:
    json.dump(trends, f, default=oid_json, indent=2)

print(f"{NUM_TRENDS} fake trends generated in fake_trends.json with $oid format")

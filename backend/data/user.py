import json
import random
from faker import Faker
from bson.objectid import ObjectId

fake = Faker()

NUM_USERS = 30  # number of users to generate
PASSWORD_HASH = "$2b$10$vQJfhlx.2cr3zmRkfcnNEe/heICMTLipPikYhex8DiEhlhlR44gsS"

# base ObjectId for users
BASE_USER_OID = int("68e8dc22f2e09380bff7d000", 16)
# base ObjectId for designs
BASE_DESIGN_OID = int("68e8dc22f2e09380baa00000", 16)

users = []

# helper to wrap ObjectId in $oid format
def as_oid(oid):
    return {"$oid": str(oid)}

# pre-generate ObjectIds for users
user_ids = [ObjectId(hex(BASE_USER_OID + i)[2:]) for i in range(NUM_USERS)]
design_ids = [ObjectId(hex(BASE_DESIGN_OID + i)[2:]) for i in range(97)]  # 0–96 designs

for i in range(NUM_USERS):
    user_id = user_ids[i]
    name = fake.name()
    username = fake.user_name() + str(i)  # ensure uniqueness
    email = username.lower() + "@example.com"
    profile_photo = f"https://randomuser.me/api/portraits/men/{random.randint(1,30)}.jpg"
    bio = fake.sentence(nb_words=12)
    tags = [fake.word() for _ in range(3)]
    
    # Random followers/following from the user_ids except self
    possible_ids = [uid for uid in user_ids if uid != user_id]
    followers = random.sample(possible_ids, k=random.randint(0, 5))
    following = random.sample(possible_ids, k=random.randint(0, 5))
    
    # Random user designs assigned
    user_designs = random.sample(design_ids, k=random.randint(1,5))
    
    user = {
        "_id": as_oid(user_id),
        "name": name,
        "username": username.lower(),
        "email": email,
        "passwordHash": PASSWORD_HASH,
        "profilePhoto": profile_photo,
        "bio": bio,
        "tags": tags,
        "followers": [as_oid(f) for f in followers],
        "following": [as_oid(f) for f in following],
        "user_designs": [as_oid(d) for d in user_designs],
        "liked_posts": [],
        "liked_users": [],
        "complaints": [],
        "social": [],
        "roles": ["user"]
    }
    
    users.append(user)

# save to JSON file for MongoDB import
with open("fake_users_oid.json", "w") as f:
    json.dump(users, f, indent=2)

print(f"{NUM_USERS} fake users generated in fake_users_oid.json")

import json
import random
from faker import Faker
from bson.objectid import ObjectId
from datetime import datetime, timedelta

fake = Faker()

NUM_POSTS = 40  # number of fake community posts

# pre-generate user IDs
BASE_USER_OID = int("68e8dc22f2e09380bff7d000", 16)
user_ids = [ObjectId(hex(BASE_USER_OID + i)[2:]) for i in range(31)]  # 0-30

# pre-generate design IDs
BASE_DESIGN_OID = int("68e8dc22f2e09380baa00000", 16)
design_ids = [ObjectId(hex(BASE_DESIGN_OID + i)[2:]) for i in range(97)]  # 0-96

def oid_json(obj):
    """Custom JSON serializer for ObjectId to MongoDB $oid format."""
    if isinstance(obj, ObjectId):
        return {"$oid": str(obj)}
    raise TypeError(f"Type {type(obj)} not serializable")

community_posts = []

for _ in range(NUM_POSTS):
    author = random.choice(user_ids)
    design = random.choice(design_ids)
    
    # Random likes from other users
    possible_likes = [uid for uid in user_ids if uid != author]
    likes = random.sample(possible_likes, k=random.randint(0, 5))
    
    # Random comments
    comments = []
    for _ in range(random.randint(0, 3)):
        commenter = random.choice([uid for uid in user_ids if uid != author])
        comment = {
            "user": commenter,
            "text": fake.sentence(nb_words=8),
            "createdAt": (datetime.now() - timedelta(days=random.randint(0, 30))).isoformat()
        }
        comments.append(comment)
    
    # Random collaborators
    collaborators = random.sample([uid for uid in user_ids if uid != author], k=random.randint(0, 2))
    
    post = {
        "_id": ObjectId(),
        "design": design,
        "author": author,
        "heading": fake.sentence(nb_words=5),
        "body": fake.paragraph(nb_sentences=3),
        "tags": [fake.word() for _ in range(random.randint(1,3))],
        "likes": likes,
        "comments": comments,
        "collaborators": collaborators,
        "visibility": random.choice(["public", "private", "friends"]),
        "createdAt": (datetime.now() - timedelta(days=random.randint(0, 60))).isoformat(),
        "pinned": random.choice([True, False])
    }
    
    community_posts.append(post)

# save JSON with $oid format
with open("fake_community_posts.json", "w") as f:
    json.dump(community_posts, f, default=oid_json, indent=2)

print(f"{NUM_POSTS} fake community posts generated in fake_community_posts.json with $oid format")

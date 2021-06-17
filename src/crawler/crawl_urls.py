import os
import time
import json
import requests

# ========================================

GOOGLE_API_KEY = None
if "GOOGLE_API_KEY" in os.environ:
    GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]

if GOOGLE_API_KEY is None:
    raise ValueError("Please set the GOOGLE_API_KEY environment variable")

# ========================================


def crawl_url(place_id):
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=url&key={GOOGLE_API_KEY}"
    text = requests.get(url).text
    data = json.loads(text)
    if data["status"] != "OK":
        print(data["status"])
        return None
    return data["result"]["url"]


if __name__ == "__main__":
    with open("../data/places.json") as fin:
        places = json.load(fin)
    filename = "../data/urls.json"
    if not os.path.exists(filename):
        urls = dict()
    else:
        with open(filename) as fin:
            urls = json.load(fin)
    for place_id in places:
        if place_id not in urls:
            url = crawl_url(place_id)
            urls[place_id] = url
    with open(filename, "w", encoding="utf-8") as fout:
        json.dump(urls, fout, ensure_ascii=False)

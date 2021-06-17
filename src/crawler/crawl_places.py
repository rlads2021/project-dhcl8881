import os
import time
import json
import threading
import requests

# ========================================

GOOGLE_API_KEY = None
if "GOOGLE_API_KEY" in os.environ:
    GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]

if GOOGLE_API_KEY is None:
    raise ValueError("Please set the GOOGLE_API_KEY environment variable")

# ========================================


def _add_to_results(results, data):
    for result in data["results"]:
        place_id = result["place_id"]
        name = result["name"]
        types = result.get("types", None)
        rating = result.get("rating", None)
        user_ratings_total = result.get("user_ratings_total", None)
        results[place_id] = {
            "name": name,
            "types": types,
            "rating": rating,
            "user_ratings_total": user_ratings_total
        }


def crawl_nearby(results, latitude, longitude, radius):
    print(len(results))
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={latitude},{longitude}&radius={radius}&language=zh-TW&key={GOOGLE_API_KEY}"
    text = requests.get(url).text
    data = json.loads(text)
    if data["status"] != "OK":
        print(data["status"])
        return
    _add_to_results(results, data)
    print(len(results))
    while "next_page_token" in data:
        next_page_token = data["next_page_token"]
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken={next_page_token}&language=zh-TW&key={GOOGLE_API_KEY}"
        while True:
            text = requests.get(url).text
            data = json.loads(text)
            if data["status"] != "INVALID_REQUEST":
                break
            print("sleeping")
            time.sleep(1)
        if data["status"] != "OK":
            print(data["status"])
            break
        _add_to_results(results, data)
        print(len(results))


def crawl_nearby_by_type(lock, results, latitude, longitude, place_type):
    print(
        f"latitude = {latitude}, longitude = {longitude}, place_type = {place_type}, current result length = {len(results)}")
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={latitude},{longitude}&rankby=distance&type={place_type}&language=zh-TW&key={GOOGLE_API_KEY}"
    text = requests.get(url).text
    data = json.loads(text)
    if data["status"] != "OK":
        print(data["status"])
        print("Done")
        return
    lock.acquire()
    _add_to_results(results, data)
    lock.release()
    print(
        f"latitude = {latitude}, longitude = {longitude}, place_type = {place_type}, current result length = {len(results)}")
    while "next_page_token" in data:
        next_page_token = data["next_page_token"]
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken={next_page_token}&language=zh-TW&key={GOOGLE_API_KEY}"
        while True:
            text = requests.get(url).text
            data = json.loads(text)
            if data["status"] != "INVALID_REQUEST":
                break
            time.sleep(1)
        if data["status"] != "OK":
            print(data["status"])
            break
        lock.acquire()
        _add_to_results(results, data)
        lock.release()
        print(
            f"latitude = {latitude}, longitude = {longitude}, place_type = {place_type}, current result length = {len(results)}")
    print("Done")


if __name__ == "__main__":
    filename = "../data/places.json"
    if not os.path.exists(filename):
        results = dict()
    else:
        with open(filename) as fin:
            results = json.load(fin)

    # 2021/6/7
    # crawl_nearby(results, 25.0173405, 121.5375631, 1000)
    # crawl_nearby(results, 25.0212615, 121.5424523, 100)
    # crawl_nearby(results, 25.0223751, 121.5427573, 500)
    # crawl_nearby(results, 25.0207316, 121.530647, 500)
    # crawl_nearby(results, 25.0191936, 121.5326304, 500)
    # crawl_nearby(results, 25.0154973, 121.5328141, 500)
    # crawl_nearby(results, 25.020151, 121.552023, 500)

    # 2021/6/16
    place_types = ["gym", "book_store", "bakery", "library", "lodging",
                   "movie_theater", "pharmacy", "police", "travel_agency", "hospital"]
    places = [
        (25.0173405, 121.5375631),
        (25.0212615, 121.5424523),
        (25.0223751, 121.5427573),
        (25.0207316, 121.530647),
        (25.0191936, 121.5326304),
        (25.0154973, 121.5328141),
        (25.020151, 121.552023),
    ]

    lock = threading.Lock()
    threads = list()
    for latitude, longitude in places:
        for place_type in place_types:
            threads.append(threading.Thread(target=crawl_nearby_by_type,
                                            args=(lock, results, latitude, longitude, place_type)))
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()

    with open(filename, "w", encoding="utf-8") as fout:
        json.dump(results, fout, ensure_ascii=False)

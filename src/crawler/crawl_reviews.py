import os
import time
import csv
import json
import threading
import queue
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def crawl_reviews(filename, url):
    SLEEP_TIME = 3
    # We will get at most ((N_SCROLL + 1) * 10) reviews
    N_SCROLL = 19
    # N_SCROLL = 1

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--lang=zh-TW")
    driver = webdriver.Chrome(options=options)

    driver.get(url)
    try:
        element = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, "widget-pane-link")))
        element.click()
        for _ in range(N_SCROLL):
            time.sleep(SLEEP_TIME)
            pane = driver.find_elements_by_css_selector(
                "#pane div div div div div.section-scrollbox")[0]
            driver.execute_script(
                "arguments[0].scrollTop = arguments[0].scrollHeight", pane)
        time.sleep(SLEEP_TIME)
        soup = BeautifulSoup(driver.page_source, "html.parser")
        reviews = list(soup.find_all(
            "div", {"class": "section-layout"})[-1].children)
        temp = list()
        for i in range(0, len(reviews), 3):
            temp.append(reviews[i])
        reviews = temp
        rows = [["author_name", "rating", "text"]]
        for review in reviews:
            author_name = review.attrs["aria-label"]
            rating = review.select(
                ".ODSEW-ShBeI-H1e3jb")[0].attrs["aria-label"].split()[0]
            text = review.select(".ODSEW-ShBeI-text")[0].text
            rows.append([author_name, rating, text])
            with open(filename, "w", newline="", encoding="utf-8") as fout:
                writer = csv.writer(fout)
                writer.writerows(rows)
    except:
        pass
    finally:
        driver.quit()


class Worker(threading.Thread):
    def __init__(self, queue):
        threading.Thread.__init__(self)
        self.queue = queue

    def run(self):
        while self.queue.qsize() > 0:
            place_id, url = self.queue.get()
            filename = f"../data/reviews/{place_id}.csv"
            print(place_id, url)
            crawl_reviews(filename, url)


if __name__ == "__main__":
    # 2021/6/7
    # with open("../data/urls.json") as fin:
    #     urls = json.load(fin)
    # 2021/6/16
    with open("../data/urls_6_16.json") as fin:
        urls = json.load(fin)
    work_queue = queue.Queue()
    for place_id, url in urls.items():
        if "cid" not in url:
            continue
        filename = f"../data/reviews/{place_id}.csv"
        if os.path.exists(filename):
            continue
        work_queue.put((place_id, url))
    print(work_queue.qsize())
    workers = list()
    for _ in range(5):
        workers.append(Worker(work_queue))
    for worker in workers:
        worker.start()
    for worker in workers:
        worker.join()

## Data

- [`stopword.txt`](stopword.txt)
  - 中文停用詞表
  - 檔案格式
    - 內容：每個停用詞為一行

- [`places.json`](places.json)
  - Google nearby search API 得到的資料
  - 檔案格式：
    - 內容：json 檔，key 為地點的 id，value 包含了地點名稱、種類、評分和總評分數
      ```json
      {
        "ChIJmQrivHKsQjQR4MIK3c41aj8": {
          "name": "台北",
          "types": ["colloquial_area", "locality", "political"],
          "rating": null,
          "user_ratings_total": null
        },
        "ChIJqS4y_ompQjQRZn8d7gQEdSE": {
          "name": "臺灣大學",
          "types": ["university", "point_of_interest", "establishment"],
          "rating": 4.6,
          "user_ratings_total": 4059
        },
        "ChIJHYeewoupQjQRo1LvtfKwHYY": {
          "name": "國立臺灣大學綜合體育館",
          "types": ["stadium", "parking", "point_of_interest", "establishment"],
          "rating": 4.3,
          "user_ratings_total": 4608
        },
        ...
      }
      ```

- [`urls.json`](urls.json) and [`urls_6_16.json`](urls_6_16.json)
  - Google place detail requests API 得到的資料，urls_6_16.json 為 2021/6/16 新爬的資料，格式相同
  - 檔案格式：
    - 內容：json 檔，key 為地點的 id，value 為該地點在 google map 上的網址
    ```json
    {
      "ChIJmQrivHKsQjQR4MIK3c41aj8": "https://maps.google.com/?q=Taipei,+Taiwan&ftid=0x3442ac72bce20a99:0x3f6a35cedd0ac2e0",
      "ChIJqS4y_ompQjQRZn8d7gQEdSE": "https://maps.google.com/?cid=2410837594748059494",
      "ChIJHYeewoupQjQRo1LvtfKwHYY": "https://maps.google.com/?cid=9664074931887887011",
      ...
    }
    ```

- [`reviews/*.csv`](reviews/)
  - 各個地點的評論，檔名為地點的 id 加上 `.csv`
  - 檔案格式
    - 內容：3 個 column 的 csv 檔。每個 row 為一則評論，author_name 是評論者名稱，rating 是評分數，text 是評論內容。
    ```csv
    author_name,rating,text
    王小明,1,很爛
    劉小明,5,超棒
    ```

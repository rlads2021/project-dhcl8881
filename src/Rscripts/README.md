# Rscripts

使用 `preprocessing.sh` 自動執行預處理流程

## 位置資料

- `read_places.R`: 把 JSON 資料轉換成 dataframe 並儲存到 `../Rdata/places.rds` 包含以下欄位
  - `id`: 地標 ID
  - `name`: 地標名稱
  - `types`: 地標類型（以 `,` 間隔）
  - `rating`: 評論分數
  - `user_ratings_total`: 總評論數

## 文字資料

文字資料預處理透過以下流程完成

- `read_reviews.R`: 枚舉 `../data/reviews` 目錄底下所有地標的 `csv` 評論檔案，讀取並儲存到 `../Rdata/reviews.rds`
- `review_jeiba.R`:
  - 使用 regex 去除 google 加上的識別標籤
  - 利用 jeibaR 將評論斷詞
- `review_tfidf.R`:
  - 將評論資料轉成 tidytext 格式
  - 依照 `place_id` * `rating` 這兩個欄位作為文件，使用 tfidf 分析詞的重要程度
- `review_jieba_with_name.R`: 本來的評論資料上只有 `place_id`，這個 script 結合位置資料，加上地標的名稱，方便後續分析


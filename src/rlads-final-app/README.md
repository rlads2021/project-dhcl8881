# rlads-final-app

使用 `node.js` 建構可與使用者互動的app介面

## 在local端執行App
- 將這個檔案clone下來至local端
- 開啟兩個終端機介面設定路徑到這個 `rlads-final-app` 資料夾
```
cd rlads-final-app
```
- 其中一個終端機介面執行以下程序以開啟後端 (資料傳輸、執行R腳本)
```
cd backend
npm install
npm start
```
- 另一個終端機介面執行以下程序開啟前端 (網頁介面)
```
cd frontend
npm install
npm start
```
- 開啟Chrome瀏覽器並輸入網址[http://localhost:3000/](http://localhost:3000/) 即可打開app

## Hierarchies

- [`frontend`](frontend/)
  - [`public/index.html`](frontend/public/index.html) : 執行基本的HTML網頁的架構，並且render出 `id="root"` 的 `<div>`模塊
  - [`src`](frontend/src)
    - [`components/*`](frontend/src/components/) : `Chart_*.js` 會接收來自上層傳送進來的json資料，並利用 `recharts` 套件輸出成不同分析樣式的圖表
    - [`App.js`](frontend/src/App.js) : 主要的前端網頁的程式碼，使用了 `React` `React Hook` 作為模組的設計以及控制使用者介面中的狀態變數與狀態變化；設計上使用了開源的 `Material-UI` 套件作為框架的美化；使用者可以自行設置不同圖表上的參數設定，會由前端依照不同的圖表各自的狀態變數去向後端fetch各自的json資料回前端
    - [`index.js`](frontend/src/index.js) : 將設計好的 `App.js` 模塊插入至HTML網頁中，設定模塊的id為root
- [`backend`](backend/)
  - [`index.js`](backend/index.js) : 主要的資料處理、傳輸與R腳本的執行的後端程式碼，使用 `Express` `Node.js` 套件作為執行R scripts的server端，以及設置不同的路由以傳送正確的資料回應來自前端不同的要求；當取得的前端的fetch請求時，執行該路由對應的R scripts，並且回傳json資料回前端
  - [`Rscripts`](backend/Rscripts)
    - [`ex_multi_rating.R`](backend/Rscripts/ex_multi_rating.R) : 使用regex 去除 google 加上的識別標籤以及利用 jeibaR 評論斷詞後輸出的 `reviews_jeiba.rds`，分析不同的rating (1~5) 中評論的重點詞的分析，並印出json格式的資料
    - [`ex_multi_type.R`](backend/Rscripts/ex_multi_type.R) : 依照使用者輸入的地標類型，在分析好的 `reviews_jeiba.rds` 中分析該類型在不同的rating之下，與該類型有關的評論的重點詞具有怎樣的分佈，並印出json格式的資料
    - [`ex_rating_tfidf.R`](backend/Rscripts/ex_rating_tfidf.R) : 將Google Map上整體的評論重點詞依照rating的分級進行分析，可以看出每個評論詞在不同rating下出現的頻率，印出json的資料作為回傳
    - [`ex_review_tfidf.R`](backend/Rscripts/ex_review_tfidf.R) : 依照使用者輸入的地標名稱以及rating的間距，並從分析好的 `reviews_tfidf.rds` 中根據對應的地標以及在指定的rating範圍內，評論重點詞在tfidf上的表現，並印出json格式的資料做為回傳 
    - [`ex_word_filter.R`](backend/Rscripts/ex_word_filter.R) : 依照使用者輸入的字詞以及tagging，分析該字詞在評論中出現的次數比例，依照想觀察的tagging作為排序並列出前幾重要的地標與分析結果，並印出json格式的資料作為回傳

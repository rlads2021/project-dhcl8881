library(dplyr)

places <- readRDS("../Rdata/places_filtered.rds")
review_jieba <- readRDS("../Rdata/reviews_jeiba.rds")

names <- sapply(review_jieba$place_id, function(id){
  name <- places$name[places$id == id][[1]]
  return(name)
})

review_jieba_with_name <- tibble(
  place_id = review_jieba$place_id,
  name = names,
  rating = review_jieba$rating,
  text = review_jieba$text
)

saveRDS(review_jieba_with_name, file = "../Rdata/review_jieba_with_name.rds")
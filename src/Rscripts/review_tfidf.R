library(tidytext)
library(tidyverse)

reviews_df <- readRDS("../Rdata/reviews_jeiba.rds")

review_tidy <- reviews_df %>%
  unnest_tokens(
    output = "word",
    input = "text",
    token = "regex",
    pattern = "\u3000"
  )

review_word_count <- review_tidy %>%
  count(place_id, rating, word) %>%
  unite("place_rating", place_id, rating, remove = F)

review_tfidf <- review_word_count <- review_word_count %>%
  bind_tf_idf(word, place_rating, n) %>%
  arrange(desc(tf_idf))

saveRDS(review_tfidf, file = "../Rdata/reviews_tfidf.rds")
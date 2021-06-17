library(dplyr)
library(tidyverse)
library(jsonlite)

library(tidytext)

args <- commandArgs(trailingOnly = TRUE)
rate <- as.numeric(args[1])
num <- as.numeric(args[2])

stopword <- read.delim("../../data/stopword.txt")

reviews_df <- readRDS("../../Rdata/reviews_jeiba.rds")

review_tidy <- reviews_df %>%
  unnest_tokens(
    output = "word",
    input = "text",
    token = "regex",
    pattern = "\u3000"
  )

review_filter_stopword <- review_tidy %>%
  filter(! word %in% stopword$X)

review_without_stopword <- review_filter_stopword %>%
  count(rating, word) %>%
  bind_tf_idf(word, rating, n) %>%
  arrange(desc(n))

res <- review_without_stopword %>%
  group_by(rating) %>%
  slice_max(n, n = num) %>%
  ungroup() %>%
  filter(rating == rate) %>%
  arrange(desc(fct_reorder(word, n, sum)))

saveJSON = jsonlite::toJSON(res)
print(saveJSON)
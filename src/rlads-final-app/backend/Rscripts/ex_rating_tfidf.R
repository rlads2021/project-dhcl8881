library(tidytext)
library(tidyverse)
library(showtext)
library(dplyr)
library(tidyr)

library(jsonlite)

stopword <- read.delim("../../data/stopword.txt")

reviews_df <- readRDS("../../Rdata/reviews_jeiba.rds")

review_tidy <- reviews_df %>%
  unnest_tokens(
    output = "word",
    input = "text",
    token = "regex",
    pattern = "\u3000"
  )

review_without_stopword <- review_tidy %>%
  filter(! word %in% stopword$X) %>%
  count(rating, word) %>%
  bind_tf_idf(word, rating, n) %>%
  arrange(desc(n))

# plot by frequency
res <- review_without_stopword %>%
  group_by(rating) %>%
  slice_max(n, n = 15) %>%
  ungroup() %>%
  arrange(desc(fct_reorder(word, n, sum)))

rating_1 <- res %>% filter(rating == 1)
rating_2 <- res %>% filter(rating == 2)
rating_3 <- res %>% filter(rating == 3)
rating_4 <- res %>% filter(rating == 4)
rating_5 <- res %>% filter(rating == 5)

r1 <- c()
r2 <- c()
r3 <- c()
r4 <- c()
r5 <- c()
words <- unique(res$word)

for (word in words) {
  if (word %in% rating_1$word) {
    r1 <- c(r1, rating_1$n[rating_1$word == word])
  } else {
    r1 <- c(r1, 0)
  }
  
  if (word %in% rating_2$word) {
    r2 <- c(r2, rating_2$n[rating_2$word == word])
  } else {
    r2 <- c(r2, 0)
  }
  
  if (word %in% rating_3$word) {
    r3 <- c(r3, rating_3$n[rating_3$word == word])
  } else {
    r3 <- c(r3, 0)
  }
  
  if (word %in% rating_4$word) {
    r4 <- c(r4, rating_4$n[rating_4$word == word])
  } else {
    r4 <- c(r4, 0)
  }
  
  if (word %in% rating_5$word) {
    r5 <- c(r5, rating_5$n[rating_5$word == word])
  } else {
    r5 <- c(r5, 0)
  }
}

new_res <- tibble(
  word = words, 
  star_1 = r1,
  star_2 = r2,
  star_3 = r3,
  star_4 = r4,
  star_5 = r5,
)

saveJSON <- jsonlite::toJSON(new_res)
print(saveJSON)

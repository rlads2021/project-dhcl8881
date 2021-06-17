library(jiebaR)
library(tidyverse)

reviews_df <- readRDS("../Rdata/reviews.rds")

seg <- worker()

remove_regex_split_word <- function (content) {
  removed_regex_content <- str_remove_all(content, "\\(由 Google 提供翻譯\\)")
  removed_regex_content <- str_remove_all(removed_regex_content, "\\(原始評論\\)")
  res <- segment(removed_regex_content, seg)
  return(paste0(res, collapse = "\u3000"))
}

reviews_df <- reviews_df %>%
  mutate(text = sapply(text, remove_regex_split_word))

saveRDS(reviews_df, file = "../Rdata/reviews_jeiba.rds")

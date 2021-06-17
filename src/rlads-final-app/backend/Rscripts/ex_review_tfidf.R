library(tidytext)
library(tidyverse)

library(tidyr)
library(dplyr)

library(jsonlite)

args <- commandArgs(trailingOnly = TRUE)
name <- args[1]
num <- as.numeric(args[2])
start <- as.numeric(args[3])
end <- as.numeric(args[4])

place_df <- readRDS("../../Rdata/places.rds")
review_tfidf <- readRDS("../../Rdata/reviews_tfidf.rds")

for (N in place_df$name) {
  if (grepl(name, N)) {
    id <- place_df$id[place_df$name == N]
  }
}

tfidf_filter <- function (place, ratings) {
  filtered <- review_tfidf %>%
    filter(place_id == !!place, rating %in% !!ratings) %>%
    group_by(word) %>%
    select(word, tf_idf) %>%
    summarize(tf_idf = sum(tf_idf))  %>%
    arrange(desc(tf_idf)) %>%
    ungroup() %>%
    slice_max(tf_idf, n = num) %>%
    mutate(y = fct_reorder(word, tf_idf))
  
  return(filtered)
}

res <- tfidf_filter(id, c(start, end))

resJSON <- jsonlite::toJSON(res)
print(resJSON)

# res_plot <- res %>%
#   ggplot(aes(x = tf_idf, y = fct_reorder(word, tf_idf))) +
#   geom_col()
# print(res_plot)


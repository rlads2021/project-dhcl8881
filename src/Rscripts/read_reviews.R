library(tidyverse)

review_paths <- list.files("../data/reviews", full.names = T)

reviews_df <- tibble(
  place_id = character(),
  rating = double(),
  text = character(),
)

for (path in review_paths) {
  id = tools::file_path_sans_ext(basename(path))
  reviews <- read_csv(path) %>%
    select("rating", "text") %>%
    add_column(place_id = id, .before = "rating")
  reviews_df <- bind_rows(reviews_df, reviews)
}

reviews_df <- reviews_df %>% filter(!is.na(text))

saveRDS(reviews_df, file = "../Rdata/reviews.rds")
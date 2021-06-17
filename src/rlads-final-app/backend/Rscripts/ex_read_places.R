library(rjson)
library(jsonlite)
library(tidyverse)

place_ids <- tools::file_path_sans_ext(list.files("data/reviews"))
place_list <- rjson::fromJSON(file = "data/places.json")
len <- length(place_list)

id <- names(place_list)
name <- sapply(place_list, function(x) x$name)
types <- sapply(place_list, function(x) paste0(x$types, collapse = ","))
rating <- lapply(place_list, function(x) x$rating)
user_ratings_total <- sapply(place_list, function(x) x$user_ratings_total)

rating[sapply(rating, is.null)] <- NA
rating <- unlist(rating)
user_ratings_total[sapply(user_ratings_total, is.null)] <- NA
user_ratings_total <- unlist(user_ratings_total)

place_df <- tibble(
  id = id,
  name = name,
  types = types,
  rating = rating,
  user_ratings_total = user_ratings_total,
) %>% filter(id %in% place_ids)

saveRDS(place_df, file = "Rdata/places.rds")

saveJSON <- jsonlite::toJSON(place_df)
print(saveJSON)

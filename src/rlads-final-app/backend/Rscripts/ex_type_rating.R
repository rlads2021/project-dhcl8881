library(dplyr)
library(tidyverse)
library(showtext)

library(jsonlite)

place_df <- readRDS("../Rdata/places.rds")

# plot the rating distribution of every types of places
place_types_rating <- place_df %>%
  filter(!is.na(rating)) %>%
  separate_rows(types, sep = ",", convert = TRUE) %>%
  group_by(types) %>%
  summarize(n = n(),
            avg = mean(rating),
            std = sd(rating)) %>%
  filter(n > 10) %>%
  arrange(desc(n))

res <- place_df %>%
  filter(!is.na(rating)) %>%
  separate_rows(types, sep = ",", convert = TRUE) %>%
  filter(types %in% place_types_rating$types) %>%
  mutate(y = fct_reorder(as.factor(types), rating))
  #  %>%
  # ggplot(aes(x=fct_reorder(as.factor(types), rating), y=rating)) +
  # geom_boxplot() +
  # labs(x = "Place Type") +
  # coord_flip()

saveJSON <- toJSON(res)
print(saveJSON)


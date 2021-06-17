suppressMessages(library(dplyr))
suppressMessages(library(jsonlite))


args <- commandArgs(trailingOnly = TRUE)
word <- args[2]
place <- args[1]
reviews_with_name <- readRDS("../../Rdata/reviews.rds")

words_filter <- function(word, place) {

  filtered <- reviews_with_name %>%
    filter(grepl(!!word, text)) %>%
    filter(place_id == place)
  
  return(filtered)
}

res <- words_filter(word , place)

saveJSON <- jsonlite::toJSON(res)
print(saveJSON)

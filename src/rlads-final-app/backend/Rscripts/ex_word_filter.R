library(dplyr)
library(jsonlite)

args <- commandArgs(trailingOnly = TRUE)
word <- args[1]
tag <- args[2]
num <- as.numeric(args[3])
std <- as.numeric(args[4])

reviews_with_name <- readRDS("../../Rdata/review_jieba_with_name.rds")

words_filter <- function(word = '燈光', tag = 'positive', num = 25, std = 3) {
  filtered <- reviews_with_name %>%
    filter(grepl(word, text)) %>%
    group_by(name) %>%
    summarise(positive = sum(rating %in% c((std+1):5)), negative = sum(rating %in% c(1:std)))
  
  if (tag == 'positive') {
    filtered <- filtered %>% 
      slice_max(positive, n = num)
  } else if (tag == 'negative') {
    filtered <- filtered %>% 
      slice_max(negative, n = num)
  } else if (tag == 'total') {
    filtered <- filtered %>% 
      slice_max(positive+negative, n = num)
  }
  
  return(filtered)
}

res <- words_filter(word = word, tag = tag, num = num, std = std)

saveJSON <- jsonlite::toJSON(res)
print(saveJSON)
# the y should be two tags, I will fix this when showing in the web page
#res %>%
#  ggplot(aes(x = name, y = pos)) +
#  geom_col()
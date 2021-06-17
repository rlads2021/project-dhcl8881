
# Install packages

#install.packages("rjson")
#install.packages("hash)

# Import packages

library(dplyr)
library(rjson)
library(hash)

# processing csv comment data files
data_files <- list.files(path = './data/reviews/', full.names = TRUE)
data_keys = sapply(sapply(strsplit(data_files, split = "//"), function(parse){
  key_list <- strsplit(parse[2], split = ".csv")
  return(key_list)
}), function(key){
  return(key)
})

# processing information json files
json_files <- fromJSON(file = './data/places.json')
json_keys <- names(json_files)

json_files

parseJson <- function(keys = json_keys, files = json_files, pointer) {
  output <- c()
  for(key in keys) {
    data <- files[[key]][[pointer]]
    if(is.null(data)) {
      output <- c(output, NA)
    } else if(pointer == "types") {
      concat <- paste(data, collapse = ",")
      output <- c(output, concat)
    } else {
      output <- c(output, data)
    }
  }
  return(output)
}

json_df <- data.frame(
  key = json_keys,
  name = parseJson(pointer = "name"),
  types = parseJson(pointer = "types"),
  rating = parseJson(pointer = "rating"),
  total_user_ratings = parseJson(pointer = "user_ratings_total")
)
View(json_df)
# constructing dictionary
data_dict <- hash()
for(i in c(1:length(data_files))) {
  data_file <- read.csv(data_files[i], encoding = "UTF-8")
  data_dict[data_keys[i]] <- data_file
}

# To access the data frame, ex: 1 st hash key
df <- data_dict[data_keys[1]][[data_keys[1]]]
View(df)

# To link to the data frame of information
peek <- json_df %>% 
  filter(key == data_keys[1])
View(peek)

# Testing area
test <- read.csv(data_files[1], encoding = 'UTF-8')
View(test)


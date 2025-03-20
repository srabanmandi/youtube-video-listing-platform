
//------------------------- Selecting HTML elements-------------------------------------------------
const videoContainerDiv = document.querySelector(".video-container");
const homePageBtn = document.querySelector(".home-page-btn");
const searchField = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-btn");

//-------------------------- Event Listeners ------------------------------------------------------- 
// Event listener for home page button, on click it will show all the videos
homePageBtn.addEventListener("click", () => {
  showVideos(videos);
});
// Event listener for search button, on click it will search the videos
searchBtn.addEventListener("click", searchVideos);
// Event listener for search field, when enter key is pressedit will search the videos
searchField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchVideos();
});

//-------------------------- Functions ---------------------------------------------------------------

// Function that fetch the data
async function fetchYoutubeVideos() {
  const url =
    "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=10&query=javascript&sortBy=keep%2520one%253A%2520mostLiked%2520%257C%2520mostViewed%2520%257C%2520latest%2520%257C%2520oldest";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data.data;
  } catch (error) {
    console.error("error", error);
  }
}

// a global variable
const videos = [];

// function that stores the required data from the fetchYoutubeVideos function in the global variable
async function storeData() {
  // storing the fetch data in videosData
  const videosData = await fetchYoutubeVideos();
  
  // looping through the videosData
  for (const video of videosData) {
    // creating an object
    // adding id,publishedAt,title,thumbnailUrl,channelTitle,viewCount,tags
    const obj = {
      id: video.items.id,
      publishedAt: {
        date: video.items.snippet.publishedAt,
        // finding the difference between current date and published date
        dateDifference: findDateDifference(video.items.snippet.publishedAt),
      },
      title: video.items.snippet.title,
      thumbnailUrl: video.items.snippet.thumbnails.maxres.url,
      channelTitle: video.items.snippet.channelTitle,
      viewCount: {
        actualViewCount: video.items.statistics.viewCount,
        // finding the view count in a more readable format
        displayViewCount: detectViewCount(
          video.items.statistics.viewCount
        ),
      },
      tags: [
        ...video.items.snippet.tags,
        // modifying tags by adding the title for more searching capabilities
        ...video.items.snippet.title.toLowerCase().split(" "),
      ],
    };
    // pushing the object to the global variable
    videos.push(obj);
  }
  // showing the videos
  showVideos(videos);
}

// calling the storeData function
storeData();

// Function to find the difference between current date and published date
function findDateDifference(date) {
  // checking if data is present or not
  if (!date) {
    throw new Error("date is null or undefined");
  }

  // intializing variables
  const today = new Date();
  const publishedDate = new Date(date);

  if (isNaN(publishedDate.getTime())) {
    throw new Error("Invalid date");
  }

  // calculating time difference in ms and finding the no.of days between this two timestamps
  const timeDifferenceMS = today - publishedDate;
  let daysRemaining = Math.floor(timeDifferenceMS / (1000 * 60 * 60 * 24));

  /* 
  finding the no.of years, months, weeks and days
  1. Calculate the no.of years and subtracting it from the total daysRemaining
  2. Calculate the no. of months and subtracting it from daysRemaining
  3. Calculate the no.of weeks and subtracting it from daysRemaining
  4. The leftover daysRemaining value is then assigned to days variable
  */
  const years = Math.floor(daysRemaining / 365);
  daysRemaining = daysRemaining - years * 365;

  const months = Math.floor(daysRemaining / 30);
  daysRemaining = daysRemaining - months * 30;

  const weeks = Math.floor(daysRemaining / 7);

  const days = daysRemaining - weeks * 7;

  /*
  Create a new varaiable timeDiffString and intializing it with an empty string.
  It will later store the string value which needs to be shown in the DOM

  The priority List in which data is stored in timeDiffString
    If year is present it will get first priority followed by months,weeks and then days
    if value of year/month/week/day is more than 1 it stores its plural version 
  if timeDiffString remains empty after all the checks it store `today` as it value and returns
  else returns the value which it found while checking the conditions.
  */
  let timeDiffString = ``;
  if (years > 0) {
    timeDiffString = years > 1 ? `${years} years` : `${years} year`;
  } else if (months > 0) {
    timeDiffString = months > 1 ? `${months} mnths` : `${months} mnth`;
  } else if (weeks > 0) {
    timeDiffString = weeks > 1 ? `${weeks} weeks` : `${weeks} week`;
  } else if (days > 0) {
    timeDiffString = days > 1 ? `${days} days` : `${days} day`;
  }

  if (timeDiffString) return `${timeDiffString} ago`;
  else return `today`;
}

// This function formats a view count into a more readable format
function detectViewCount(value) {
  /*
  value is presented in string format so lets change it to Number and store in views variable.
  check if the conversion was successful, if not throw errror 
  */
  const views = Number(value);
  if (views === NaN) {
    throw new Error("views are not in number format");
  }
  /*
  create a variable viewCount which is later returned after the conditions are checked.
  if views exceed 1 million then return a string of the closest completed million with an suffix `M`.
  if views exceed 1 thousand then return a string of the closest completed thousand with an suffix `K'.
  if non of the above are true then return the views as it is received.
  */
  let viewCount;
  if (views > 1000000) {
    viewCount = `${Math.floor(views / 1000000)}M`;
  } else if (views > 1000) {
    viewCount = `${Math.floor(views / 1000)}K`;
  } else {
    viewCount = views;
  }
  return viewCount;
}

// Function to show the videos
function showVideos(videoList) {
  // takes a list of video objects as input
  // Remove any HTML written inside this element
  videoContainerDiv.innerHTML = ``;

  // if videoList array is empty then set the innerHTML of videoContainerDiv to a div with a class name ".no-result"
  if (videoList.length === 0) {
    videoContainerDiv.innerHTML = `
      <div class="no-result">
          <p>No results found</p>
      </div>
    `;
  }

  // looping through each video object in videoList array and appending HTML to videoContainerDiv.
  videoList.forEach((video) => {
    videoContainerDiv.innerHTML += `
      <div class="video-content">
            <div class="video-thumbnail">
                <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank">
                    <img src=${video.thumbnailUrl} alt="" srcset="">
                </a>
            </div>
            <div class="video-details">
                <div class="channel-icon">
                    <i class="fa-solid fa-mug-hot"></i>
                </div>
                <div class="video-data">
                    <div class="video-title">
                        <p>${video.title}</p> 
                    </div>
                    <div class="channel-name">
                        <p>${video.channelTitle}</p>
                    </div>
                    <div class="video-meta-data">
                        <span class="views">${video.viewCount.displayViewCount} views •</span>
                        <span class="time-ago">${video.publishedAt.dateDifference}</span>
                    </div>
                </div>
            </div>
        </div>    
    `;
  });
}

// Function to search and filter videos
function searchVideos() {
  // checks if searchField is not empty
  if (searchField.value) {
    // converts the input to lowercase and splits it into individual words (queries)
    const queries = searchField.value.toLowerCase().split(" ");
    // filters the videos array to only include videos whose tags property includes any of the search queries
    const filterVideosByTags = videos.filter((video) => {
      return video.tags.includes(...queries);
    });
    // shows the filtered videos
    showVideos(filterVideosByTags);
    searchField.value = ``;
  }
}

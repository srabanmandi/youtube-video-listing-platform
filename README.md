# YouTube Video Listing Platform

This project is a simple **YouTube Video Listing Platform** interface that includes a search bar and a container to display videos. The UI is styled using CSS, and the logic is handled via JavaScript.

## 📌 Features

- **Search Bar**: Allows users to search for videos.
- **Home Button**: A button to navigate back to the home page.
- **Video Display Section**: A container for dynamically listing videos.
- **Font Awesome Icons**: Used for styling buttons with icons.
- **Fetch YouTube Videos**: Uses an API to fetch and display videos.
- **View Count Formatting**: Converts large numbers into a readable format (e.g., 1.2M views).
- **Date Difference Calculation**: Shows how long ago a video was published.

## 🛠️ Technologies Used

- **HTML**: Structure of the webpage.
- **CSS**: Styling and layout.
- **JavaScript**: Handles search functionality and video listing.
- **Font Awesome**: Provides icons.
- **FreeAPI YouTube API**: Fetches video data.

## 📂 Project Structure

```
├── index.html  (Main HTML file)
├── style.css   (CSS file for styling)
├── script.js   (JavaScript file for logic)
├── README.md   (Project documentation)
```

## 🎯 How It Works

1. The **Home Button** displays all videos.
2. The **Search Bar** filters videos based on tags and titles.
3. Video data is fetched using `fetchYoutubeVideos()` and stored in a global `videos` array.
4. The **date difference** and **view count** are formatted for readability.
5. Results are dynamically displayed inside `.video-container`.

## 🎯 Setup Instructions

1. Clone this repository to your local machine.
2. Open the `index.html` file in your preferred web browser.
3. Ensure you have an internet connection to fetch the YouTube video data.

## 🎯 Future Improvements

- Fetch videos from the **YouTube Data API** instead of FreeAPI.
- Add **responsive design** for better mobile support.
- Implement a **dark mode** feature.

## 📜 License

This project is licensed under the **MIT License**.

---


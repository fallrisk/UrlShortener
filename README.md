# Url Shortener Microservice
[GitHub Repository](https://github.com/fallrisk/UrlShortener/)
[Heroku Deployment](https://glacial-taiga-5871.herokuapp.com/)

## User Stories (Requirements)
* User Story: I can pass a URL as a parameter and I will receive a shortened URL
  in the JSON response.
* User Story: If I pass an invalid URL that doesn't follow the valid
  http://www.example.com format, the JSON response will contain an error instead.
* User Story: When I visit that shortened URL, it will redirect me to my original link.

## Example
1. Create a short URL by sending a request [https://glacial-taiga-5871.herokuapp.com//new/http://www.freecodecamp.com]
2. The response will be something similar to the follow JSON.
```json
{ "original_url": "http://freecodecamp.com/news", "short_url": "https://glacial-taiga-5871.herokuapp.com/abcd" }
```
3. Use the short URL. Type in "https://glacial-taiga-5871.herokuapp.com/abcd" in
  your browser. The app. will redirect you to "http://freecodecamp.com/".

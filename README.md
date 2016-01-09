# Url Shortener Microservice
[GitHub Repository]()
[Heroku Deployment]()

## User Stories (Requirements)
* User Story: I can pass a URL as a parameter and I will receive a shortened URL
  in the JSON response.
* User Story: If I pass an invalid URL that doesn't follow the valid
  http://www.example.com format, the JSON response will contain an error instead.
* User Story: When I visit that shortened URL, it will redirect me to my original link.

## Example
1. Create a short URL by sending a request /new/http://www.freecodecamp.com
2. The response will be something similar to the follow JSON.
```json
{ "original_url": "http://freecodecamp.com/news", "short_url": "https://shurli.herokuapp.com/4" }
```
3. Use the short URL. Type in "https://shurli.herokuapp.com/4" in your browser.
   The app. will redirect you to "http://freecodecamp.com/".

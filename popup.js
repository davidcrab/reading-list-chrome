
async function sendToNotion() {

  console.log("starting function");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Notion-Version", "2022-02-22");
  myHeaders.append("Authorization", "Bearer secret_sTYLsPO0EfVNI0cI2Qf4EokpaE2RZ0wTbTFzYIjFcHm");

  var raw = JSON.stringify({
    "parent": {
      "database_id": "5e46c626e0e941b5a1e52aceead7b06c"
    },
    "properties": {
      "Name": {
        "title": [
          {
            "text": {
              "content": "Testing Fetch w Button"
            }
          }
        ]
      },
      "URL": {
        "type": "url",
        "url": "https://jvns.ca/blog/2019/06/23/a-few-debugging-resources/"
      },
      "Tags": {
        "type": "multi_select",
        "multi_select": [
          {
            "id": "c91d5747-3447-4319-adca-9427c3744ef1",
            "name": "read me",
            "color": "orange"
          }
        ]
      }
    }
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const resp = await fetch("https://api.notion.com/v1/pages/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
}

async function sendToNotionTwo(url, title, description, image, icon) {

  console.log("starting function");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Notion-Version", "2022-02-22");
  myHeaders.append("Authorization", "Bearer secret_sTYLsPO0EfVNI0cI2Qf4EokpaE2RZ0wTbTFzYIjFcHm");

  var raw = JSON.stringify({
    "parent": {
      "database_id": "5e46c626e0e941b5a1e52aceead7b06c"
    },
    "cover": {
      "type": "external",
      "external": {
          "url": image
      }
    },
    "icon": {
        "type": "external",
        "external": {
                "url": icon
        }
    },
    "properties": {
      "Name": {
        "title": [
          {
            "text": {
              "content": title
            }
          }
        ]
      },
      "Description": {
        "rich_text": [
            {
                "type": "text",
                "text": {
                    "content": description
                }
            }
        ]
      },  
      "URL": {
        "type": "url",
        "url": url
      },
      "Tags": {
        "type": "multi_select",
        "multi_select": [
          {
            "id": "c91d5747-3447-4319-adca-9427c3744ef1",
            "name": "read me",
            "color": "orange"
          }
        ]
      }
    }
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const resp = await fetch("https://api.notion.com/v1/pages/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  
}

async function getArticleDetails(url, favIconUrl) {
  const resp = await fetch("http://api.linkpreview.net/?key=821aca369aeeb18b6a29ffb7a9480feb&q=" + url)
    .then(response => response.text())
    .then(result => {
      let parsed = JSON.parse(result)
      console.log(result);
      // i should handle errors here
      console.log(parsed.title)
      sendToNotionTwo(parsed.url, parsed.title, parsed.description, parsed.image, favIconUrl)
    })
    .catch(error => console.log('error', error));
}

function getURL() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    let title = tabs[0].title;
    let favIconUrl = tabs[0].favIconUrl;
    console.log(url)
    console.log(title)
    console.log(favIconUrl)
    console.log(tabs[0])

    getArticleDetails(url, favIconUrl)
  });
}

/*
I need to get the title of the url, 

*/

function markAsRead() {
  // we can get the url
  // then we can get the article details 
  // then we can query notion 
}


const submitButton = document.querySelector('.submit')

submitButton.addEventListener('click', () => {
    console.log('clicked submit!');
    getURL()
    submitButton.textContent = "Added!"
  });

const readButton = document.querySelector('.read')

readButton.addEventListener('click', () => {
  console.log('article has been read!');
  readButton.textContent = "Updated!"
});
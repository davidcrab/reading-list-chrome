console.log("this is a popup!")

// now i need to write the part where buttons trigger functions lol

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

// watch the button
document.querySelector('.submit')
  .addEventListener('click', () => {
    console.log('clicked submit!');
    sendToNotion();
  });
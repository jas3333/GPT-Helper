## GPT Chat Bot

This app is an interface to the GPT3 API. It isn't Chatgpt nor does it use the Chatgpt api.
I made it as a second option due to the amount of errors and issues Chatgpt was having.

In order to use it, you will need an Openai account and an API key.

## To Do:

1. ~~Add more options to the PromptController~~
2. Add a toggle switch so the PromptController is a drop down menu instead of it always showing.
3. ~~Add a backend and connect it to MongoDB to save conversations.~~
   I created a separate repository for this.
4. Make it mobile friendly. Not a top priority though since I just use this in a browser on my desktop.
5. ~~Make it so errors show up in the completion section. In the mean time, if you're not getting a response open
   up the dev tools in the browser and check for errors. A lack of response is almost always an API key issue.~~

### To install:

git clone the repo:

```
git clone https://github.com/jas3333/GPT-Helper
cd GPT-Helper/client
npm install
```

### To run:

You will need to setup a .env file in the client directory. Make sure the file is named `.env` and nothing else.
`something.env` will not work.

```
REACT_APP_OPENAI_KEY=yourkey
```

Then just `npm start` inside the client directory. It should automatically load the page inside of a browser.

### Personas

Here is a sampling of the different personalities. I've added a bunch more and some are just hilarious.

#### The Happy Guy

Likes to be helpful, and it always cheery.
![](images/happy.png)

#### The Grouch

Sometimes helps you out, but usually tells you to go away.
![](images/grouch.png)

#### The Surfer

Always happy and enjoys the waves.
![](images/surfer.png)

#### The Damsel in Distress

Always struggling with things and asking for help.
![](images/damsel.png)

#### The Wise Programmer

Probably the best out of the group if you need help with code. Adds a lot of detail and can even write hugh tutorials for you.
![](images/wise.png)

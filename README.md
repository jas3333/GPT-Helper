## GPT Chat Bot

This app is built to use the GPT-3 API on a local machine. I was inspired to create
this app after using the official ChatGPT. I was blown away at the clear straight to the point answers I was getting.

This app isn't fully featured yet. I still have a lot of work to do, but it does respond and answer questions well enough that you can avoid having to sort through all the trash click baity websites that google/brave/duckduckgo respond with.

## Issues:

1. ~~I still need to work out a way for it to remember previous questions so that a conversation can continue.~~
2. ~~Because I'm still pretty new to programming, I don't have a way to separate the responses. For example when you ask for code it sends back text. My workaround was to concatenate to the prompt `Respond in markdown` then use react-markdown to display the response.~~

## To Do:

1. ~~Add more options to the PromptController~~
2. Add a toggle switch so the PromptController is a drop down menu instead of it always showing.
3. ~~Add a backend and connect it to MongoDB to save conversations. Will probably create a separate branch for this.~~
4. Setup the server with better routing.
5. Refactor the clients code to make it look cleaner. It's a mess...
6. Come up with a better design for the Conversations page.
7. Add search to search for past conversations. Useful if you had your bot write tutorials.
8. Make it mobile friendly. Not a top priority though since I just use this in a browser on my desktop.

### To install:

git clone the repo:

```
git clone https://github.com/jas3333/GPT-Helper
```

### Client

```
cd GPT-Helper/client
npm install

```

```
cd ../backend
npm install
```

### To run:

Currently the backend and the client run separatly. Eventually I will have the backend run the client not there yet.
You will need to setup a .env file in the client directory. Be sure to name it .env and nothing else.

Add to the file:

```
REACT_APP_OPENAI_KEY=yourkey
```

Then just `npm start` inside the client directory and open another terminal and run `npm start` inside the backend directory.
Open your browser and navigate to http://localhost:3000
Keep in mind, for this branch to function properly you will need mongoDB running. You might have to change the connection
to the address your system is running it on. You can change the connection string in the server.js file.

### Personas

#### Happy Guy

Likes to be helpful, and it always cheery.
![](images/happy.png)

#### Old Grouchy Progammer

Sometimes helps you out, but usually tells you to go away.
![](images/grouch.png)

#### Surfer Dude

Always happy and enjoys the waves.
![](images/surfer.png)

#### Damsel in Distress

Always struggling with things and asking for help.
![](images/damsel.png)

#### Wise Programmer

Probably the best out of the group if you need help with code. Adds a lot of detail and can even write huge tutorials for you.
![](images/wise.png)

There are many more to experiment with, and it's really easy to add more. You'll find the personas data in the Home.js file

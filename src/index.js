const Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.ba2e1cf1-e8f6-4aa3-beec-e13dc607c971';
exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context, callback);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

function wishTime(){
  var dateIST = new Date();
  var time = {}
  time.hour = dateIST.getUTCHours + 5;
  time.minutes = dateIST.getUTCMinutes + 30;
  //date shifting for IST timezone +5 hours and 30 minutes
  
  if (time.hour < 12) return 'Good morning';
  else if(time.hour < 18) return 'Good noon';
  else return 'Good evening';
}
wishTime();
var handlers={
  'LaunchRequest': function(){
    var speechOutput = 'Welcome to Wish. Using this skill you can wish your guests. Whom you want me to wish';
    var reprompt = 'for example, You can say say hello to Nimesh';
    this.emit(':ask', speechOutput);
  },
  'wisherIntent': function(){
     let name = this.event.request.intent.slots.guestName.value;
     let speechOutput = 'Hello ' + name + ". " + wishTime();
     this.emit(':tell', speechOutput); 
  },
  'welcomeIntent': function(){
    let name = this.event.request.intent.slots.guestName.value;
    let speechOutput = 'Welcome to our sweet home ' + name + '!';
    this.emit(':tell', speechOutput); 
  },
  'AMAZON.StopIntent'() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },

  'AMAZON.HelpIntent'() {
    let speechOutput = "You can try: alexa, open Wisher voice or alexa, ask Wisher voice to welcome or wish the person name";
    let repromptSpeech = "Are you still there?" + speechOutput;
    this.emit(':ask',speechOutput,repromptSpeech);
  },

  'AMAZON.CancelIntent'() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },

  Unhandled() {
    this.response.speak(
      `Sorry, I didn't get that. You can try: 'alexa, open Wisher app'` +
        ` or 'alexa, ask Wisher app to welcome or wish person'`
    );
    this.emit(':responseReady');
  }
};
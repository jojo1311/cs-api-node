var forcifier = require("forcifier")
  , utils = require("../utils");

exports.action = {
  name: "judgingList",
  description: "Fetches challenges that need judges. Method: GET",
  inputs: {
    required: [],
    optional: [],
  },
  authenticated: false,
  outputExample: [
    {
      attributes:
      {
        type: "Challenge__c",
        url: "/services/data/v26.0/sobjects/Challenge__c/a0GK0000006k2g6MAA"
      },
      id: "a0GK0000006k2g6MAA",
      challenge_id: "19",
      name: "Testing - First2Finish",
      status: "Review",
      number_of_reviewers: 1,
      end_date: "2013-07-15T18:49:41.000+0000",
      review_date: "2013-07-17",
      challenge_categories__r: null,
      challenge_platforms__r: [
        {
          attributes:
          {
            type: "Challenge_Platform__c",
            url: "/services/data/v26.0/sobjects/Challenge_Platform__c/a1KK0000001EM4tMAG"
          },
          name: "Heroku"
        },
        {
          attributes:
          {
            type: "Challenge_Platform__c",
            url: "/services/data/v26.0/sobjects/Challenge_Platform__c/a1KK0000001EM4sMAG"
          },
          name: "Salesforce.com"
        }
      ],
      challenge_technologies__r: [
        {
          attributes:
          {
            type: "Challenge_Technology__c",
            url: "/services/data/v26.0/sobjects/Challenge_Technology__c/a1JK0000001WBF8MAO"
          },
          name: "JavaScript"
        },
        {
          attributes:
          {
            type: "Challenge_Technology__c",
            url: "/services/data/v26.0/sobjects/Challenge_Technology__c/a1JK0000001WBF7MAO"
          },
          name: "Apex"
        }
      ]
    }
  ],
  version: 2.0,
  run: function(api, connection, next){
    api.judging.list(function(data){
      utils.processResponse(data, connection);
      next(connection, true);
    });
  }
};
exports.judgingScorecardFetch = {
  name: "judgingScorecardFetch",
  description: "Fetches a specific scorecard. Method: GET",
  inputs: {
    required: ['participant_id', 'judge_membername'],
    optional: [],
  },
  authenticated: false,
  outputExample: {},
  version: 2.0,
  run: function(api, connection, next){
    api.judging.scorecard.fetch(connection.params.participant_id, connection.params.judge_membername, function(data){
      utils.processResponse(data, connection);
      next(connection, true);
    });
  }
};

exports.judgingOutstandingFetch = {
  name: "judgingOutstandingFetch",
  description: "Fetches challenges that member needs to judge. Method: GET",
  inputs: {
    required: ["membername"],
    optional: [],
  },
  authenticated: false,
  outputExample: {},
  version: 2.0,
  run: function(api, connection, next){
    api.judging.outstanding.fetch(connection.params.membername, function(data){
      connection.response.response = data;
      connection.response.count = data.length;
      next(connection, true);
    });
  }
};

exports.judgingCreate = {
  name: "judgingCreate",
  description: "Adds a member as a judge to a challenge. Method: POST",
  inputs: {
    required: ["membername", "challenge_id"],
    optional: [],
  },
  authenticated: false,
  outputExample: {
    "success": true,
    "message": "Thank you! You are now a judge for this challenge."
  },
  version: 2.0,
  run: function(api, connection, next){
    api.judging.create(connection.params, function(data){
      connection.response.response = forcifier.deforceJson(data);
      if (connection.response.response.success)
        connection.rawConnection.responseHttpCode = 201;
      next(connection, true);
    });
  }
};

exports.judgingUpdate = {
  name: "judgingUpdate",
  description: "Saves the scorecard for a participant by a judge member. Method: PUT",
  inputs: {
    required: ["id", "answers", "comments", "options"],
    optional: [],
  },
  authenticated: false,
  outputExample: {
    "success": true,
    "message": "Scorecard has been saved successfully."
  },
  version: 2.0,
  run: function(api, connection, next){
    api.judging.update(connection.params, function(data){
      connection.response.response = forcifier.deforceJson(data);
      next(connection, true);
    });
  }
};

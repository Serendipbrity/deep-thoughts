// Resolvers serve as a means for performing an action on a data source based on a request
//  similar to controllers but resolvers are more specific 

const { User, Thought } = require('../models');

const resolvers = {
    Query: {
    //   pass parent as a placeholder parameter
        thoughts: async (parent, { username }) => {
            // ternary operator to see if the username exists. if it does, set params to object username. if it doesn't return an empty object
            const params = username ? { username } : {};
            // pass object fo find() method. if theres data it will perform a lookup by specific username. if not it'll return every thought
      return Thought.find(params).sort({ createdAt: -1 });
        },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        }, 
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        }
  }
};

module.exports = resolvers;

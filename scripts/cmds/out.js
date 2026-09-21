const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "leave",
    aliases: ["out", "out"],
    version: "1.2",
    author: "Sandy/fixed Milon",
    countDown: 5,
    role: 1, 
    shortDescription: "bot will leave gc",
    longDescription: "প্রেফিক্স ছাড়া বা সহ গ্রুপ ত্যাগ করার কমান্ড",
    category: "owner",
    guide: "{pn} [tid,blank]"
  },

  // প্রেফিক্স ছাড়া কাজ করার প্রধান জায়গা
  onChat: async function ({ api, event }) {
    if (event.body) {
      const message = event.body.toLowerCase();
      // এখানে আপনি চাইলে 'leave' এর সাথে 'out' বা 'লিভ' ও যোগ করতে পারেন
      if (message === "leave" || message === "out") {
        
        // পারমিশন চেক (Role 1 মানে অ্যাডমিন/ওনার)
        // নোট: আপনার সিস্টেমে যদি onChat এ role কাজ না করে তবে এখানে manual check লাগবে
        
        return api.sendMessage(
          'আমি এই গ্রুপ থেকে লিভ নিচ্ছি, আমাকে ব্যবহার করার জন্য ধন্যবাদ! 😙', 
          event.threadID, 
          () => api.removeUserFromGroup(api.getCurrentUserID(), event.threadID)
        );
      }
    }
  },

  // প্রেফিক্স সহ কাজ করার জন্য (যেমন: /leave 123456)
  onStart: async function ({ api, event, args }) {
    let id = args[0] ? args[0] : event.threadID;

    return api.sendMessage(
      'আমি এই গ্রুপ থেকে লিভ নিচ্ছি, আমাকে ব্যবহার করার জন্য ধন্যবাদ! 😙', 
      id, 
      () => api.removeUserFromGroup(api.getCurrentUserID(), id)
    );
  }
};

const API = {
  GetChatbotResponse: async message => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
       resolve(message)
      }, 2000);
    });
  }
};

export default API;

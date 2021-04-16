var UserProfile = (function() {
    var username = "";
  
    var getName = function() {
      return username;    // Or pull this from cookie/localStorage
    };
  
    var setName = function(name) {
      username = name;     
      // Also set this in cookie/localStorage
    };
  
    return {
      getName: getName,
      setName: setName
    }
  
  })();
  
  export default UserProfile;
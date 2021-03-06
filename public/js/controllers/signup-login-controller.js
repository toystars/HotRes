
// controller to handle signup and login

app.controller('SignUpLogInCtrl', ['$scope', 'apiCall', '$state', '$cookies', 'logChecker', function($scope, apiCall, $state, $cookies, logChecker) {

  // function to handle tooltip and tabs
  (function(){
    $('.tooltipped').tooltip({delay: 50});
    $('ul.tabs').tabs()
  })();

  // check logged in state
  if (logChecker.isLoggedIn()) {
    $state.go('loggedIn');
  }

  // validation function to run on submit
  function validate() {

    var validate = true;

    // reset all error messages
    $scope.signupNameErrorMessage = '';
    $scope.signupUsernameErrorMessage = '';
    $scope.signupEmailErrorMessage = '';
    $scope.signupPasswordErrorMessage = '';

    // check if nothing is typed or the length is not right
    if ((!$scope.signupName) || ($scope.signupName.length < 5)) {
      $scope.signupNameErrorMessage = 'Name must be 5 characters or more...';
      validate = false;
    }

    // check for presence of number in name
    if (/\d+/.test($scope.signupName)) {
      $scope.signupNameErrorMessage = 'Name cannot contain a number';
      validate = false;
    }

    // check if username field is empty
    if ((!$scope.signupUsername) || ($scope.signupUsername.length <= 5)) {
      $scope.signupUsernameErrorMessage = 'Username must be at least 5 characters';
      validate = false;
    }

    // check if email field is empty
    if (!$scope.signupEmail || $scope.signupEmail === '') {
      $scope.signupEmailErrorMessage = 'Please enter an email';
      validate = false;
    } else {
      // check if valid email is entered
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.signupEmail))) {
        $scope.signupEmailErrorMessage = 'Please enter a valid email';
        validate = false;
      }
    }

    // check if password field is empty and valid
    if (
        (!$scope.signupPassword) || 
        ($scope.signupPassword.length <= 8) || 
        (!(/\d+/.test($scope.signupPassword)))
      ) {
      $scope.signupPasswordErrorMessage = 'Password must be at least 8 characters and must contain a number';
      validate = false;
    }

    return validate;
  }

  // function to be called on signup api call success
  function handleSignUpSuccess(data) {
    // display a loader
    $scope.signupLoader = false;

    $scope.signupMessage = data.message;
    
    // clear all models...
    $scope.signupName = '';
    $scope.signupUsername = '';
    $scope.signupEmail = '';
    $scope.signupPassword = '';
  }

  // function to handle api call error
  function handleSignUpError(data) {
    // remove loader
    $scope.signupLoader = false;
    $scope.signupMessage = data.message;
  }

  // function that handles login api call success
  function handleLoginSuccess(data) {

    if (data.message) {
      // remove loader
      $scope.loginLoader = false;
      $scope.LoginMessage = data.message;
    } else {
      // handle login success (store info in cookies and redirect to dashboard)
      $cookies.put('managerId', data.id);
      $cookies.put('managerToken', data.token);
      $state.go('loggedIn.hotels');
    }
  }

  // function that handles login api call error 
  function handleLogInError(data) {
    // remove loader
    $scope.loginLoader = false;
  }

  // function to handle sign up requests
  $scope.signUp =  function() {

    // run the validate function to check for validation
    if (!validate()) {
      return;  // break out of function on validation fail
    }

    // encrypt password
    var hash = CryptoJS.SHA3($scope.signupPassword);
    var encryptedPassword = hash.toString(CryptoJS.enc.Hex);

    // display a loader
    $scope.signupLoader = true;

    // build up the object to be sent with the api call
    var signUpObject = {
      name:     $scope.signupName,
      username: $scope.signupUsername,
      email:    $scope.signupEmail,
      password: encryptedPassword
    };

    // make api call with object
    apiCall.managerSignUp(signUpObject).success(handleSignUpSuccess).error(handleSignUpError);
  };

  // function to handle login requests
  $scope.logIn = function() {

    // clear error message
    $scope.LoginMessage = '';

    // Do some basic validations
    if (
        (!$scope.loginUsername && !$scope.loginPassword) || 
        ($scope.loginUsername.length === 0 && $scope.loginPassword.length === 0)
      ) 
    {
      $scope.LoginMessage = 'Please enter a username and password';
      return;
    } else if (!$scope.loginUsername || $scope.loginUsername.length === 0) {
      $scope.LoginMessage = 'Please enter a username';
      return;
    } else if (!$scope.loginPassword || $scope.loginPassword.length === 0) {
      $scope.LoginMessage = 'Please enter a password';
      return;
    }

    // display a loader
    $scope.loginLoader = true;

    // encrypt password
    var hash = CryptoJS.SHA3($scope.loginPassword);
    var encryptedPassword = hash.toString(CryptoJS.enc.Hex);

    // build up the object
    var loginObject = {
      username: $scope.loginUsername,
      password: encryptedPassword
    };

    // make api call with object
    apiCall.managerLogin(loginObject).success(handleLoginSuccess).error(handleLogInError);
  }


}]);
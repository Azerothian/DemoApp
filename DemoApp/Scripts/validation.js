(function() {
  var createJsonFromArray, dontCare, hidePleaseWait, pleaseWaitDiv, resetForm, showPleaseWait, submitted, validateForm, validator;

  createJsonFromArray = function(data) {
    var d, out, _i, _len;
    out = {};
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      out[d.name] = d.value;
    }
    return out;
  };

  pleaseWaitDiv = $('<div class="modal" id="pleaseWaitDiv" role="dialog" style="display:none"><div class="modal-dialog" data-backdrop="static" data-keyboard="false"><div class="modal-content"><h3>Please wait..</h3><div class="progress progress-striped active"><div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div></div></div></div>');

  showPleaseWait = function() {
    return pleaseWaitDiv.modal();
  };

  hidePleaseWait = function() {
    return pleaseWaitDiv.modal('hide');
  };

  dontCare = function() {};

  validator = new window.Checkit({
    TicketValue: [
      {
        rule: "required",
        message: "Please select a ticket value"
      }
    ],
    FirstName: [
      {
        rule: "required",
        message: "Please enter your first name"
      }
    ],
    LastName: [
      {
        rule: "required",
        message: "Please enter your last name"
      }
    ],
    Email: [
      {
        rule: "required",
        message: "Please enter your email address"
      }, {
        rule: "email",
        message: "Please enter a valid email address"
      }
    ],
    PhoneNumber: [
      {
        rule: "numeric",
        message: "Phone Number can only contain numbers"
      }
    ],
    CreditCardNumber: [
      {
        rule: "required",
        message: "Please enter your credit card number"
      }, {
        rule: "luhn",
        message: "Please provide a valid credit card number"
      }
    ]
  });

  resetForm = function() {
    return new Promise(function(resolve, reject) {
      return $(".has-error").removeClass("has-error").promise().done(function() {
        return $(".errorMessages").html("").promise().done(resolve);
      });
    });
  };

  validateForm = function() {
    return new Promise(function(resolve, reject) {
      return resetForm().then(function() {
        var jsdata, onError;
        jsdata = createJsonFromArray($("#frmOrder").serializeArray());
        onError = function(err) {
          var alertMessage, errObj, errorList, key, message, value;
          errObj = err.toJSON();
          alertMessage = $("<div class='alert alert-danger' role='alert'></div>");
          errorList = $("<ul></ul>");
          for (key in errObj) {
            value = errObj[key];
            message = $("");
            _.map(value, function(errMsg) {
              return errorList.append("<li>" + errMsg + "</li>");
            });
            $("[name=" + key + "]").parents(".form-group").addClass("has-error");
          }
          alertMessage.append(errorList);
          return $(".errorMessages").append(alertMessage).promise().done(function() {
            return reject();
          });
        };
        return validator.run(jsdata).then(resolve)["catch"](window.Checkit.Error, onError);
      });
    });
  };

  submitted = false;

  $(function() {
    $(".form-control").on("change", function() {
      if (submitted) {
        return validateForm().then(dontCare, dontCare);
      }
    });
    return $("#frmOrder").on("submit", function(e) {
      e.preventDefault();
      submitted = true;
      return validateForm().then(function(validated) {
        var ajaxFunc;
        showPleaseWait();
        ajaxFunc = function() {
          return $.ajax({
            type: "POST",
            data: JSON.stringify(validated),
            url: "api/orders",
            contentType: "application/json",
            success: function(res) {
              hidePleaseWait();
              console.log("success", arguments);
              return window.location = "/";
            },
            error: function() {
              return alert("An error has occurred while attempting to submit the form");
            }
          });
        };
        return setTimeout(ajaxFunc, 10);
      }, dontCare);
    });
  });

}).call(this);

//# sourceMappingURL=validation.js.map

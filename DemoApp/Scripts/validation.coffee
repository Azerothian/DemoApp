# CoffeeScript
createJsonFromArray = (data) ->
  out = {}
  for d in data
    out[d.name] = d.value
  return out
  
pleaseWaitDiv = $('<div class="modal" id="pleaseWaitDiv" role="dialog" style="display:none"><div class="modal-dialog" data-backdrop="static" data-keyboard="false"><div class="modal-content"><h3>Please wait..</h3><div class="progress progress-striped active"><div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div></div></div></div>');
showPleaseWait = ->
  pleaseWaitDiv.modal()
hidePleaseWait = ->
  pleaseWaitDiv.modal('hide')

dontCare = () ->
  #empty func


validator = new window.Checkit {
  TicketValue: [{ rule: "required", message: "Please select a ticket value" }]
  FirstName: [{ rule: "required", message: "Please enter your first name" }]
  LastName: [{ rule: "required", message: "Please enter your last name" }]
  Email: [
    { rule: "required", message: "Please enter your email address" }
    { rule: "email", message: "Please enter a valid email address" }
  ]
  PhoneNumber: [
    { rule: "numeric", message: "Phone Number can only contain numbers" }
  ]
  CreditCardNumber: [
    { rule: "required", message: "Please enter your credit card number" }
    { rule: "luhn", message: "Please provide a valid credit card number" }
  ]
}


resetForm = () ->
  return new Promise (resolve, reject) ->
    $(".has-error").removeClass("has-error").promise().done () ->
      $(".errorMessages").html("").promise().done resolve


validateForm = () ->
  return new Promise (resolve, reject) ->
    resetForm().then () ->
      jsdata = createJsonFromArray $("#frmOrder").serializeArray()
      onError = (err) ->
        errObj = err.toJSON()
        alertMessage = $("<div class='alert alert-danger' role='alert'></div>")
        errorList = $("<ul></ul>")
        for key, value of errObj
          message = $("")
          _.map value, (errMsg) ->
            errorList.append "<li>#{errMsg}</li>"
          $("[name=#{key}]").parents(".form-group").addClass("has-error");
      
        alertMessage.append errorList
        $(".errorMessages").append(alertMessage).promise().done () ->
          reject()
      validator.run(jsdata)
        .then(resolve)
        .catch(window.Checkit.Error, onError)

submitted = false

$ () ->
  $(".form-control").on "change", () ->
    if submitted
      
      validateForm().then dontCare, dontCare
      
  $("#frmOrder").on "submit", (e) ->
    e.preventDefault()
    submitted = true
    validateForm().then (validated) ->
      showPleaseWait()
      ajaxFunc = () ->
        $.ajax {
        type: "POST",
        data: JSON.stringify(validated),
        url: "api/orders",
        contentType: "application/json"
        success: (res) ->
          hidePleaseWait()
          console.log "success", arguments
          window.location = "/"
          #window.refreshTable()
        error: () ->
          alert "An error has occurred while attempting to submit the form"
      }
      setTimeout(ajaxFunc, 10)
     
      
    , dontCare
    




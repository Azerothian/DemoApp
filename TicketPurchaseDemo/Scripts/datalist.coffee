# CoffeeScript
window.refreshTable = () ->
  $.ajax {
    type: "GET",
    url: "api/orders",
    #contentType: "application/json"
    success: (res) ->
      $(".tblData tbody").html("")
      
      #console.log "successRefresh", arguments
      for r in res
        row = $("<tr></tr>")
        row.append("<td>#{r.Id}</td>")
        row.append("<td>#{r.TicketValue}</td>")
        row.append("<td>#{r.FirstName}</td>")
        row.append("<td>#{r.LastName}</td>")
        row.append("<td>#{r.PhoneNumber}</td>")
        row.append("<td>#{r.Email}</td>")
        row.append("<td>#{r.CreditCardNumber}</td>")
        $(".tblData tbody").append row
        
        
  }

$ () ->
  window.refreshTable()
  